"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  Database,
  Info,
  ListFilter,
  MapPin,
  Radio,
  RefreshCw,
  SearchX,
  ShieldCheck,
  Star,
  TrendingUp,
  Trophy,
  Users,
  WifiOff,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type Season = 2025 | 2026;
type View = "overview" | "schedule" | "rankings" | "comparison" | "team";
type DemoState =
  | "normal"
  | "loading"
  | "stale"
  | "partial"
  | "conflict"
  | "empty"
  | "mapping"
  | "config-error";
type RankingSource = "ap" | "coaches" | "cfp";
type MetricId =
  | "win-percentage"
  | "points-per-game"
  | "points-allowed-per-game"
  | "total-offense-yards-per-game";
type GameStatus =
  | "scheduled"
  | "delayed"
  | "in-progress"
  | "halftime"
  | "final"
  | "postponed"
  | "canceled";
type RankValue = number | "UR" | null;

type Team = {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  accent: string;
};

type Snapshot = {
  record: string;
  conferenceRecord: string;
  rank: Record<RankingSource, RankValue>;
  streak: string;
  lastResult: string;
  nextGame: string;
  recentForm: string[];
};

type Game = {
  id: string;
  season: Season;
  week: string;
  teamId: string;
  opponent: string;
  opponentShort: string;
  status: GameStatus;
  date: string;
  venue: string | null;
  teamScore?: number;
  opponentScore?: number;
  period?: string;
  clock?: string;
  source: string;
  updated: string;
};

type MetricDefinition = {
  id: MetricId;
  short: string;
  label: string;
  definition: string;
  unit: string;
  higherIsBetter: boolean;
};

const teams: Team[] = [
  {
    id: "texas",
    name: "Texas Longhorns",
    shortName: "Texas",
    initials: "TX",
    accent: "#BF5700",
  },
  {
    id: "ohio-state",
    name: "Ohio State Buckeyes",
    shortName: "Ohio State",
    initials: "OS",
    accent: "#BA0C2F",
  },
  {
    id: "oregon",
    name: "Oregon Ducks",
    shortName: "Oregon",
    initials: "OR",
    accent: "#2BAA72",
  },
  {
    id: "notre-dame",
    name: "Notre Dame Fighting Irish",
    shortName: "Notre Dame",
    initials: "ND",
    accent: "#3C7DB5",
  },
];

const snapshots: Record<Season, Record<string, Snapshot>> = {
  2026: {
    texas: {
      record: "6–1",
      conferenceRecord: "3–1 SEC",
      rank: { ap: 5, coaches: 6, cfp: null },
      streak: "W3",
      lastResult: "W 31–27 vs Georgia",
      nextGame: "Oct 24 · at Vanderbilt · 6:30 PM CT",
      recentForm: ["W 31–27 UGA", "W 42–17 OU", "W 28–10 UK", "L 24–27 FLA"],
    },
    "ohio-state": {
      record: "7–0",
      conferenceRecord: "4–0 Big Ten",
      rank: { ap: 2, coaches: 2, cfp: null },
      streak: "W7",
      lastResult: "W 38–20 at Wisconsin",
      nextGame: "Oct 24 · vs Penn State · 11:00 AM CT",
      recentForm: ["W 38–20 WIS", "W 45–13 ILL", "W 34–17 IOWA", "W 49–6 RUT"],
    },
    oregon: {
      record: "5–2",
      conferenceRecord: "3–1 Big Ten",
      rank: { ap: "UR", coaches: 24, cfp: null },
      streak: "W1",
      lastResult: "W 35–13 vs Washington",
      nextGame: "Oct 25 · at Michigan · 2:30 PM CT",
      recentForm: ["W 35–13 WASH", "L 27–30 USC", "W 41–20 PUR", "W 31–28 PSU"],
    },
    "notre-dame": {
      record: "6–1",
      conferenceRecord: "Independent",
      rank: { ap: null, coaches: 11, cfp: null },
      streak: "W5",
      lastResult: "W 27–16 vs USC",
      nextGame: "Oct 24 · vs Navy · 7:00 PM CT",
      recentForm: ["W 27–16 USC", "W 31–14 PITT", "W 24–21 MIA", "W 44–7 PUR"],
    },
  },
  2025: {
    texas: {
      record: "10–3",
      conferenceRecord: "6–2 SEC",
      rank: { ap: 8, coaches: 9, cfp: 7 },
      streak: "W1",
      lastResult: "W 35–21 vs Clemson",
      nextGame: "Season complete",
      recentForm: ["W 35–21 CLEM", "L 24–28 UGA", "W 31–17 A&M", "W 27–20 ARK"],
    },
    "ohio-state": {
      record: "12–2",
      conferenceRecord: "8–1 Big Ten",
      rank: { ap: 3, coaches: 3, cfp: 4 },
      streak: "W4",
      lastResult: "W 34–23 vs Oregon",
      nextGame: "Season complete",
      recentForm: ["W 34–23 ORE", "W 28–14 TENN", "W 38–10 IND", "W 31–24 MICH"],
    },
    oregon: {
      record: "11–2",
      conferenceRecord: "8–1 Big Ten",
      rank: { ap: 6, coaches: 5, cfp: 6 },
      streak: "L1",
      lastResult: "L 23–34 at Ohio State",
      nextGame: "Season complete",
      recentForm: ["L 23–34 OSU", "W 45–20 WASH", "W 30–27 PSU", "W 42–17 WIS"],
    },
    "notre-dame": {
      record: "9–3",
      conferenceRecord: "Independent",
      rank: { ap: 12, coaches: 12, cfp: 11 },
      streak: "W2",
      lastResult: "W 31–24 vs Army",
      nextGame: "Season complete",
      recentForm: ["W 31–24 ARMY", "W 28–20 USC", "L 17–24 NAVY", "W 35–10 BC"],
    },
  },
};

