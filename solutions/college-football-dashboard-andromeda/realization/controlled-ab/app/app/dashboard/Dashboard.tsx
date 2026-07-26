"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Database,
  Info,
  ShieldCheck,
  Warning,
  XCircle,
} from "@phosphor-icons/react";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "../components/andromeda/components/Alert";
import { Badge } from "../components/andromeda/components/Badge";
import { Button } from "../components/andromeda/components/Button";
import { Card } from "../components/andromeda/components/Card";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "../components/andromeda/components/EmptyState";
import { PanelHeader } from "../components/andromeda/components/PanelHeader";
import { SegmentedControl } from "../components/andromeda/components/SegmentedControl";
import { Spinner } from "../components/andromeda/components/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableStyles,
} from "../components/andromeda/components/Table";
import { TrendChart } from "../components/andromeda/components/TrendChart";
import { andromedaVars } from "../components/andromeda/components/lib/utils";
import { mq } from "../components/andromeda/components/lib/responsive";
import {
  games,
  metrics,
  rankingHistory,
  rankingObservationState,
  teams,
  type GameStatus,
  type MetricId,
  type RankingSource,
  type TeamId,
} from "./fixtures";

type View = "overview" | "schedule" | "rankings" | "compare";
type StateMode =
  | "normal"
  | "loading"
  | "empty"
  | "stale"
  | "unavailable"
  | "conflict"
  | "partial";

const viewOptions = [
  { value: "overview", label: "Overview" },
  { value: "schedule", label: "Schedule" },
  { value: "rankings", label: "Rankings" },
  { value: "compare", label: "Compare" },
];

const sourceLabels: Record<RankingSource, string> = {
  ap: "AP Top 25",
  coaches: "Coaches Poll",
  cfp: "CFP Rankings",
};

const statusVariant = (
  status: GameStatus,
): "default" | "accent" | "warning" | "fault" | "outline" => {
  if (status === "in-progress" || status === "halftime") return "accent";
  if (status === "delayed" || status === "postponed") return "warning";
  if (status === "canceled") return "fault";
  if (status === "scheduled") return "outline";
  return "default";
};

const rankingValue = (
  source: RankingSource,
  teamId: TeamId,
  season: number,
) => {
  const state = rankingObservationState[source][teamId];
  if (state === "unranked") return "Unranked";
  if (state === "unavailable") return "Unavailable";
  const team = teams.find((candidate) => candidate.id === teamId)!;
  const rank = team[source];
  return rank == null ? "Unavailable" : `No. ${season === 2025 ? rank + 1 : rank}`;
};

const recordForSeason = (teamId: TeamId, season: number) => {
  if (season === 2026) {
    return teams.find((team) => team.id === teamId)!.record;
  }
  return {
    texas: "11–3",
    "ohio-state": "13–1",
    oregon: "10–3",
    "notre-dame": "12–2",
  }[teamId];
};

const historicalMetricValues: Record<MetricId, Record<TeamId, number>> = {
  "win-percentage": {
    texas: 78.6,
    "ohio-state": 92.9,
    oregon: 76.9,
    "notre-dame": 85.7,
  },
  "points-per-game": {
    texas: 30.4,
    "ohio-state": 35.9,
    oregon: 31.2,
    "notre-dame": 29.7,
  },
  "points-allowed-per-game": {
    texas: 19.7,
    "ohio-state": 14.1,
    oregon: 18.8,
    "notre-dame": 17.6,
  },
  "total-offense-yards-per-game": {
    texas: 421.8,
    "ohio-state": 455.2,
    oregon: 439.4,
    "notre-dame": 412.6,
  },
};

const metricValue = (metricId: MetricId, teamId: TeamId, season: number) =>
  season === 2026
    ? metrics[metricId].values[teamId]
    : historicalMetricValues[metricId][teamId];

function Panel({
  title,
  actions,
  children,
  className = "",
  glow = false,
}: {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <Card
      variant={glow ? "glow" : "default"}
      className={`signal-panel ${className}`}
    >
      <PanelHeader title={title} actions={actions} />
      <div className="signal-panel-body">{children}</div>
    </Card>
  );
}

function StateNotice({ mode }: { mode: StateMode }) {
  if (mode === "normal" || mode === "loading" || mode === "empty") return null;

  const content = {
    stale: {
      variant: "warning" as const,
      icon: Warning,
      title: "Stale data retained",
      description:
        "Schedule refresh failed at 4:13 PM CT. Last-known scores remain visible with their prior update times; no value has been reset or marked current.",
    },
    unavailable: {
      variant: "fault" as const,
      icon: XCircle,
      title: "Schedule provider unavailable",
      description:
        "Demo Schedule feed cannot be reached. Rankings and statistics remain available from their independent fixture providers.",
    },
    conflict: {
      variant: "warning" as const,
      icon: Warning,
      title: "Provider disagreement exposed",
      description:
        "Demo Sports feed reports Texas 21–17; Demo Archive mirror reports 20–17. Demo Sports feed is the declared score source of record. Nothing was averaged.",
    },
    partial: {
      variant: "warning" as const,
      icon: Database,
      title: "Partial provider coverage",
      description:
        "AP poll retrieval is unavailable. Schedule, score, Coaches Poll, and statistical fixtures remain intact and independently attributed.",
    },
  }[mode];
  const Icon = content.icon;

  return (
    <Alert variant={content.variant}>
      <AlertIcon>
        <Icon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>{content.title}</AlertTitle>
        <AlertDescription>{content.description}</AlertDescription>
      </AlertContent>
    </Alert>
  );
}