const games: Game[] = [
  {
    id: "tx-uga-26",
    season: 2026,
    week: "Week 7",
    teamId: "texas",
    opponent: "Georgia Bulldogs",
    opponentShort: "Georgia",
    status: "final",
    date: "Sat, Oct 17 · 6:30 PM CT",
    venue: "Darrell K Royal–Texas Memorial Stadium",
    teamScore: 31,
    opponentScore: 27,
    source: "Scorebook fixture · source of record",
    updated: "Oct 17, 2026 · 10:04 PM CT",
  },
  {
    id: "osu-wisc-26",
    season: 2026,
    week: "Week 7",
    teamId: "ohio-state",
    opponent: "Wisconsin Badgers",
    opponentShort: "Wisconsin",
    status: "in-progress",
    date: "Sat, Oct 17 · 7:00 PM CT",
    venue: "Camp Randall Stadium",
    teamScore: 24,
    opponentScore: 17,
    period: "Q3",
    clock: "04:18",
    source: "Scorebook fixture · source of record",
    updated: "Oct 17, 2026 · 9:12 PM CT",
  },
  {
    id: "ore-wash-26",
    season: 2026,
    week: "Week 7",
    teamId: "oregon",
    opponent: "Washington Huskies",
    opponentShort: "Washington",
    status: "halftime",
    date: "Sat, Oct 17 · 9:30 PM CT",
    venue: "Autzen Stadium",
    teamScore: 21,
    opponentScore: 10,
    period: "Halftime",
    source: "Scorebook fixture · source of record",
    updated: "Oct 17, 2026 · 10:47 PM CT",
  },
  {
    id: "nd-usc-26",
    season: 2026,
    week: "Week 7",
    teamId: "notre-dame",
    opponent: "USC Trojans",
    opponentShort: "USC",
    status: "delayed",
    date: "Sat, Oct 17 · 2:30 PM CT",
    venue: "Notre Dame Stadium",
    teamScore: 13,
    opponentScore: 10,
    period: "Q2",
    clock: "08:42",
    source: "Scorebook fixture · source of record",
    updated: "Oct 17, 2026 · 3:36 PM CT",
  },
  {
    id: "tx-vandy-26",
    season: 2026,
    week: "Week 8",
    teamId: "texas",
    opponent: "Vanderbilt Commodores",
    opponentShort: "Vanderbilt",
    status: "scheduled",
    date: "Sat, Oct 24 · 6:30 PM CT",
    venue: "FirstBank Stadium",
    source: "Schedule fixture",
    updated: "Oct 18, 2026 · 9:00 AM CT",
  },
  {
    id: "osu-psu-26",
    season: 2026,
    week: "Week 8",
    teamId: "ohio-state",
    opponent: "Penn State Nittany Lions",
    opponentShort: "Penn State",
    status: "postponed",
    date: "Sat, Oct 24 · time TBD CT",
    venue: "Ohio Stadium",
    source: "Schedule fixture",
    updated: "Oct 18, 2026 · 11:20 AM CT",
  },
  {
    id: "ore-mich-26",
    season: 2026,
    week: "Week 8",
    teamId: "oregon",
    opponent: "Michigan Wolverines",
    opponentShort: "Michigan",
    status: "canceled",
    date: "Sun, Oct 25 · 2:30 PM CT",
    venue: "Michigan Stadium",
    source: "Schedule fixture",
    updated: "Oct 18, 2026 · 12:05 PM CT",
  },
  {
    id: "nd-navy-26",
    season: 2026,
    week: "Week 8",
    teamId: "notre-dame",
    opponent: "Navy Midshipmen",
    opponentShort: "Navy",
    status: "scheduled",
    date: "Sat, Oct 24 · 7:00 PM CT",
    venue: null,
    source: "Schedule fixture",
    updated: "Oct 18, 2026 · 9:00 AM CT",
  },
  {
    id: "tx-clem-25",
    season: 2025,
    week: "Postseason",
    teamId: "texas",
    opponent: "Clemson Tigers",
    opponentShort: "Clemson",
    status: "final",
    date: "Sat, Dec 20 · 3:00 PM CT",
    venue: "Mercedes-Benz Stadium",
    teamScore: 35,
    opponentScore: 21,
    source: "2025 archive fixture",
    updated: "Dec 20, 2025 · 6:42 PM CT",
  },
  {
    id: "osu-ore-25",
    season: 2025,
    week: "Postseason",
    teamId: "ohio-state",
    opponent: "Oregon Ducks",
    opponentShort: "Oregon",
    status: "final",
    date: "Thu, Jan 1 · 4:00 PM CT",
    venue: "Rose Bowl",
    teamScore: 34,
    opponentScore: 23,
    source: "2025 archive fixture",
    updated: "Jan 1, 2026 · 7:47 PM CT",
  },
];

const metrics: MetricDefinition[] = [
  {
    id: "win-percentage",
    short: "WIN%",
    label: "Win percentage",
    definition: "Games won divided by games played in the selected season.",
    unit: "%",
    higherIsBetter: true,
  },
  {
    id: "points-per-game",
    short: "PPG",
    label: "Points per game",
    definition: "Average points scored per completed game in the selected season.",
    unit: "pts/game",
    higherIsBetter: true,
  },
  {
    id: "points-allowed-per-game",
    short: "PAPG",
    label: "Points allowed per game",
    definition: "Average opponent points per completed game in the selected season.",
    unit: "pts/game",
    higherIsBetter: false,
  },
  {
    id: "total-offense-yards-per-game",
    short: "OFF YPG",
    label: "Total offense yards per game",
    definition: "Average rushing plus passing yards gained per completed game.",
    unit: "yds/game",
    higherIsBetter: true,
  },
];

const metricValues: Record<Season, Record<string, Record<MetricId, number>>> = {
  2026: {
    texas: {
      "win-percentage": 85.7,
      "points-per-game": 34.8,
      "points-allowed-per-game": 18.1,
      "total-offense-yards-per-game": 456.2,
    },
    "ohio-state": {
      "win-percentage": 100,
      "points-per-game": 38.6,
      "points-allowed-per-game": 12.7,
      "total-offense-yards-per-game": 482.4,
    },
    oregon: {
      "win-percentage": 71.4,
      "points-per-game": 31.4,
      "points-allowed-per-game": 21.3,
      "total-offense-yards-per-game": 441.8,
    },
    "notre-dame": {
      "win-percentage": 85.7,
      "points-per-game": 31.4,
      "points-allowed-per-game": 16.9,
      "total-offense-yards-per-game": 418.6,
    },
  },
  2025: {
    texas: {
      "win-percentage": 76.9,
      "points-per-game": 32.1,
      "points-allowed-per-game": 19.7,
      "total-offense-yards-per-game": 435.7,
    },
    "ohio-state": {
      "win-percentage": 85.7,
      "points-per-game": 36.9,
      "points-allowed-per-game": 14.2,
      "total-offense-yards-per-game": 470.1,
    },
    oregon: {
      "win-percentage": 84.6,
      "points-per-game": 35.2,
      "points-allowed-per-game": 18.4,
      "total-offense-yards-per-game": 466.5,
    },
    "notre-dame": {
      "win-percentage": 75,
      "points-per-game": 29.8,
      "points-allowed-per-game": 20.1,
      "total-offense-yards-per-game": 407.9,
    },
  },
};