function FreshnessLedger({ mode }: { mode: StateMode }) {
  const scheduleState =
    mode === "unavailable"
      ? "Unavailable"
      : mode === "stale"
        ? "Stale"
        : "Current";
  const rankingState = mode === "partial" ? "Partial" : "Current";

  return (
    <div className="freshness-grid" aria-label="Data freshness and sources">
      {[
        ["Scores", mode === "stale" ? "Stale" : "Current", "Demo Sports feed", "4:12 PM CT"],
        ["Schedules", scheduleState, "Demo Schedule feed", "12:00 PM CT"],
        ["Rankings", rankingState, "Demo Poll archive", "Oct 8 · 1:00 PM CT"],
        ["Statistics", "Current", "Demo Statistics feed", "Oct 10 · 9:00 AM CT"],
      ].map(([label, state, source, updated]) => (
        <div className="freshness-item" key={label}>
          <div>
            <span className="eyebrow">{label}</span>
            <strong>{state}</strong>
          </div>
          <div className="freshness-meta">
            <span>{source}</span>
            <span>Updated {updated}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TeamCards({
  season,
  rankingSource,
  mode,
  onOpen,
}: {
  season: number;
  rankingSource: RankingSource;
  mode: StateMode;
  onOpen: (teamId: TeamId) => void;
}) {
  return (
    <section className="team-grid" aria-labelledby="watched-teams-title">
      <h2 className="visually-hidden" id="watched-teams-title">
        Watched teams
      </h2>
      {teams.map((team) => (
        <Card
          key={team.id}
          className={`team-card ${team.id === "texas" ? "favorite-team" : ""}`}
          variant={team.id === "texas" ? "glow" : "default"}
        >
          <div className="team-card-content">
            <div className="team-card-topline">
              <span
                className="team-key"
                style={{ backgroundColor: team.accent }}
                aria-hidden="true"
              />
              <span className="eyebrow">{team.id === "texas" ? "Favorite" : "Watched"}</span>
              <Badge
                variant={
                  (mode === "partial" && rankingSource === "ap") ||
                  rankingSource === "cfp"
                    ? "warning"
                    : team.id === "texas"
                      ? "accent"
                      : "subtle"
                }
              >
                {mode === "partial" && rankingSource === "ap"
                  ? "Unavailable"
                  : rankingValue(rankingSource, team.id, season)}
              </Badge>
            </div>
            <h3>{team.name}</h3>
            <div className="record-line">
              <strong>{recordForSeason(team.id, season)}</strong>
              <span>{team.conferenceRecord}</span>
              <span>{team.streak}</span>
            </div>
            <div className="snapshot-line">
              <span>Next</span>
              <strong>
                {mode === "unavailable"
                  ? `Unavailable · last known ${team.next}`
                  : team.next}
              </strong>
            </div>
            <button
              className="team-open"
              type="button"
              onClick={() => onOpen(team.id)}
              aria-label={`Open ${team.name} team detail`}
            >
              Open team season
            </button>
          </div>
        </Card>
      ))}
    </section>
  );
}

function GameRows({
  rows,
  conflict,
  season,
}: {
  rows: typeof games;
  conflict: boolean;
  season: number;
}) {
  return (
    <div className="game-stack">
      {rows.map((game) => (
        <article className="game-row" key={game.id}>
          <div className="game-status">
            <Badge variant={statusVariant(game.status)}>{game.statusLabel}</Badge>
            <span>{game.week}</span>
          </div>
          <div className="game-matchup">
            <strong>
              {game.away} <span aria-hidden="true">@</span>{" "}
              <span className="visually-hidden">at</span> {game.home}
            </strong>
            <span>
              {season === 2025
                ? game.dateTime
                    .replace("Oct 10", "Sep 27")
                    .replace("Oct 17", "Oct 4")
                : game.dateTime}{" "}
              · {season} demo season
            </span>
            <span>{game.venue}</span>
          </div>
          <div className="game-result">
            {"score" in game ? <strong>{game.score}</strong> : <span>Score not applicable</span>}
            <span>
              {season === 2025 ? "Demo Archive fixture" : game.source}
            </span>
            <span>Updated {game.updated}</span>
            {conflict && game.id === "g-01" ? (
              <span className="conflict-note">Conflict: mirror reports Texas 20–17</span>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function Overview({
  season,
  week,
  metricId,
  rankingSource,
  mode,
  onOpenTeam,
  onView,
}: {
  season: number;
  week: string;
  metricId: MetricId;
  rankingSource: RankingSource;
  mode: StateMode;
  onOpenTeam: (teamId: TeamId) => void;
  onView: (view: View) => void;
}) {
  const featuredGames = games
    .filter((game) => week === "All weeks" || game.week === week)
    .slice(0, 3);
  const metric = metrics[metricId];

  return (
    <>
      <div className="overview-kicker">
        <div>
          <span className="eyebrow">{season} demo season · {week}</span>
          <h1>What matters this Saturday</h1>
          <p>
            Four watched programs, one source-aware view. Every value below is
            deterministic fixture data for evaluation—not a live sports feed.
          </p>
        </div>
        <div className="overview-status">
          <Badge variant={mode === "stale" ? "warning" : "accent"}>
            {mode === "stale" ? "Stale fixtures" : "Fixture data · not live"}
          </Badge>
          <span>America/Chicago · CT</span>
        </div>
      </div>

      <FreshnessLedger mode={mode} />
      <TeamCards
        season={season}
        rankingSource={rankingSource}
        mode={mode}
        onOpen={onOpenTeam}
      />

      <div className="bento-grid">
        <Panel
          title={week === "Week 7" ? "Live & recently final" : "Next games"}
          className="games-panel"
          actions={
            <Button variant="ghost" size="sm" onClick={() => onView("schedule")}>
              Full schedule
            </Button>
          }
        >
          {mode === "unavailable" ? (
            <div className="unavailable-block">
              <XCircle size={20} aria-hidden="true" />
              <strong>Schedule data unavailable</strong>
              <span>Rankings and statistics remain available below.</span>
            </div>
          ) : (
            <GameRows
              rows={featuredGames as typeof games}
              conflict={mode === "conflict"}
              season={season}
            />
          )}
        </Panel>

        <Panel
          title="Comparison signal"
          actions={
            <Button variant="ghost" size="sm" onClick={() => onView("compare")}>
              All metrics
            </Button>
          }
        >
          <div className="metric-summary">
            <div>
              <span className="eyebrow">{metric.label}</span>
              <p>{metric.definition}</p>
            </div>
            <ol className="metric-rank">
              {([...teams] as typeof teams)
                .sort(
                  (a, b) =>
                    metricValue(metricId, b.id as TeamId, season) -
                    metricValue(metricId, a.id as TeamId, season),
                )
                .map((team) => (
                  <li key={team.id}>
                    <span>{team.shortName}</span>
                    <strong>
                      {metricValue(metricId, team.id, season)} {metric.unit}
                    </strong>
                  </li>
                ))}
            </ol>
            <span className="source-line">
              {season} season · {metric.source} · Updated {metric.updated}
            </span>
          </div>
        </Panel>
      </div>
    </>
  );
}

function ScheduleView({
  season,
  week,
  teamFilter,
  statusFilter,
  onTeamFilter,
  onStatusFilter,
  mode,
}: {
  season: number;
  week: string;
  teamFilter: "all" | TeamId;
  statusFilter: "all" | GameStatus;
  onTeamFilter: (team: "all" | TeamId) => void;
  onStatusFilter: (status: "all" | GameStatus) => void;
  mode: StateMode;
}) {
  const rows = games.filter(
    (game) =>
      (week === "All weeks" || game.week === week) &&
      (teamFilter === "all" || game.watchedTeamIds.includes(teamFilter)) &&
      (statusFilter === "all" || game.status === statusFilter),
  );

  return (
    <Panel
      title="Schedule & results"
      actions={
        <div className="filter-row compact">
          <label>
            <span>Team</span>
            <select
              value={teamFilter}
              onChange={(event) => onTeamFilter(event.target.value as "all" | TeamId)}
            >
              <option value="all">All watched teams</option>
              {teams.map((team) => (
                <option value={team.id} key={team.id}>
                  {team.shortName}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(event) =>
                onStatusFilter(event.target.value as "all" | GameStatus)
              }
            >
              <option value="all">All statuses</option>
              {[
                "scheduled",
                "delayed",
                "in-progress",
                "halftime",
                "final",
                "postponed",
                "canceled",
              ].map((status) => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>
      }
    >
      <div className="section-intro">
        <div>
          <span className="eyebrow">{season} demo season · {week}</span>
          <p>
            Times are displayed in America/Chicago (CT). Scores appear only for
            in-progress, halftime, or final fixtures.
          </p>
        </div>
        <span className="source-line">
          Source of record: Demo Sports feed for scores · Demo Schedule feed for times
        </span>
      </div>
      {mode === "unavailable" ? (
        <div className="unavailable-block roomy" role="status">
          <XCircle size={20} aria-hidden="true" />
          <strong>Schedule provider unavailable</strong>
          <span>
            The last successful schedule update is unavailable in this fixture
            state. Rankings and statistics are preserved in their own surfaces.
          </span>
        </div>
      ) : rows.length ? (
        <>
          <GameRows
            rows={rows as typeof games}
            conflict={mode === "conflict"}
            season={season}
          />
          <div className="trust-strip">
            <ShieldCheck size={18} aria-hidden="true" />
            <span>
              Final-state protection: Iowa 10 · Ohio State 38 remains final after
              a failed or regressive ordinary refresh. Source corrections must be
              explicitly labeled.
            </span>
          </div>
        </>
      ) : (
        <div className="empty-inline" role="status">
          <Clock size={20} aria-hidden="true" />
          <strong>No matching games</strong>
          <span>
            The four-team watchlist is configured correctly. This filter has no
            games; it is not a watchlist configuration error.
          </span>
        </div>
      )}
    </Panel>
  );
}

function RankingsView({
  season,
  rankingSource,
  onRankingSource,
  mode,
}: {
  season: number;
  rankingSource: RankingSource;
  onRankingSource: (source: RankingSource) => void;
  mode: StateMode;
}) {
  const sourceUnavailable =
    rankingSource === "cfp" || (rankingSource === "ap" && mode === "partial");
  const chartData = rankingHistory[rankingSource].map((row) => {
    if (season === 2026) return row;
    return Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key,
        key === "week" || value == null ? value : Number(value) + 1,
      ]),
    );
  });

  return (
    <div className="rankings-grid">
      <Panel
        title="Ranking trend"
        actions={
          <SegmentedControl
            size="sm"
            value={rankingSource}
            onChange={(value: string) => onRankingSource(value as RankingSource)}
            options={[
              { value: "ap", label: "AP" },
              { value: "coaches", label: "Coaches" },
              { value: "cfp", label: "CFP" },
            ]}
          />
        }
      >
        <div className="section-intro">
          <div>
            <span className="eyebrow">{sourceLabels[rankingSource]} · {season}</span>
            <p>
              A lower number is a stronger rank. Gaps remain gaps: explicitly
              unranked and unavailable observations are never connected.
            </p>
          </div>
          <span className="source-line">
            Demo Poll archive · Poll date Oct 8, {season} · Updated 1:00 PM CT
          </span>
        </div>
        {sourceUnavailable ? (
          <div className="unavailable-block roomy">
            <Warning size={20} aria-hidden="true" />
            <strong>
              {rankingSource === "cfp"
                ? "CFP poll not yet released"
                : "AP provider unavailable"}
            </strong>
            <span>
              This is unavailable, not unranked. Select another configured source
              to inspect dated observations.
            </span>
          </div>
        ) : (
          <TrendChart
            data={chartData}
            series={[
              { key: "texas", label: "Texas", role: "live" },
              { key: "ohio-state", label: "Ohio State", role: "baseline" },
              { key: "oregon", label: "Oregon", role: "context" },
              { key: "notre-dame", label: "Notre Dame", role: "context" },
            ]}
            xKey="week"
            modes={["line"]}
            title="Dated poll positions"
            yLabel="Rank"
            xInterval={0}
            height={300}
            valueFormatter={(value: number) => `No. ${value}`}
          />
        )}
      </Panel>

      <Panel title="Accessible poll values">
        <Table>
          <TableHead>
            <TableRow hoverable={false}>
              <TableHeader>Team</TableHeader>
              {rankingHistory[rankingSource].map((row) => (
                <TableHeader key={String(row.week)} align="right">
                  {String(row.week)}
                </TableHeader>
              ))}
              <TableHeader>State</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team) => {
              const observationState = sourceUnavailable
                ? "unavailable"
                : rankingObservationState[rankingSource][team.id];
              return (
                <TableRow key={team.id}>
                  <TableCell>{team.shortName}</TableCell>
                  {chartData.map((row) => (
                    <TableCell key={String(row.week)} align="right">
                      {observationState === "unavailable"
                        ? "—"
                        : row[team.id] == null
                          ? observationState === "unranked"
                            ? "UR"
                            : "—"
                          : `#${row[team.id]}`}
                    </TableCell>
                  ))}
                  <TableCell>
                    {observationState === "ranked"
                      ? "Ranked"
                      : observationState === "unranked"
                        ? "Explicitly unranked"
                        : "Unavailable"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <p className="table-note">
          “UR” means the poll explicitly left the team unranked. “—” means an
          observation is unavailable. Neither is rendered as rank zero.
        </p>
      </Panel>
    </div>
  );
}

function CompareView({
  season,
  metricId,
  onMetric,
}: {
  season: number;
  metricId: MetricId;
  onMetric: (metric: MetricId) => void;
}) {
  const metric = metrics[metricId];
  const max = Math.max(
    ...teams.map((team) => metricValue(metricId, team.id, season)),
  );

  return (
    <Panel
      title="Team comparison"
      actions={
        <label className="metric-select">
          <span>Focused metric</span>
          <select
            value={metricId}
            onChange={(event) => onMetric(event.target.value as MetricId)}
          >
            {Object.entries(metrics).map(([id, item]) => (
              <option value={id} key={id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      }
    >
      <div className="metric-definition">
        <div>
          <span className="eyebrow">{metric.label}</span>
          <h2>{metric.definition}</h2>
        </div>
        <dl>
          <div>
            <dt>Unit</dt>
            <dd>{metric.unit}</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>{season} season</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>{metric.source}</dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd>{metric.updated}</dd>
          </div>
        </dl>
      </div>
      <div className="comparison-bars" aria-label={`${metric.label} comparison`}>
        {teams.map((team) => {
          const value = metricValue(metricId, team.id, season);
          const tiedWith = teams.filter(
            (candidate) =>
              candidate.id !== team.id &&
              metricValue(metricId, candidate.id, season) === value,
          );
          return (
            <div className="comparison-row" key={team.id}>
              <div className="comparison-label">
                <span>{team.shortName}</span>
                <strong>
                  {value} {metric.unit}
                </strong>
              </div>
              <div
                className="comparison-track"
                role="img"
                aria-label={`${team.shortName}: ${value} ${metric.unit}${
                  tiedWith.length ? `, tied with ${tiedWith.map((item) => item.shortName).join(", ")}` : ""
                }`}
              >
                <span style={{ width: `${(value / max) * 100}%` }} />
              </div>
              {tiedWith.length ? (
                <span className="tie-note">
                  Tie with {tiedWith.map((item) => item.shortName).join(", ")}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <Table>
        <TableHead>
          <TableRow hoverable={false}>
            <TableHeader>Metric</TableHeader>
            {teams.map((team) => (
              <TableHeader align="right" key={team.id}>
                {team.shortName}
              </TableHeader>
            ))}
            <TableHeader>Unit / definition</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(metrics).map(([id, item]) => (
            <TableRow key={id} selected={id === metricId}>
              <TableCell>{item.label}</TableCell>
              {teams.map((team) => (
                <TableCell align="right" key={team.id}>
                  {metricValue(id as MetricId, team.id, season)}
                </TableCell>
              ))}
              <TableCell nowrap={false} muted>
                {item.unit} · {item.definition} · {season} season · {item.source} · Updated {item.updated}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="table-note">
        Each metric keeps its own labeled unit and scale. Unlike units are not
        plotted together. Equal values remain equal; favorite status never breaks a tie.
      </p>
    </Panel>
  );
}

function TeamDetail({
  teamId,
  season,
  rankingSource,
  mode,
  onBack,
}: {
  teamId: TeamId;
  season: number;
  rankingSource: RankingSource;
  mode: StateMode;
  onBack: () => void;
}) {
  const team = teams.find((candidate) => candidate.id === teamId)!;
  const teamGames = games.filter((game) => game.watchedTeamIds.includes(teamId));

  return (
    <div className="detail-stack">
      <Button variant="outline" size="sm" icon={ArrowLeft} onClick={onBack}>
        Back to overview
      </Button>
      <div className="detail-heading">
        <span
          className="team-key large"
          style={{ backgroundColor: team.accent }}
          aria-hidden="true"
        />
        <div>
          <span className="eyebrow">{season} team detail · configured ID {team.id}</span>
          <h1>{team.name}</h1>
          <p>
            Mapping verified to this configured team only. No similarly named
            program has been substituted.
          </p>
        </div>
        <Badge
          variant={
            (mode === "partial" && rankingSource === "ap") ||
            rankingSource === "cfp"
              ? "warning"
              : teamId === "texas"
                ? "accent"
                : "subtle"
          }
        >
          {mode === "partial" && rankingSource === "ap"
            ? "Unavailable"
            : rankingValue(rankingSource, teamId, season)}
        </Badge>
      </div>
      <div className="detail-grid">
        <Panel title="Team snapshot">
          <dl className="snapshot-dl">
            <div><dt>Record</dt><dd>{recordForSeason(teamId, season)}</dd></div>
            <div><dt>Conference</dt><dd>{team.conferenceRecord}</dd></div>
            <div><dt>Streak</dt><dd>{team.streak}</dd></div>
            <div>
              <dt>Next game</dt>
              <dd>
                {mode === "unavailable"
                  ? `Unavailable · last known ${team.next}`
                  : team.next}
              </dd>
            </div>
            <div><dt>Recent form</dt><dd>{team.recent.join(" · ")}</dd></div>
            <div><dt>Freshness</dt><dd>Current fixture · updated Oct 10, 4:12 PM CT</dd></div>
          </dl>
        </Panel>
        <Panel title="Schedule & results">
          <GameRows
            rows={teamGames as typeof games}
            conflict={mode === "conflict"}
            season={season}
          />
        </Panel>
      </div>
      <RankingsView
        season={season}
        rankingSource={rankingSource}
        onRankingSource={() => undefined}
        mode={mode}
      />
      <Panel title="Configured metrics">
        <Table>
          <TableHead>
            <TableRow hoverable={false}>
              <TableHeader>Metric</TableHeader>
              <TableHeader align="right">Value</TableHeader>
              <TableHeader>Definition / source</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(metrics).map(([metricId, metric]) => (
              <TableRow key={metricId}>
                <TableCell>{metric.label}</TableCell>
                <TableCell align="right">
                  {metricValue(metricId as MetricId, teamId, season)}{" "}
                  {metric.unit}
                </TableCell>
                <TableCell nowrap={false} muted>
                  {metric.definition} · {season} season · {metric.source} · Updated {metric.updated}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}

export default function Dashboard() {
  const [view, setView] = useState<View>("overview");
  const [season, setSeason] = useState(2026);
  const [week, setWeek] = useState("Week 7");
  const [rankingSource, setRankingSource] = useState<RankingSource>("ap");
  const [metricId, setMetricId] = useState<MetricId>("win-percentage");
  const [teamFilter, setTeamFilter] = useState<"all" | TeamId>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | GameStatus>("all");
  const [stateMode, setStateMode] = useState<StateMode>("normal");
  const [teamDetail, setTeamDetail] = useState<TeamId | null>(null);

  const stateLabel = useMemo(
    () =>
      ({
        normal: "Normal populated",
        loading: "Loading / updating",
        empty: "Empty week",
        stale: "Stale refresh",
        unavailable: "Provider unavailable",
        conflict: "Provider conflict",
        partial: "Partial provider",
      })[stateMode],
    [stateMode],
  );

  const changeView = (next: View) => {
    setTeamDetail(null);
    setView(next);
  };

  return (
    <main
      className="signal-root"
      style={andromedaVars() as React.CSSProperties}
    >
      <TableStyles />
      <header className="signal-header">
        <a className="brand-lockup" href="#main-content" aria-label="Saturday Signal, skip to dashboard">
          <span aria-hidden="true" className="brand-mark">SS</span>
          <span>
            <strong>Saturday Signal</strong>
            <small>College football watch desk</small>
          </span>
        </a>
        <div className="global-context" aria-label="Dashboard context">
          <Badge variant="outline">Demo fixtures · not live</Badge>
          <span>Last successful update · Oct 10, 4:12 PM CT</span>
        </div>
      </header>

      <nav className="signal-nav" aria-label="Primary dashboard views">
        <SegmentedControl
          value={view}
          onChange={(next: string) => changeView(next as View)}
          options={viewOptions}
          size="md"
        />
      </nav>

      <section className="control-deck" aria-label="Current dashboard controls">
        <label>
          <span>Season</span>
          <select value={season} onChange={(event) => setSeason(Number(event.target.value))}>
            <option value={2026}>2026 demo season</option>
            <option value={2025}>2025 demo season</option>
          </select>
        </label>
        <label>
          <span>Week</span>
          <select value={week} onChange={(event) => setWeek(event.target.value)}>
            <option value="Week 7">Week 7</option>
            <option value="Week 8">Week 8</option>
            <option value="All weeks">All weeks</option>
          </select>
        </label>
        <label>
          <span>Ranking source</span>
          <select
            value={rankingSource}
            onChange={(event) => setRankingSource(event.target.value as RankingSource)}
          >
            <option value="ap">AP Top 25</option>
            <option value="coaches">Coaches Poll</option>
            <option value="cfp">CFP Rankings</option>
          </select>
        </label>
        <label>
          <span>Comparison metric</span>
          <select
            value={metricId}
            onChange={(event) => setMetricId(event.target.value as MetricId)}
          >
            {Object.entries(metrics).map(([id, metric]) => (
              <option value={id} key={id}>{metric.label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Demonstrated data state</span>
          <select
            value={stateMode}
            onChange={(event) => setStateMode(event.target.value as StateMode)}
          >
            <option value="normal">Normal populated</option>
            <option value="loading">Loading / updating</option>
            <option value="empty">Empty week</option>
            <option value="stale">Stale refresh</option>
            <option value="unavailable">Provider unavailable</option>
            <option value="conflict">Provider conflict</option>
            <option value="partial">Partial provider</option>
          </select>
        </label>
        <div className="current-state" aria-live="polite">
          <span>Current state</span>
          <strong>{stateLabel}</strong>
        </div>
      </section>

      <div id="main-content" className="signal-content" tabIndex={-1}>
        <StateNotice mode={stateMode} />

        {stateMode === "loading" ? (
          <Panel title="Updating fixture data">
            <div className="loading-state" role="status" aria-live="polite">
              <Spinner variant="accent" size="lg" label="Loading fixture data" />
              <div>
                <Badge variant="accent">Updating</Badge>
                <h1>Checking independent fixture providers</h1>
                <p>
                  The selected {season} season, {week}, {sourceLabels[rankingSource]},
                  and {metrics[metricId].label} context is retained while data loads.
                </p>
              </div>
            </div>
          </Panel>
        ) : stateMode === "empty" ? (
          <EmptyState>
            <EmptyStateIcon>
              <CheckCircle />
            </EmptyStateIcon>
            <EmptyStateTitle>No watched games in this demo week</EmptyStateTitle>
            <EmptyStateDescription>
              The watchlist is valid and still contains Texas, Ohio State, Oregon,
              and Notre Dame. This empty state means no games matched the selected
              week; it is distinct from an empty-watchlist configuration error.
            </EmptyStateDescription>
          </EmptyState>
        ) : teamDetail ? (
          <TeamDetail
            teamId={teamDetail}
            season={season}
            rankingSource={rankingSource}
            mode={stateMode}
            onBack={() => setTeamDetail(null)}
          />
        ) : view === "overview" ? (
          <Overview
            season={season}
            week={week}
            metricId={metricId}
            rankingSource={rankingSource}
            mode={stateMode}
            onOpenTeam={setTeamDetail}
            onView={changeView}
          />
        ) : view === "schedule" ? (
          <ScheduleView
            season={season}
            week={week}
            teamFilter={teamFilter}
            statusFilter={statusFilter}
            onTeamFilter={setTeamFilter}
            onStatusFilter={setStatusFilter}
            mode={stateMode}
          />
        ) : view === "rankings" ? (
          <RankingsView
            season={season}
            rankingSource={rankingSource}
            onRankingSource={setRankingSource}
            mode={stateMode}
          />
        ) : (
          <CompareView season={season} metricId={metricId} onMetric={setMetricId} />
        )}
      </div>

      <footer className="signal-footer">
        <div>
          <Info size={16} aria-hidden="true" />
          <span>
            Deterministic evaluation fixtures only. No scores, rankings, schedules,
            or statistics are represented as current sports data.
          </span>
        </div>
        <div>
          <span>Team mapping 4/4 verified</span>
          <span>Timezone America/Chicago</span>
          <span>Score source of record: Demo Sports feed</span>
        </div>
      </footer>

      <style>{`
        ${mq.md} {
          .signal-header,
          .control-deck,
          .overview-kicker,
          .detail-heading {
            align-items: flex-start;
            flex-direction: column;
          }
          .global-context {
            align-items: flex-start;
          }
          .control-deck {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          }
          .control-deck label,
          .current-state,
          .control-deck select {
            width: 100%;
          }
          .team-grid,
          .bento-grid,
          .rankings-grid,
          .detail-grid {
            grid-template-columns: minmax(0, 1fr);
          }
          .team-card.favorite-team {
            grid-column: auto;
          }
          .freshness-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          }
          .filter-row.compact {
            max-width: 100%;
            overflow-x: auto;
          }
          .game-row {
            grid-template-columns: minmax(0, 1fr);
          }
          .game-result {
            align-items: flex-start;
            text-align: left;
          }
          .metric-definition {
            grid-template-columns: minmax(0, 1fr);
          }
          .metric-definition dl {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          }
          .comparison-row {
            grid-template-columns: minmax(0, 1fr);
          }
          .signal-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }
        ${mq.sm} {
          .signal-root {
            padding: var(--andromeda-3);
          }
          .control-deck {
            grid-template-columns: minmax(0, 1fr);
          }
          .signal-header {
            padding: var(--andromeda-4);
          }
          .overview-kicker h1,
          .detail-heading h1 {
            font-size: var(--andromeda-text-3xl);
          }
          .freshness-grid {
            grid-template-columns: minmax(0, 1fr);
          }
          .signal-panel-body,
          .team-card-content {
            padding: var(--andromeda-3);
          }
          .metric-definition dl {
            grid-template-columns: minmax(0, 1fr);
          }
        }
        ${mq.coarse} {
          .team-open,
          select {
            min-height: var(--andromeda-10);
          }
        }
      `}</style>
    </main>
  );
}