const rankHistory: Record<
  Season,
  Record<string, Record<RankingSource, RankValue[]>>
> = {
  2026: {
    texas: {
      ap: [8, 7, 5, 5],
      coaches: [8, 7, 6, 6],
      cfp: [null, null, null, null],
    },
    "ohio-state": {
      ap: [3, 3, 2, 2],
      coaches: [3, 2, 2, 2],
      cfp: [null, null, null, null],
    },
    oregon: {
      ap: [14, 18, "UR", "UR"],
      coaches: [13, 20, 25, 24],
      cfp: [null, null, null, null],
    },
    "notre-dame": {
      ap: [15, 13, null, null],
      coaches: [16, 14, 12, 11],
      cfp: [null, null, null, null],
    },
  },
  2025: {
    texas: {
      ap: [10, 9, 8, 8],
      coaches: [11, 10, 9, 9],
      cfp: [9, 8, 7, 7],
    },
    "ohio-state": {
      ap: [5, 4, 3, 3],
      coaches: [5, 4, 3, 3],
      cfp: [5, 4, 4, 4],
    },
    oregon: {
      ap: [4, 4, 5, 6],
      coaches: [4, 4, 5, 5],
      cfp: [4, 5, 6, 6],
    },
    "notre-dame": {
      ap: [14, 13, 12, 12],
      coaches: [14, 13, 12, 12],
      cfp: [13, 12, 11, 11],
    },
  },
};

const rankWeeks: Record<Season, string[]> = {
  2026: ["Sep 27", "Oct 4", "Oct 11", "Oct 18"],
  2025: ["Nov 23", "Nov 30", "Dec 7", "Final"],
};

const statusLabels: Record<GameStatus, string> = {
  scheduled: "Scheduled",
  delayed: "Delayed",
  "in-progress": "In progress",
  halftime: "Halftime",
  final: "Final",
  postponed: "Postponed",
  canceled: "Canceled",
};

const demoLabels: Record<DemoState, string> = {
  normal: "Normal fixture",
  loading: "Updating",
  stale: "Stale schedule",
  partial: "Ranking outage",
  conflict: "Source conflict",
  empty: "No games this week",
  mapping: "Mapping error",
  "config-error": "Watchlist error",
};

const sourceLabels: Record<RankingSource, string> = {
  ap: "AP fixture",
  coaches: "Coaches fixture",
  cfp: "CFP fixture",
};

function formatRank(value: RankValue) {
  if (typeof value === "number") return `No. ${value}`;
  if (value === "UR") return "Unranked";
  return "Unavailable";
}

function teamById(id: string) {
  return teams.find((team) => team.id === id) ?? teams[0];
}

function statusTone(status: GameStatus) {
  if (status === "in-progress" || status === "halftime") return "live";
  if (status === "final") return "success";
  if (status === "delayed" || status === "postponed") return "warning";
  if (status === "canceled") return "fault";
  return "neutral";
}

function Badge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "live" | "success" | "warning" | "fault" | "subtle";
  children: React.ReactNode;
}) {
  return (
    <span className={`badge badge-${tone}`}>
      <span className="badge-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

function Panel({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={`panel ${glow ? "panel-glow" : ""} ${className}`}>
      <span className="corner corner-tl" aria-hidden="true" />
      <span className="corner corner-tr" aria-hidden="true" />
      <span className="corner corner-bl" aria-hidden="true" />
      <span className="corner corner-br" aria-hidden="true" />
      {children}
    </div>
  );
}

function SectionHeader({
  code,
  title,
  description,
  action,
}: {
  code: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-header">
      <div>
        <span className="eyebrow">{code}</span>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="section-action">{action}</div> : null}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
  compact = false,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <label className={`select-field ${compact ? "select-compact" : ""}`}>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {children}
      </select>
    </label>
  );
}

function StateNotice({ state }: { state: DemoState }) {
  if (state === "normal") return null;

  const notices: Record<
    Exclude<DemoState, "normal" | "loading" | "config-error">,
    {
      tone: "warning" | "fault" | "accent";
      icon: React.ReactNode;
      title: string;
      text: string;
    }
  > = {
    stale: {
      tone: "warning",
      icon: <Clock3 size={18} />,
      title: "Schedule feed is stale",
      text: "Last successful schedule update: Oct 18, 2026 · 9:00 AM CT. Last-known scores and finals are retained with their original timestamps.",
    },
    partial: {
      tone: "warning",
      icon: <WifiOff size={18} />,
      title: "Ranking provider unavailable",
      text: "Ranking observations cannot be refreshed. Scorebook and StatsLab fixture data remain available and keep their own freshness states.",
    },
    conflict: {
      tone: "fault",
      icon: <AlertTriangle size={18} />,
      title: "Conflicting final score under review",
      text: "Scorebook fixture reports Texas 31–27 Georgia; backup fixture reports 30–27. Scorebook is the declared source of record and the discrepancy is not averaged or hidden.",
    },
    empty: {
      tone: "accent",
      icon: <CalendarDays size={18} />,
      title: "No watched-team games in this week",
      text: "Your four-team watchlist is valid. Choose another week or open the season schedule to see games.",
    },
    mapping: {
      tone: "fault",
      icon: <SearchX size={18} />,
      title: "Unknown team mapping needs correction",
      text: "Provider alias “Miami” could refer to more than one program. It has not been assigned to a configured team or merged into the watchlist.",
    },
  };

  if (state === "loading") {
    return (
      <div className="inline-alert alert-accent" role="status">
        <RefreshCw size={18} className="spin" />
        <div>
          <strong>Updating fixture sources</strong>
          <p>Previously confirmed final scores remain protected while data is checked.</p>
        </div>
      </div>
    );
  }

  const notice = notices[state];
  return (
    <div
      className={`inline-alert alert-${notice.tone}`}
      role={notice.tone === "fault" ? "alert" : "status"}
    >
      {notice.icon}
      <div>
        <strong>{notice.title}</strong>
        <p>{notice.text}</p>
      </div>
    </div>
  );
}

function LoadingPanel() {
  return (
    <main className="main-content" aria-busy="true" aria-label="Updating fixture data">
      <div className="loading-heading">
        <span className="loading-line loading-line-short" />
        <span className="loading-line loading-line-long" />
      </div>
      <div className="loading-grid">
        {Array.from({ length: 4 }).map((_, index) => (
          <Panel className="loading-card" key={index}>
            <span className="loading-block" />
            <span className="loading-line loading-line-medium" />
            <span className="loading-line loading-line-long" />
            <span className="loading-line loading-line-short" />
          </Panel>
        ))}
      </div>
      <p className="sr-only">Loading deterministic schedule, ranking, and statistical fixtures.</p>
    </main>
  );
}

function FreshnessStrip({
  demoState,
  isRefreshing,
}: {
  demoState: DemoState;
  isRefreshing: boolean;
}) {
  const items = [
    {
      label: "Scores",
      source: "Scorebook fixture",
      updated: "Oct 17 · 10:47 PM CT",
      state:
        isRefreshing || demoState === "loading"
          ? "Updating"
          : demoState === "stale"
            ? "Stale"
            : demoState === "conflict"
              ? "Conflict"
              : "Current",
    },
    {
      label: "Schedule",
      source: "Schedule fixture",
      updated: "Oct 18 · 9:00 AM CT",
      state: demoState === "stale" ? "Stale" : "Current",
    },
    {
      label: "Rankings",
      source: "Poll archive fixture",
      updated: "Oct 18 · 1:00 PM CT",
      state: demoState === "partial" ? "Unavailable" : "Current",
    },
    {
      label: "Statistics",
      source: "StatsLab fixture",
      updated: "Oct 18 · 12:00 PM CT",
      state: "Current",
    },
  ];

  return (
    <div className="freshness-strip" aria-label="Data source freshness">
      {items.map((item) => (
        <div className="freshness-item" key={item.label}>
          <div>
            <span className="freshness-label">{item.label}</span>
            <strong>{item.state}</strong>
          </div>
          <span>
            {item.source} · {item.updated}
          </span>
        </div>
      ))}
    </div>
  );
}

function GameCard({ game, compact = false }: { game: Game; compact?: boolean }) {
  const team = teamById(game.teamId);
  const showScore =
    game.status === "final" ||
    game.status === "in-progress" ||
    game.status === "halftime" ||
    game.status === "delayed";

  return (
    <article className={`game-card ${compact ? "game-card-compact" : ""}`}>
      <div className="game-card-top">
        <Badge tone={statusTone(game.status)}>
          {statusLabels[game.status]}
          {game.period ? ` · ${game.period}` : ""}
          {game.clock ? ` ${game.clock}` : ""}
        </Badge>
        <span className="game-week">{game.week}</span>
      </div>
      <div className="matchup">
        <div className="matchup-team">
          <span className="team-chip" style={{ "--team": team.accent } as React.CSSProperties}>
            {team.initials}
          </span>
          <span>
            <strong>{team.shortName}</strong>
            <small>{team.name}</small>
          </span>
        </div>
        {showScore ? (
          <strong className="score" aria-label={`${game.teamScore ?? ""} to ${game.opponentScore ?? ""}`}>
            {game.teamScore}
            <span>–</span>
            {game.opponentScore}
          </strong>
        ) : (
          <span className="versus" aria-label="versus">
            VS
          </span>
        )}
        <div className="matchup-team matchup-team-away">
          <span className="team-chip team-chip-neutral">{game.opponentShort.slice(0, 2).toUpperCase()}</span>
          <span>
            <strong>{game.opponentShort}</strong>
            <small>{game.opponent}</small>
          </span>
        </div>
      </div>
      <div className="game-meta">
        <span>
          <Clock3 size={14} aria-hidden="true" />
          {game.date}
        </span>
        <span>
          <MapPin size={14} aria-hidden="true" />
          {game.venue ?? "Location unavailable"}
        </span>
      </div>
      <div className="source-line">
        <Database size={13} aria-hidden="true" />
        {game.source} · updated {game.updated}
      </div>
    </article>
  );
}

function TeamCard({
  team,
  snapshot,
  source,
  onOpen,
}: {
  team: Team;
  snapshot: Snapshot;
  source: RankingSource;
  onOpen: () => void;
}) {
  const favorite = team.id === "texas";
  return (
    <button
      className={`team-card panel ${favorite ? "team-card-favorite panel-glow" : ""}`}
      onClick={onOpen}
      type="button"
      aria-label={`Open ${team.name} team detail`}
    >
      <span className="corner corner-tl" aria-hidden="true" />
      <span className="corner corner-tr" aria-hidden="true" />
      <span className="corner corner-bl" aria-hidden="true" />
      <span className="corner corner-br" aria-hidden="true" />
      <div className="team-card-head">
        <span
          className="team-emblem"
          style={{ "--team": team.accent } as React.CSSProperties}
          aria-hidden="true"
        >
          {team.initials}
        </span>
        <div>
          <span className="team-card-kicker">
            {favorite ? (
              <>
                <Star size={12} fill="currentColor" aria-hidden="true" /> Favorite
              </>
            ) : (
              "Watchlist"
            )}
          </span>
          <h3>{team.shortName}</h3>
          <p>{team.name}</p>
        </div>
        <ChevronRight size={20} aria-hidden="true" />
      </div>
      <div className="snapshot-numbers">
        <div>
          <span>Record</span>
          <strong>{snapshot.record}</strong>
          <small>{snapshot.conferenceRecord}</small>
        </div>
        <div>
          <span>{sourceLabels[source]}</span>
          <strong>{formatRank(snapshot.rank[source])}</strong>
          <small>Poll date Oct 18</small>
        </div>
        <div>
          <span>Form</span>
          <strong>{snapshot.streak}</strong>
          <small>{snapshot.lastResult}</small>
        </div>
      </div>
      <div className="next-game">
        <CalendarDays size={15} aria-hidden="true" />
        <span>
          <small>Next game</small>
          {snapshot.nextGame}
        </span>
      </div>
    </button>
  );
}

function MetricBars({
  season,
  metricId,
  compact = false,
}: {
  season: Season;
  metricId: MetricId;
  compact?: boolean;
}) {
  const metric = metrics.find((item) => item.id === metricId) ?? metrics[0];
  const values = teams.map((team) => metricValues[season][team.id][metricId]);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const best = metric.higherIsBetter ? max : min;

  return (
    <div className={`metric-bars ${compact ? "metric-bars-compact" : ""}`}>
      {teams.map((team) => {
        const value = metricValues[season][team.id][metricId];
        const width = max === 0 ? 0 : Math.max(8, (value / max) * 100);
        const tied = values.filter((candidate) => candidate === value).length > 1;
        return (
          <div className="metric-row" key={team.id}>
            <div className="metric-row-label">
              <span>{team.shortName}</span>
              {value === best ? (
                <small>{tied ? "Tied best" : "Best"}</small>
              ) : tied ? (
                <small>Tied value</small>
              ) : null}
            </div>
            <div className="metric-track" aria-hidden="true">
              <span
                style={
                  {
                    "--bar-width": `${width}%`,
                    "--team": team.accent,
                  } as React.CSSProperties
                }
              />
            </div>
            <strong>
              {value.toFixed(metricId === "win-percentage" ? 1 : 1)}{" "}
              <small>{metric.unit}</small>
            </strong>
          </div>
        );
      })}
    </div>
  );
}

function Overview({
  season,
  week,
  source,
  metricId,
  demoState,
  onOpenTeam,
  onOpenSchedule,
  onOpenComparison,
}: {
  season: Season;
  week: string;
  source: RankingSource;
  metricId: MetricId;
  demoState: DemoState;
  onOpenTeam: (id: string) => void;
  onOpenSchedule: () => void;
  onOpenComparison: () => void;
}) {
  const currentGames =
    demoState === "empty"
      ? []
      : games
          .filter((game) => game.season === season)
          .filter((game) => season === 2025 || game.week === week)
          .filter((game) =>
            ["final", "in-progress", "halftime", "delayed"].includes(game.status),
          );

  return (
    <main className="main-content" id="main-content">
      <StateNotice state={demoState} />

      <section aria-labelledby="watchlist-title">
        <SectionHeader
          code={`01 / ${season} ${week}`}
          title="Watchlist pulse"
          description="Records, rank state, recent form, and the next known kickoff for every configured program."
        />
        <div className="team-grid" id="watchlist-title">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              snapshot={snapshots[season][team.id]}
              source={source}
              onOpen={() => onOpenTeam(team.id)}
            />
          ))}
        </div>
      </section>

      <section className="two-column" aria-label="Current games and comparison">
        <Panel className="section-panel">
          <SectionHeader
            code="02 / GAME WINDOW"
            title="Live & recent"
            description={`Watched-team games in ${week}. Scores appear only when the game state supports them.`}
            action={
              <button className="text-button" type="button" onClick={onOpenSchedule}>
                Full schedule <ChevronRight size={14} />
              </button>
            }
          />
          {currentGames.length ? (
            <div className="game-stack">
              {currentGames.slice(0, 3).map((game) => (
                <GameCard game={game} compact key={game.id} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <CalendarDays size={26} aria-hidden="true" />
              <strong>No watched-team games in {week}</strong>
              <p>The watchlist is configured correctly. Try another week.</p>
            </div>
          )}
        </Panel>

        <Panel className="section-panel">
          <SectionHeader
            code="03 / COMPARISON"
            title={metrics.find((metric) => metric.id === metricId)?.label ?? ""}
            description={`${season} season · one shared ${metrics.find((metric) => metric.id === metricId)?.unit} scale`}
            action={
              <button className="text-button" type="button" onClick={onOpenComparison}>
                Compare all <ChevronRight size={14} />
              </button>
            }
          />
          <MetricBars season={season} metricId={metricId} compact />
          <div className="definition-note">
            <Info size={15} aria-hidden="true" />
            <span>
              {metrics.find((metric) => metric.id === metricId)?.definition} Source:
              StatsLab fixture · updated Oct 18, 2026 at 12:00 PM CT.
            </span>
          </div>
        </Panel>
      </section>
    </main>
  );
}

function ScheduleView({
  season,
  demoState,
}: {
  season: Season;
  demoState: DemoState;
}) {
  const [teamFilter, setTeamFilter] = useState("all");
  const [weekFilter, setWeekFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredGames = useMemo(() => {
    if (demoState === "empty") return [];
    return games
      .filter((game) => game.season === season)
      .filter((game) => teamFilter === "all" || game.teamId === teamFilter)
      .filter((game) => weekFilter === "all" || game.week === weekFilter)
      .filter((game) => statusFilter === "all" || game.status === statusFilter);
  }, [demoState, season, statusFilter, teamFilter, weekFilter]);

  return (
    <main className="main-content" id="main-content">
      <StateNotice state={demoState} />
      <section>
        <SectionHeader
          code="SCHEDULE / RESULTS"
          title={`${season} game ledger`}
          description="Every status remains explicit. Scheduled, postponed, and canceled games never receive placeholder scores."
        />
        <Panel className="filter-panel">
          <div className="filter-heading">
            <ListFilter size={17} aria-hidden="true" />
            <strong>Visible schedule filters</strong>
          </div>
          <div className="filter-grid">
            <SelectField label="Watched team" value={teamFilter} onChange={setTeamFilter}>
              <option value="all">All watched teams</option>
              {teams.map((team) => (
                <option value={team.id} key={team.id}>
                  {team.shortName}
                </option>
              ))}
            </SelectField>
            <SelectField label="Week / stage" value={weekFilter} onChange={setWeekFilter}>
              <option value="all">All weeks</option>
              <option value="Week 7">Week 7</option>
              <option value="Week 8">Week 8</option>
              <option value="Postseason">Postseason</option>
            </SelectField>
            <SelectField label="Game status" value={statusFilter} onChange={setStatusFilter}>
              <option value="all">All statuses</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </SelectField>
          </div>
        </Panel>

        <div className="status-legend" aria-label="Game status legend">
          {(Object.keys(statusLabels) as GameStatus[]).map((status) => (
            <Badge tone={statusTone(status)} key={status}>
              {statusLabels[status]}
            </Badge>
          ))}
        </div>

        {filteredGames.length ? (
          <div className="schedule-grid">
            {filteredGames.map((game) => (
              <Panel className="schedule-panel" key={game.id}>
                <GameCard game={game} />
              </Panel>
            ))}
          </div>
        ) : (
          <Panel className="empty-panel">
            <div className="empty-state">
              <CalendarDays size={30} aria-hidden="true" />
              <strong>No games match the current filters</strong>
              <p>This is an empty result, not a watchlist configuration error.</p>
            </div>
          </Panel>
        )}
      </section>

      <Panel className="trust-note">
        <ShieldCheck size={19} aria-hidden="true" />
        <div>
          <strong>Final-state protection</strong>
          <p>
            Final games are immutable during a normal refresh. A provider correction must be
            labeled explicitly; a failed refresh retains the confirmed final and its prior
            timestamp.
          </p>
        </div>
      </Panel>
    </main>
  );
}

function RankCell({ value }: { value: RankValue }) {
  return (
    <span
      className={`rank-cell ${
        typeof value === "number" ? "rank-number" : value === "UR" ? "rank-unranked" : "rank-gap"
      }`}
      title={formatRank(value)}
    >
      {typeof value === "number" ? value : value === "UR" ? "UR" : "—"}
    </span>
  );
}

function RankingsView({
  season,
  source,
  setSource,
  demoState,
}: {
  season: Season;
  source: RankingSource;
  setSource: (source: RankingSource) => void;
  demoState: DemoState;
}) {
  return (
    <main className="main-content" id="main-content">
      <StateNotice state={demoState} />
      <section>
        <SectionHeader
          code="RANKINGS / TRENDS"
          title={`${sourceLabels[source]} history`}
          description="Each poll observation keeps its date and state. Gaps are shown as gaps—never connected or inferred."
          action={
            <SelectField
              label="Ranking source"
              value={source}
              onChange={(value) => setSource(value as RankingSource)}
              compact
            >
              <option value="ap">AP fixture</option>
              <option value="coaches">Coaches fixture</option>
              <option value="cfp">CFP fixture</option>
            </SelectField>
          }
        />

        <div className="rank-grid" role="list">
          {teams.map((team) => {
            const values =
              demoState === "partial"
                ? rankHistory[season][team.id][source].map(() => null)
                : rankHistory[season][team.id][source];
            const current = values.at(-1) ?? null;
            return (
              <Panel className="rank-panel" key={team.id}>
                <div className="rank-team">
                  <span
                    className="team-emblem team-emblem-small"
                    style={{ "--team": team.accent } as React.CSSProperties}
                    aria-hidden="true"
                  >
                    {team.initials}
                  </span>
                  <div>
                    <span>{team.name}</span>
                    <strong>{formatRank(current)}</strong>
                    <small>
                      {sourceLabels[source]} · poll date {rankWeeks[season].at(-1)}
                    </small>
                  </div>
                </div>
                <div
                  className="rank-plot"
                  role="img"
                  aria-label={`${team.shortName} ${sourceLabels[source]} trend: ${values
                    .map((value, index) => `${rankWeeks[season][index]} ${formatRank(value)}`)
                    .join(", ")}`}
                >
                  {values.map((value, index) => (
                    <div className="rank-observation" key={rankWeeks[season][index]}>
                      <RankCell value={value} />
                      <small>{rankWeeks[season][index]}</small>
                    </div>
                  ))}
                </div>
              </Panel>
            );
          })}
        </div>

        <Panel className="rank-table-panel">
          <div className="table-heading">
            <div>
              <span className="eyebrow">ACCESSIBLE VALUES</span>
              <h3>Poll observations</h3>
            </div>
            <div className="legend-inline">
              <span><i className="legend-number" /> Ranked</span>
              <span><i className="legend-unranked" /> Explicitly unranked</span>
              <span><i className="legend-gap" /> Unavailable</span>
            </div>
          </div>
          <div className="responsive-table-wrap">
            <table className="data-table rank-table">
              <caption className="sr-only">
                {sourceLabels[source]} ranking observations for all watched teams
              </caption>
              <thead>
                <tr>
                  <th scope="col">Team</th>
                  {rankWeeks[season].map((week) => (
                    <th scope="col" key={week}>
                      {week}
                    </th>
                  ))}
                  <th scope="col">Source</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => {
                  const values =
                    demoState === "partial"
                      ? rankHistory[season][team.id][source].map(() => null)
                      : rankHistory[season][team.id][source];
                  return (
                    <tr key={team.id}>
                      <th scope="row">{team.shortName}</th>
                      {values.map((value, index) => (
                        <td data-label={rankWeeks[season][index]} key={rankWeeks[season][index]}>
                          {formatRank(value)}
                        </td>
                      ))}
                      <td data-label="Source">{sourceLabels[source]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>
    </main>
  );
}

function ComparisonView({
  season,
  metricId,
  setMetricId,
  demoState,
}: {
  season: Season;
  metricId: MetricId;
  setMetricId: (metric: MetricId) => void;
  demoState: DemoState;
}) {
  const metric = metrics.find((item) => item.id === metricId) ?? metrics[0];

  return (
    <main className="main-content" id="main-content">
      <StateNotice state={demoState} />
      <section>
        <SectionHeader
          code="TEAM / COMPARISON"
          title={`${season} performance matrix`}
          description="The focus view uses one metric and one unit. The full table preserves all underlying values without mixing their scales."
          action={
            <SelectField
              label="Focused metric"
              value={metricId}
              onChange={(value) => setMetricId(value as MetricId)}
              compact
            >
              {metrics.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.label}
                </option>
              ))}
            </SelectField>
          }
        />

        <div className="comparison-layout">
          <Panel className="comparison-chart">
            <div className="metric-title">
              <div>
                <span className="eyebrow">FOCUSED SCALE / {metric.short}</span>
                <h3>{metric.label}</h3>
              </div>
              <Badge tone="subtle">{metric.unit}</Badge>
            </div>
            <MetricBars season={season} metricId={metricId} />
          </Panel>
          <Panel className="metric-definition-panel">
            <Info size={20} aria-hidden="true" />
            <span className="eyebrow">METRIC DEFINITION</span>
            <h3>{metric.label}</h3>
            <p>{metric.definition}</p>
            <dl>
              <div>
                <dt>Unit</dt>
                <dd>{metric.unit}</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>{season} regular + completed postseason games</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>StatsLab deterministic fixture</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>Oct 18, 2026 · 12:00 PM CT</dd>
              </div>
            </dl>
          </Panel>
        </div>

        <Panel className="comparison-table-panel">
          <div className="table-heading">
            <div>
              <span className="eyebrow">ALL CONFIGURED METRICS</span>
              <h3>Underlying values</h3>
            </div>
            <p>Equal values remain tied. Favorite status never changes placement.</p>
          </div>
          <div className="responsive-table-wrap">
            <table className="data-table comparison-table">
              <caption className="sr-only">
                {season} comparison metrics for every watched team
              </caption>
              <thead>
                <tr>
                  <th scope="col">Team</th>
                  {metrics.map((item) => (
                    <th scope="col" key={item.id}>
                      {item.label}
                      <small>{item.unit}</small>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <th scope="row">
                      {team.shortName}
                      {team.id === "texas" ? <small>Favorite</small> : null}
                    </th>
                    {metrics.map((item) => {
                      const value = metricValues[season][team.id][item.id];
                      const tie =
                        teams.filter(
                          (candidate) =>
                            metricValues[season][candidate.id][item.id] === value,
                        ).length > 1;
                      return (
                        <td data-label={`${item.label} (${item.unit})`} key={item.id}>
                          <strong>{value.toFixed(1)}</strong>
                          {tie ? <small className="tie-label">Tied value</small> : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="source-line table-source">
            <Database size={13} aria-hidden="true" />
            StatsLab deterministic fixture · {season} season · updated Oct 18, 2026 at
            12:00 PM CT
          </div>
        </Panel>
      </section>
    </main>
  );
}

function TeamDetail({
  teamId,
  season,
  source,
  demoState,
  onBack,
}: {
  teamId: string;
  season: Season;
  source: RankingSource;
  demoState: DemoState;
  onBack: () => void;
}) {
  const team = teamById(teamId);
  const snapshot = snapshots[season][team.id];
  const teamGames = games.filter(
    (game) => game.season === season && game.teamId === team.id,
  );
  const history =
    demoState === "partial"
      ? rankHistory[season][team.id][source].map(() => null)
      : rankHistory[season][team.id][source];

  return (
    <main className="main-content" id="main-content">
      <button className="back-button" type="button" onClick={onBack}>
        <ArrowLeft size={16} aria-hidden="true" />
        Return to overview
      </button>
      <StateNotice state={demoState} />
      <section className="team-detail-hero">
        <Panel className="team-detail-title" glow={team.id === "texas"}>
          <span
            className="team-emblem team-emblem-large"
            style={{ "--team": team.accent } as React.CSSProperties}
            aria-hidden="true"
          >
            {team.initials}
          </span>
          <div>
            <span className="eyebrow">
              STABLE TEAM ID / {team.id}
              {team.id === "texas" ? " / FAVORITE" : ""}
            </span>
            <h2>{team.name}</h2>
            <p>
              {season} season · {snapshot.conferenceRecord} · fixture data, not live
            </p>
          </div>
        </Panel>
        <div className="stat-tile-grid">
          <Panel className="stat-tile">
            <span>Record</span>
            <strong>{snapshot.record}</strong>
            <small>{snapshot.conferenceRecord}</small>
          </Panel>
          <Panel className="stat-tile">
            <span>{sourceLabels[source]}</span>
            <strong>{formatRank(snapshot.rank[source])}</strong>
            <small>Poll date {rankWeeks[season].at(-1)}</small>
          </Panel>
          <Panel className="stat-tile">
            <span>Current streak</span>
            <strong>{snapshot.streak}</strong>
            <small>{snapshot.lastResult}</small>
          </Panel>
        </div>
      </section>

      <section className="detail-grid">
        <Panel className="section-panel">
          <SectionHeader
            code="RECENT FORM"
            title="Last four results"
            description={`${season} results stay isolated from other seasons.`}
          />
          <ol className="form-list">
            {snapshot.recentForm.map((result) => (
              <li key={result}>
                <CheckCircle2 size={16} aria-hidden="true" />
                {result}
              </li>
            ))}
          </ol>
          <div className="next-game detail-next-game">
            <CalendarDays size={16} aria-hidden="true" />
            <span>
              <small>Next scheduled game</small>
              {snapshot.nextGame}
            </span>
          </div>
        </Panel>

        <Panel className="section-panel">
          <SectionHeader
            code="RANK HISTORY"
            title={sourceLabels[source]}
            description="Unavailable and unranked observations remain distinct."
          />
          <div className="team-rank-history">
            {history.map((value, index) => (
              <div key={rankWeeks[season][index]}>
                <small>{rankWeeks[season][index]}</small>
                <RankCell value={value} />
                <span>{formatRank(value)}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="section-panel detail-schedule">
          <SectionHeader
            code="SCHEDULE / RESULTS"
            title={`${season} selected-team games`}
            description="Timezone: America/Chicago (CT). Actual instants remain unchanged."
          />
          <div className="game-stack">
            {teamGames.length ? (
              teamGames.map((game) => <GameCard game={game} compact key={game.id} />)
            ) : (
              <div className="empty-state">
                <CalendarDays size={24} aria-hidden="true" />
                <strong>No fixture games for this team and season</strong>
              </div>
            )}
          </div>
        </Panel>

        <Panel className="section-panel detail-metrics">
          <SectionHeader
            code="CONFIGURED METRICS"
            title="Season performance"
            description="Every value carries a definition, unit, season scope, source, and update time."
          />
          <dl className="team-metric-list">
            {metrics.map((metric) => (
              <div key={metric.id}>
                <dt>
                  <strong>{metric.label}</strong>
                  <span>{metric.definition}</span>
                </dt>
                <dd>
                  <strong>{metricValues[season][team.id][metric.id].toFixed(1)}</strong>
                  <span>{metric.unit}</span>
                  <small>
                    {season} · StatsLab fixture · Oct 18, 2026 12:00 PM CT
                  </small>
                </dd>
              </div>
            ))}
          </dl>
        </Panel>
      </section>
    </main>
  );
}

function ConfigErrorView() {
  return (
    <main className="main-content" id="main-content">
      <Panel className="config-error-panel">
        <Users size={34} aria-hidden="true" />
        <span className="eyebrow">CONFIGURATION ERROR / EMPTY WATCHLIST</span>
        <h2>No teams are configured</h2>
        <p>
          Add between two and eight teams and select one favorite. This is different from a
          valid watchlist with no games in a chosen week.
        </p>
        <div className="inline-alert alert-fault" role="alert">
          <AlertTriangle size={18} />
          <div>
            <strong>Watchlist validation failed</strong>
            <p>Expected 2–8 stable team IDs; received 0.</p>
          </div>
        </div>
      </Panel>
    </main>
  );
}

export function Dashboard() {
  const [season, setSeason] = useState<Season>(2026);
  const [week, setWeek] = useState("Week 7");
  const [view, setView] = useState<View>("overview");
  const [lastPrimaryView, setLastPrimaryView] = useState<Exclude<View, "team">>(
    "overview",
  );
  const [selectedTeam, setSelectedTeam] = useState("texas");
  const [rankingSource, setRankingSource] = useState<RankingSource>("ap");
  const [metricId, setMetricId] = useState<MetricId>("win-percentage");
  const [demoState, setDemoState] = useState<DemoState>("normal");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = (next: Exclude<View, "team">) => {
    setView(next);
    setLastPrimaryView(next);
  };

  const openTeam = (id: string) => {
    setSelectedTeam(id);
    setView("team");
  };

  const refresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    window.setTimeout(() => setIsRefreshing(false), 700);
  };

  const primaryViews: Array<{
    id: Exclude<View, "team">;
    label: string;
    icon: React.ReactNode;
  }> = [
    { id: "overview", label: "Overview", icon: <Activity size={16} /> },
    { id: "schedule", label: "Schedule", icon: <CalendarDays size={16} /> },
    { id: "rankings", label: "Rankings", icon: <TrendingUp size={16} /> },
    { id: "comparison", label: "Compare", icon: <BarChart3 size={16} /> },
  ];

  return (
    <div className="dashboard-shell">
      <a className="skip-link" href="#main-content">
        Skip to dashboard content
      </a>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <Radio size={22} />
          </span>
          <div>
            <span>Saturday</span>
            <strong>Signal</strong>
          </div>
          <Badge tone="subtle">2026 LAB</Badge>
        </div>

        <div className="fixture-notice">
          <CircleDot size={14} aria-hidden="true" />
          <span>
            <strong>Deterministic fixture</strong>
            <small>Scenario clock: Oct 18, 2026 · 3:42 PM CT · not live</small>
          </span>
        </div>

        <button
          className="refresh-button"
          type="button"
          onClick={refresh}
          disabled={isRefreshing}
          aria-live="polite"
        >
          <RefreshCw size={16} className={isRefreshing ? "spin" : ""} />
          {isRefreshing ? "Checking…" : "Refresh fixtures"}
        </button>
      </header>

      <div className="control-deck">
        <nav className="view-nav" aria-label="Primary dashboard views">
          {primaryViews.map((item) => (
            <button
              type="button"
              key={item.id}
              className={view === item.id ? "active" : ""}
              aria-current={view === item.id ? "page" : undefined}
              onClick={() => navigate(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          {view === "team" ? (
            <button type="button" className="active" aria-current="page">
              <Trophy size={16} />
              {teamById(selectedTeam).shortName}
            </button>
          ) : null}
        </nav>

        <div className="global-controls">
          <SelectField
            label="Season"
            value={season}
            onChange={(value) => {
              const nextSeason = Number(value) as Season;
              setSeason(nextSeason);
              setWeek(nextSeason === 2026 ? "Week 7" : "Postseason");
            }}
            compact
          >
            <option value={2026}>2026 season</option>
            <option value={2025}>2025 archive</option>
          </SelectField>
          <SelectField label="Week / stage" value={week} onChange={setWeek} compact>
            {season === 2026 ? (
              <>
                <option value="Week 7">Week 7</option>
                <option value="Week 8">Week 8</option>
                <option value="Week 9">Week 9</option>
              </>
            ) : (
              <option value="Postseason">Postseason</option>
            )}
          </SelectField>
          <SelectField
            label="Data scenario"
            value={demoState}
            onChange={(value) => setDemoState(value as DemoState)}
            compact
          >
            {Object.entries(demoLabels).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </SelectField>
        </div>
      </div>

      <FreshnessStrip demoState={demoState} isRefreshing={isRefreshing} />

      {demoState === "loading" ? (
        <LoadingPanel />
      ) : demoState === "config-error" ? (
        <ConfigErrorView />
      ) : view === "overview" ? (
        <Overview
          season={season}
          week={week}
          source={rankingSource}
          metricId={metricId}
          demoState={demoState}
          onOpenTeam={openTeam}
          onOpenSchedule={() => navigate("schedule")}
          onOpenComparison={() => navigate("comparison")}
        />
      ) : view === "schedule" ? (
        <ScheduleView season={season} demoState={demoState} />
      ) : view === "rankings" ? (
        <RankingsView
          season={season}
          source={rankingSource}
          setSource={setRankingSource}
          demoState={demoState}
        />
      ) : view === "comparison" ? (
        <ComparisonView
          season={season}
          metricId={metricId}
          setMetricId={setMetricId}
          demoState={demoState}
        />
      ) : (
        <TeamDetail
          teamId={selectedTeam}
          season={season}
          source={rankingSource}
          demoState={demoState}
          onBack={() => setView(lastPrimaryView)}
        />
      )}

      <footer className="dashboard-footer">
        <div>
          <Zap size={15} aria-hidden="true" />
          <strong>Saturday Signal fixture lab</strong>
          <span>No credentials · no external data API · no live-data claim</span>
        </div>
        <div>
          <ShieldCheck size={15} aria-hidden="true" />
          <span>Score source of record: Scorebook fixture</span>
        </div>
      </footer>
    </div>
  );
}
