"use client";

import { useMemo, useRef, useState } from "react";

type Surface = "overview" | "schedule" | "rankings" | "compare" | "team";
type Season = 2025 | 2026;
type TeamId = "texas" | "ohio-state" | "oregon" | "notre-dame";
type RankingSource = "AP" | "Coaches" | "CFP";
type Scenario =
  | "normal"
  | "loading"
  | "stale"
  | "unavailable"
  | "partial"
  | "conflict"
  | "empty"
  | "config"
  | "mapping";

type GameStatus =
  | "Scheduled"
  | "Delayed"
  | "In progress"
  | "Halftime"
  | "Final"
  | "Postponed"
  | "Canceled";

type Team = {
  id: TeamId;
  name: string;
  short: string;
  initials: string;
  accent: string;
  record: Record<Season, string>;
  conferenceRecord: Record<Season, string>;
  streak: Record<Season, string>;
  currentRank: Record<Season, Record<RankingSource, number | "UR" | null>>;
  lastResult: Record<Season, string>;
  nextGame: Record<Season, string>;
};

type Game = {
  id: string;
  season: Season;
  week: string;
  away: string;
  awayId?: TeamId;
  home: string;
  homeId?: TeamId;
  date: string;
  time: string;
  venue: string;
  status: GameStatus;
  score?: string;
  detail?: string;
  source: string;
  updated: string;
};

type MetricKey = "winPct" | "pointsFor" | "pointsAgainst" | "offense";

const teams: Team[] = [
  {
    id: "texas",
    name: "Texas Longhorns",
    short: "Texas",
    initials: "TEX",
    accent: "#BF5700",
    record: { 2025: "11–3", 2026: "5–0" },
    conferenceRecord: { 2025: "7–1 SEC", 2026: "3–0 SEC" },
    streak: { 2025: "W2", 2026: "W5" },
    currentRank: {
      2025: { AP: 6, Coaches: 7, CFP: 5 },
      2026: { AP: 3, Coaches: 4, CFP: null },
    },
    lastResult: { 2025: "W 31–24 vs Arizona State", 2026: "W 34–20 vs Florida" },
    nextGame: { 2025: "Season complete", 2026: "vs Oklahoma State · Oct 10" },
  },
  {
    id: "ohio-state",
    name: "Ohio State Buckeyes",
    short: "Ohio State",
    initials: "OSU",
    accent: "#BA0C2F",
    record: { 2025: "13–2", 2026: "4–1" },
    conferenceRecord: { 2025: "8–1 Big Ten", 2026: "2–1 Big Ten" },
    streak: { 2025: "W4", 2026: "W2" },
    currentRank: {
      2025: { AP: 2, Coaches: 2, CFP: 3 },
      2026: { AP: 5, Coaches: 5, CFP: null },
    },
    lastResult: { 2025: "W 27–17 vs Notre Dame", 2026: "W 41–17 vs Iowa" },
    nextGame: { 2025: "Season complete", 2026: "at Penn State · Oct 10" },
  },
  {
    id: "oregon",
    name: "Oregon Ducks",
    short: "Oregon",
    initials: "ORE",
    accent: "#154733",
    record: { 2025: "12–2", 2026: "4–1" },
    conferenceRecord: { 2025: "8–1 Big Ten", 2026: "3–0 Big Ten" },
    streak: { 2025: "L1", 2026: "W3" },
    currentRank: {
      2025: { AP: 4, Coaches: 3, CFP: 4 },
      2026: { AP: 8, Coaches: 7, CFP: null },
    },
    lastResult: { 2025: "L 21–24 vs Ohio State", 2026: "W 31–28 vs Washington" },
    nextGame: { 2025: "Season complete", 2026: "vs USC · Oct 17" },
  },
  {
    id: "notre-dame",
    name: "Notre Dame Fighting Irish",
    short: "Notre Dame",
    initials: "ND",
    accent: "#0C2340",
    record: { 2025: "10–3", 2026: "3–2" },
    conferenceRecord: { 2025: "Independent", 2026: "Independent" },
    streak: { 2025: "L1", 2026: "W1" },
    currentRank: {
      2025: { AP: 9, Coaches: 10, CFP: 8 },
      2026: { AP: "UR", Coaches: "UR", CFP: null },
    },
    lastResult: { 2025: "L 17–27 at Ohio State", 2026: "W 28–13 vs Navy" },
    nextGame: { 2025: "Season complete", 2026: "vs Miami · Oct 10" },
  },
];

const games: Game[] = [
  {
    id: "g-tex-osu",
    season: 2026,
    week: "Week 6",
    away: "Oklahoma State",
    home: "Texas",
    homeId: "texas",
    date: "Sat, Oct 10, 2026",
    time: "2:30 PM CT",
    venue: "DKR–Texas Memorial Stadium · Austin, TX",
    status: "In progress",
    score: "OKST 14 · TEX 17",
    detail: "3rd quarter · 8:42",
    source: "Fixture Scorebook A",
    updated: "Oct 10 · 4:06 PM CT",
  },
  {
    id: "g-osu-psu",
    season: 2026,
    week: "Week 6",
    away: "Ohio State",
    awayId: "ohio-state",
    home: "Penn State",
    date: "Sat, Oct 10, 2026",
    time: "11:00 AM CT",
    venue: "Beaver Stadium · University Park, PA",
    status: "Halftime",
    score: "OSU 13 · PSU 10",
    detail: "Halftime",
    source: "Fixture Scorebook A",
    updated: "Oct 10 · 12:34 PM CT",
  },
  {
    id: "g-ore-wash",
    season: 2026,
    week: "Week 6",
    away: "Washington",
    home: "Oregon",
    homeId: "oregon",
    date: "Fri, Oct 9, 2026",
    time: "8:00 PM CT",
    venue: "Autzen Stadium · Eugene, OR",
    status: "Final",
    score: "WASH 28 · ORE 31",
    detail: "Final",
    source: "Fixture Scorebook A",
    updated: "Oct 9 · 11:42 PM CT",
  },
  {
    id: "g-nd-mia",
    season: 2026,
    week: "Week 6",
    away: "Miami",
    home: "Notre Dame",
    homeId: "notre-dame",
    date: "Sat, Oct 10, 2026",
    time: "6:30 PM CT",
    venue: "Notre Dame Stadium · Notre Dame, IN",
    status: "Scheduled",
    source: "Fixture Schedule Desk",
    updated: "Oct 10 · 12:00 PM CT",
  },
  {
    id: "g-tex-uga",
    season: 2026,
    week: "Week 7",
    away: "Georgia",
    home: "Texas",
    homeId: "texas",
    date: "Sat, Oct 17, 2026",
    time: "6:30 PM CT",
    venue: "DKR–Texas Memorial Stadium · Austin, TX",
    status: "Delayed",
    detail: "Weather delay · new start time pending",
    source: "Fixture Schedule Desk",
    updated: "Oct 17 · 5:48 PM CT",
  },
  {
    id: "g-mich-osu",
    season: 2026,
    week: "Week 7",
    away: "Michigan",
    home: "Ohio State",
    homeId: "ohio-state",
    date: "Sat, Oct 17, 2026",
    time: "11:00 AM CT",
    venue: "Ohio Stadium · Columbus, OH",
    status: "Postponed",
    detail: "Reschedule date unavailable",
    source: "Fixture Schedule Desk",
    updated: "Oct 16 · 3:20 PM CT",
  },
  {
    id: "g-usc-ore",
    season: 2026,
    week: "Week 7",
    away: "USC",
    home: "Oregon",
    homeId: "oregon",
    date: "Sat, Oct 17, 2026",
    time: "2:30 PM CT",
    venue: "Autzen Stadium · Eugene, OR",
    status: "Canceled",
    detail: "Canceled by event organizer",
    source: "Fixture Schedule Desk",
    updated: "Oct 16 · 9:15 AM CT",
  },
  {
    id: "g-nd-clem",
    season: 2026,
    week: "Week 7",
    away: "Notre Dame",
    awayId: "notre-dame",
    home: "Clemson",
    date: "Sat, Oct 17, 2026",
    time: "Time TBA · CT",
    venue: "Location unavailable",
    status: "Scheduled",
    source: "Fixture Schedule Desk",
    updated: "Oct 15 · 8:00 AM CT",
  },
  {
    id: "g-2025-tex",
    season: 2025,
    week: "Postseason",
    away: "Texas",
    awayId: "texas",
    home: "Arizona State",
    date: "Thu, Jan 1, 2026",
    time: "12:00 PM CT",
    venue: "Mercedes-Benz Stadium · Atlanta, GA",
    status: "Final",
    score: "TEX 31 · ASU 24",
    detail: "Final · 2025 season record",
    source: "Fixture Historical Archive",
    updated: "Jan 1 · 4:18 PM CT",
  },
  {
    id: "g-2025-osu",
    season: 2025,
    week: "Postseason",
    away: "Notre Dame",
    awayId: "notre-dame",
    home: "Ohio State",
    homeId: "ohio-state",
    date: "Mon, Jan 19, 2026",
    time: "6:30 PM CT",
    venue: "Hard Rock Stadium · Miami Gardens, FL",
    status: "Final",
    score: "ND 17 · OSU 27",
    detail: "Final · 2025 season record",
    source: "Fixture Historical Archive",
    updated: "Jan 19 · 10:22 PM CT",
  },
  {
    id: "g-2025-ore",
    season: 2025,
    week: "Postseason",
    away: "Oregon",
    awayId: "oregon",
    home: "Ohio State",
    homeId: "ohio-state",
    date: "Wed, Jan 1, 2026",
    time: "4:00 PM CT",
    venue: "Rose Bowl · Pasadena, CA",
    status: "Final",
    score: "ORE 21 · OSU 24",
    detail: "Final · 2025 season record",
    source: "Fixture Historical Archive",
    updated: "Jan 1 · 7:42 PM CT",
  },
];

const rankingDates = ["Sep 7", "Sep 21", "Oct 5", "Oct 12"];
const rankingHistory: Record<Season, Record<RankingSource, Record<TeamId, (number | "UR" | null)[]>>> = {
  2026: {
    AP: {
      texas: [5, 4, 3, 3],
      "ohio-state": [2, 6, 5, 5],
      oregon: [7, null, 9, 8],
      "notre-dame": [11, "UR", null, "UR"],
    },
    Coaches: {
      texas: [6, 5, 4, 4],
      "ohio-state": [3, 5, 5, 5],
      oregon: [8, 8, 7, 7],
      "notre-dame": [12, "UR", "UR", "UR"],
    },
    CFP: {
      texas: [null, null, null, null],
      "ohio-state": [null, null, null, null],
      oregon: [null, null, null, null],
      "notre-dame": [null, null, null, null],
    },
  },
  2025: {
    AP: {
      texas: [9, 7, 6, 6],
      "ohio-state": [4, 3, 2, 2],
      oregon: [3, 4, 4, 4],
      "notre-dame": [12, 10, 9, 9],
    },
    Coaches: {
      texas: [10, 8, 7, 7],
      "ohio-state": [5, 3, 2, 2],
      oregon: [2, 3, 3, 3],
      "notre-dame": [11, null, 10, 10],
    },
    CFP: {
      texas: [null, 6, 5, 5],
      "ohio-state": [null, 4, 3, 3],
      oregon: [null, 3, 4, 4],
      "notre-dame": [null, 9, 8, 8],
    },
  },
};

const metricDefinitions: Record<
  MetricKey,
  { label: string; short: string; definition: string; unit: string; higherIsBetter: boolean }
> = {
  winPct: {
    label: "Win percentage",
    short: "Win %",
    definition: "Wins divided by games decided in the selected season.",
    unit: "%",
    higherIsBetter: true,
  },
  pointsFor: {
    label: "Points per game",
    short: "PPG",
    definition: "Average points scored per game in the selected season.",
    unit: "points/game",
    higherIsBetter: true,
  },
  pointsAgainst: {
    label: "Points allowed per game",
    short: "Opp. PPG",
    definition: "Average opponent points per game in the selected season.",
    unit: "points/game",
    higherIsBetter: false,
  },
  offense: {
    label: "Total offense",
    short: "Offense",
    definition: "Average passing plus rushing yards per game in the selected season.",
    unit: "yards/game",
    higherIsBetter: true,
  },
};

const metrics: Record<Season, Record<TeamId, Record<MetricKey, number>>> = {
  2026: {
    texas: { winPct: 100, pointsFor: 36.8, pointsAgainst: 17.4, offense: 472.6 },
    "ohio-state": { winPct: 80, pointsFor: 34.2, pointsAgainst: 14.8, offense: 451.2 },
    oregon: { winPct: 80, pointsFor: 34.2, pointsAgainst: 20.6, offense: 463.9 },
    "notre-dame": { winPct: 60, pointsFor: 27.6, pointsAgainst: 22.4, offense: 401.7 },
  },
  2025: {
    texas: { winPct: 78.6, pointsFor: 31.4, pointsAgainst: 20.1, offense: 438.2 },
    "ohio-state": { winPct: 86.7, pointsFor: 35.8, pointsAgainst: 15.6, offense: 459.8 },
    oregon: { winPct: 85.7, pointsFor: 34.5, pointsAgainst: 18.9, offense: 468.4 },
    "notre-dame": { winPct: 76.9, pointsFor: 29.1, pointsAgainst: 19.7, offense: 420.6 },
  },
};

const scenarioCopy: Record<Scenario, { label: string; state: string; message: string }> = {
  normal: {
    label: "Normal fixture",
    state: "Current",
    message: "All deterministic fixture providers responded successfully.",
  },
  loading: {
    label: "Loading / updating",
    state: "Updating",
    message: "Scores are being checked. Last-known values remain visible until the refresh succeeds.",
  },
  stale: {
    label: "Stale refresh",
    state: "Stale",
    message: "Score refresh failed. Last-known values are preserved with their prior update times.",
  },
  unavailable: {
    label: "Rankings unavailable",
    state: "Unavailable",
    message: "Ranking observations are temporarily unavailable; schedule and score data remain intact.",
  },
  partial: {
    label: "Partial provider failure",
    state: "Partial data",
    message: "Statistics provider is unavailable. Scores, schedules, and last-known records remain available.",
  },
  conflict: {
    label: "Provider conflict",
    state: "Conflict",
    message: "Two fixture score providers disagree. Scorebook A is the declared source of record.",
  },
  empty: {
    label: "Week with no games",
    state: "No games",
    message: "The watchlist is valid, but no watched-team games match this week.",
  },
  config: {
    label: "Empty watchlist error",
    state: "Configuration error",
    message: "No teams are configured. Add 2–8 stable team IDs before data can be shown.",
  },
  mapping: {
    label: "Unknown team mapping",
    state: "Mapping needs review",
    message: "Provider ID NDU-IRE was isolated because it cannot be safely mapped to a configured team.",
  },
};

const navItems: { id: Exclude<Surface, "team">; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "schedule", label: "Schedule" },
  { id: "rankings", label: "Rankings" },
  { id: "compare", label: "Compare" },
];

function displayRanking(value: number | "UR" | null) {
  if (value === null) return "Unavailable";
  if (value === "UR") return "Unranked";
  return `#${value}`;
}

function formatMetric(value: number, key: MetricKey) {
  if (key === "winPct") return `${value.toFixed(value % 1 ? 1 : 0)}%`;
  if (key === "offense") return `${value.toFixed(1)} yds/game`;
  return `${value.toFixed(1)} pts/game`;
}

function statusTone(status: GameStatus) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function SourceLine({ children }: { children: React.ReactNode }) {
  return <p className="source-line">{children}</p>;
}

function GameCard({ game, compact = false }: { game: Game; compact?: boolean }) {
  return (
    <article className={`game-card ${compact ? "game-card-compact" : ""}`}>
      <div className="game-card-topline">
        <span className={`status-badge status-${statusTone(game.status)}`}>{game.status}</span>
        <span>{game.week}</span>
      </div>
      <div className="matchup" aria-label={`${game.away} at ${game.home}`}>
        <span>{game.away}</span>
        <span className="at-mark">at</span>
        <span>{game.home}</span>
      </div>
      {game.score ? <p className="score">{game.score}</p> : null}
      {game.detail ? <p className="game-detail">{game.detail}</p> : null}
      <dl className="game-meta">
        <div>
          <dt>Kickoff</dt>
          <dd>{game.date} · {game.time}</dd>
        </div>
        <div>
          <dt>Venue</dt>
          <dd>{game.venue}</dd>
        </div>
      </dl>
      <SourceLine>Source: {game.source} · Updated {game.updated}</SourceLine>
    </article>
  );
}

export default function Home() {
  const [surface, setSurface] = useState<Surface>("overview");
  const [season, setSeason] = useState<Season>(2026);
  const [week, setWeek] = useState("Week 6");
  const [rankingSource, setRankingSource] = useState<RankingSource>("AP");
  const [metric, setMetric] = useState<MetricKey>("pointsFor");
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [selectedTeamId, setSelectedTeamId] = useState<TeamId>("texas");
  const [scheduleTeam, setScheduleTeam] = useState<"all" | TeamId>("all");
  const [scheduleStatus, setScheduleStatus] = useState<"all" | GameStatus>("all");
  const savedScroll = useRef(0);

  const selectedTeam = teams.find((team) => team.id === selectedTeamId) ?? teams[0];
  const seasonGames = games.filter((game) => game.season === season);
  const visibleGames = useMemo(() => {
    if (scenario === "empty" || scenario === "config") return [];
    return seasonGames.filter((game) => {
      const matchesWeek = week === "All weeks" || game.week === week;
      const matchesTeam =
        scheduleTeam === "all" ||
        game.homeId === scheduleTeam ||
        game.awayId === scheduleTeam;
      const matchesStatus = scheduleStatus === "all" || game.status === scheduleStatus;
      return matchesWeek && matchesTeam && matchesStatus;
    });
  }, [scenario, scheduleStatus, scheduleTeam, seasonGames, week]);

  const activeScenario = scenarioCopy[scenario];
  const sourceState =
    scenario === "stale"
      ? "Stale · last successful update Oct 10, 4:06 PM CT"
      : scenario === "loading"
        ? "Updating · retaining last-known data"
        : scenario === "unavailable"
          ? "Rankings unavailable · other data current"
          : scenario === "partial"
            ? "Partial · statistics unavailable"
            : "Current · last successful update Oct 10, 4:06 PM CT";

  function navigate(next: Exclude<Surface, "team">) {
    setSurface(next);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function openTeam(id: TeamId) {
    savedScroll.current = window.scrollY;
    setSelectedTeamId(id);
    setSurface("team");
    requestAnimationFrame(() => window.scrollTo({ top: 0 }));
  }

  function closeTeam() {
    setSurface("overview");
    requestAnimationFrame(() => window.scrollTo({ top: savedScroll.current }));
  }

  function changeSeason(next: Season) {
    setSeason(next);
    setWeek(next === 2026 ? "Week 6" : "Postseason");
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to dashboard</a>
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">SS</div>
          <div>
            <p className="eyebrow">College football watchlist</p>
            <p className="brand-name">Saturday Signal</p>
          </div>
        </div>
        <div className="fixture-notice" role="note">
          <span className="fixture-dot" aria-hidden="true" />
          Illustrative fixture data · not live
        </div>
      </header>

      <div className="page-grid">
        <aside className="sidebar" aria-label="Dashboard navigation">
          <nav className="primary-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={surface === item.id ? "nav-item active" : "nav-item"}
                aria-current={surface === item.id ? "page" : undefined}
                onClick={() => navigate(item.id)}
              >
                <span className="nav-glyph" aria-hidden="true">
                  {item.id === "overview" ? "⌂" : item.id === "schedule" ? "▦" : item.id === "rankings" ? "↗" : "≋"}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="sidebar-section">
            <p className="sidebar-label">Watched teams</p>
            {teams.map((team) => (
              <button
                type="button"
                key={team.id}
                className="team-shortcut"
                onClick={() => openTeam(team.id)}
                aria-label={`Open ${team.name} detail`}
              >
                <span className="team-mini-mark" style={{ backgroundColor: team.accent }}>
                  {team.initials}
                </span>
                <span>{team.short}</span>
              </button>
            ))}
          </div>

          <div className="trust-card">
            <p className="sidebar-label">Data trust</p>
            <strong>{activeScenario.state}</strong>
            <p>{sourceState}</p>
          </div>
        </aside>

        <main id="main-content" className="main-content">
          <section className="control-strip" aria-label="Dashboard scope">
            <label>
              <span>Season</span>
              <select
                value={season}
                onChange={(event) => changeSeason(Number(event.target.value) as Season)}
              >
                <option value={2026}>2026 season</option>
                <option value={2025}>2025 season</option>
              </select>
            </label>
            <label>
              <span>Week / stage</span>
              <select value={week} onChange={(event) => setWeek(event.target.value)}>
                {season === 2026 ? (
                  <>
                    <option>Week 6</option>
                    <option>Week 7</option>
                    <option>All weeks</option>
                  </>
                ) : (
                  <>
                    <option>Postseason</option>
                    <option>All weeks</option>
                  </>
                )}
              </select>
            </label>
            <label className="scenario-control">
              <span>Data state demo</span>
              <select value={scenario} onChange={(event) => setScenario(event.target.value as Scenario)}>
                {Object.entries(scenarioCopy).map(([id, item]) => (
                  <option key={id} value={id}>{item.label}</option>
                ))}
              </select>
            </label>
          </section>

          <section
            className={`state-banner state-${scenario}`}
            aria-live="polite"
            role={scenario === "normal" ? "status" : "alert"}
          >
            <div>
              <span className="state-symbol" aria-hidden="true">
                {scenario === "normal" ? "✓" : scenario === "loading" ? "↻" : "!"}
              </span>
              <div>
                <strong>{activeScenario.state}</strong>
                <p>{activeScenario.message}</p>
              </div>
            </div>
            <span className="state-time">{sourceState}</span>
          </section>

          {scenario === "loading" ? (
            <div className="loading-state" role="status">
              <span className="loading-pulse" aria-hidden="true" />
              Checking score provider. Last-known values are still shown below.
            </div>
          ) : null}

          {scenario === "conflict" ? (
            <section className="conflict-card" aria-labelledby="conflict-title">
              <div>
                <p className="kicker">Provider disagreement</p>
                <h2 id="conflict-title">Texas game score is in conflict</h2>
              </div>
              <div className="conflict-values">
                <p><strong>Scorebook A</strong><span>OKST 14 · TEX 17</span><em>Source of record</em></p>
                <p><strong>Scorebook B</strong><span>OKST 14 · TEX 16</span><em>Conflict retained</em></p>
              </div>
              <p className="correction-note">No value was averaged or silently overwritten. A source correction would be labeled “Corrected.”</p>
            </section>
          ) : null}

          {scenario === "mapping" ? (
            <section className="mapping-alert" aria-labelledby="mapping-title">
              <div className="mapping-code">NDU-IRE</div>
              <div>
                <p className="kicker">Stable identity protection</p>
                <h2 id="mapping-title">Unknown provider mapping isolated</h2>
                <p>The row was not assigned to Notre Dame or another similar program. Configured ID <code>notre-dame</code> remains unchanged and needs a deliberate mapping review.</p>
              </div>
            </section>
          ) : null}

          {surface === "overview" ? (
            <Overview
              season={season}
              week={week}
              scenario={scenario}
              sourceState={sourceState}
              openTeam={openTeam}
              setSurface={navigate}
              metric={metric}
              setMetric={setMetric}
              seasonGames={seasonGames}
            />
          ) : null}

          {surface === "schedule" ? (
            <Schedule
              games={visibleGames}
              scenario={scenario}
              season={season}
              week={week}
              scheduleTeam={scheduleTeam}
              setScheduleTeam={setScheduleTeam}
              scheduleStatus={scheduleStatus}
              setScheduleStatus={setScheduleStatus}
            />
          ) : null}

          {surface === "rankings" ? (
            <Rankings
              season={season}
              source={rankingSource}
              setSource={setRankingSource}
              unavailable={scenario === "unavailable"}
            />
          ) : null}

          {surface === "compare" ? (
            <Compare
              season={season}
              metric={metric}
              setMetric={setMetric}
              unavailable={scenario === "partial"}
            />
          ) : null}

          {surface === "team" ? (
            <TeamDetail
              team={selectedTeam}
              season={season}
              source={rankingSource}
              metric={metric}
              onBack={closeTeam}
            />
          ) : null}

          <footer className="page-footer">
            <p><strong>Fixture data policy:</strong> Every score, ranking, schedule, and statistic on this demo is deterministic illustrative data, not a live or official record.</p>
            <p>Display timezone: America/Chicago (CT) · Times preserve their underlying fixture instants.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

function Overview({
  season,
  week,
  scenario,
  sourceState,
  openTeam,
  setSurface,
  metric,
  setMetric,
  seasonGames,
}: {
  season: Season;
  week: string;
  scenario: Scenario;
  sourceState: string;
  openTeam: (id: TeamId) => void;
  setSurface: (surface: Exclude<Surface, "team">) => void;
  metric: MetricKey;
  setMetric: (metric: MetricKey) => void;
  seasonGames: Game[];
}) {
  if (scenario === "config") {
    return (
      <section className="empty-state major-empty" aria-labelledby="config-empty-title">
        <div className="empty-icon" aria-hidden="true">0</div>
        <p className="kicker">Configuration error</p>
        <h1 id="config-empty-title">Your watchlist is empty</h1>
        <p>This is different from a quiet football week. Configure 2–8 stable team IDs and choose one favorite before loading provider data.</p>
        <code>teams: []</code>
      </section>
    );
  }

  const overviewGames =
    scenario === "empty"
      ? []
      : seasonGames
          .filter((game) => ["In progress", "Halftime", "Final"].includes(game.status))
          .slice(0, 3);

  return (
    <>
      <section className="hero-row">
        <div>
          <p className="kicker">{season} season · {week}</p>
          <h1>Your Saturday, at a glance.</h1>
          <p className="hero-copy">Four programs. One honest view of what’s happening, what happened, and what’s next.</p>
        </div>
        <div className="freshness-card">
          <span className="freshness-icon" aria-hidden="true">◷</span>
          <div>
            <span>Data freshness</span>
            <strong>{sourceState}</strong>
            <small>Scores 30 sec · schedules 6 hr · rankings 24 hr · stats 12 hr thresholds</small>
          </div>
        </div>
      </section>

      <section aria-labelledby="watchlist-title">
        <div className="section-heading">
          <div>
            <p className="kicker">Configured watchlist</p>
            <h2 id="watchlist-title">Team snapshots</h2>
          </div>
          <span className="section-meta">Favorite first · 4 of 8 teams</span>
        </div>
        <div className="team-grid">
          {teams.map((team, index) => {
            const rank = team.currentRank[season].AP;
            return (
              <article
                key={team.id}
                className={`team-card ${index === 0 ? "favorite-card" : ""}`}
                style={{ borderTopColor: team.accent }}
              >
                <div className="team-card-head">
                  <span className="team-mark" style={{ backgroundColor: team.accent }}>{team.initials}</span>
                  <div>
                    <p className="team-label">
                      {index === 0 ? <span className="favorite-label">Favorite</span> : "Watched team"}
                    </p>
                    <h3>{team.name}</h3>
                  </div>
                  <button type="button" className="arrow-button" onClick={() => openTeam(team.id)} aria-label={`Open ${team.name} season detail`}>→</button>
                </div>
                <div className="team-record-row">
                  <div><span>Overall</span><strong>{team.record[season]}</strong></div>
                  <div><span>Conference</span><strong>{team.conferenceRecord[season]}</strong></div>
                  <div><span>AP rank</span><strong>{displayRanking(rank)}</strong></div>
                </div>
                <div className="team-form">
                  <p><span>Form</span><strong>{team.streak[season]}</strong> · {team.lastResult[season]}</p>
                  <p><span>Next</span>{team.nextGame[season]}</p>
                </div>
                <SourceLine>Record: Fixture Scorebook A · Ranking: AP fixture poll, Oct 12</SourceLine>
              </article>
            );
          })}
        </div>
      </section>

      <section className="split-section">
        <div>
          <div className="section-heading">
            <div>
              <p className="kicker">Live or recently final</p>
              <h2>Game desk</h2>
            </div>
            <button type="button" className="text-button" onClick={() => setSurface("schedule")}>Full schedule →</button>
          </div>
          {overviewGames.length ? (
            <div className="game-stack">
              {overviewGames.map((game) => <GameCard key={game.id} game={game} compact />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">—</div>
              <h3>No watched-team games this week</h3>
              <p>Your four-team watchlist is valid. Try another week; team records and rankings remain available.</p>
            </div>
          )}
        </div>

        <div>
          <div className="section-heading">
            <div>
              <p className="kicker">Same-unit comparison</p>
              <h2>Quick compare</h2>
            </div>
            <button type="button" className="text-button" onClick={() => setSurface("compare")}>All metrics →</button>
          </div>
          <label className="field-label">
            <span>Focused metric</span>
            <select value={metric} onChange={(event) => setMetric(event.target.value as MetricKey)}>
              {Object.entries(metricDefinitions).map(([key, definition]) => (
                <option key={key} value={key}>{definition.label}</option>
              ))}
            </select>
          </label>
          <MetricBars season={season} metric={metric} />
        </div>
      </section>
    </>
  );
}

function Schedule({
  games,
  scenario,
  season,
  week,
  scheduleTeam,
  setScheduleTeam,
  scheduleStatus,
  setScheduleStatus,
}: {
  games: Game[];
  scenario: Scenario;
  season: Season;
  week: string;
  scheduleTeam: "all" | TeamId;
  setScheduleTeam: (team: "all" | TeamId) => void;
  scheduleStatus: "all" | GameStatus;
  setScheduleStatus: (status: "all" | GameStatus) => void;
}) {
  return (
    <section aria-labelledby="schedule-title">
      <div className="page-heading">
        <p className="kicker">{season} season · {week}</p>
        <h1 id="schedule-title">Schedule & results</h1>
        <p>Every game state is explicit. Scores appear only when the fixture state makes them meaningful.</p>
      </div>

      <div className="filter-panel" aria-label="Schedule filters">
        <label>
          <span>Watched team</span>
          <select value={scheduleTeam} onChange={(event) => setScheduleTeam(event.target.value as "all" | TeamId)}>
            <option value="all">All watched teams</option>
            {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
          </select>
        </label>
        <label>
          <span>Game status</span>
          <select value={scheduleStatus} onChange={(event) => setScheduleStatus(event.target.value as "all" | GameStatus)}>
            <option value="all">All statuses</option>
            {(["Scheduled", "Delayed", "In progress", "Halftime", "Final", "Postponed", "Canceled"] as GameStatus[]).map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
        <div className="filter-summary">
          <span>Current filters</span>
          <strong>{scheduleTeam === "all" ? "All teams" : teams.find((team) => team.id === scheduleTeam)?.short} · {scheduleStatus === "all" ? "All statuses" : scheduleStatus}</strong>
        </div>
      </div>

      {games.length ? (
        <div className="schedule-grid">
          {games.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      ) : (
        <div className="empty-state major-empty">
          <div className="empty-icon" aria-hidden="true">—</div>
          <h2>{scenario === "empty" ? "No watched-team games this week" : "No games match these filters"}</h2>
          <p>{scenario === "empty" ? "Your configured watchlist is intact; this stage simply has no matching games." : "Change the team, week, or status filter. No missing score was converted to zero."}</p>
        </div>
      )}

      <aside className="trust-explainer">
        <div>
          <p className="kicker">Final-state protection</p>
          <h2>Final means protected</h2>
          <p>A normal refresh cannot replace a final result with an earlier live state. Only an explicit source correction can change it, and the correction remains labeled.</p>
        </div>
        <div className="protection-flow" aria-label="Final-state refresh rule">
          <span>Final · ORE 31</span><b>→</b><span>Failed refresh</span><b>→</b><span>Final · ORE 31 retained</span>
        </div>
      </aside>
    </section>
  );
}

function Rankings({
  season,
  source,
  setSource,
  unavailable,
}: {
  season: Season;
  source: RankingSource;
  setSource: (source: RankingSource) => void;
  unavailable: boolean;
}) {
  return (
    <section aria-labelledby="rankings-title">
      <div className="page-heading page-heading-with-control">
        <div>
          <p className="kicker">{season} season trends</p>
          <h1 id="rankings-title">Rankings, without guessed gaps.</h1>
          <p>Unranked and unavailable are separate observations. Gaps remain gaps in the visual trend and table.</p>
        </div>
        <label className="field-label">
          <span>Ranking source</span>
          <select value={source} onChange={(event) => setSource(event.target.value as RankingSource)}>
            <option>AP</option>
            <option>Coaches</option>
            <option>CFP</option>
          </select>
        </label>
      </div>

      <div className="poll-context">
        <div><span>Selected source</span><strong>{source} fixture poll</strong></div>
        <div><span>Poll date</span><strong>Oct 12, {season}</strong></div>
        <div><span>Freshness</span><strong>{unavailable ? "Unavailable" : "Current · updated Oct 12, 9:00 AM CT"}</strong></div>
      </div>

      {unavailable ? (
        <div className="unavailable-panel" role="alert">
          <div className="empty-icon" aria-hidden="true">!</div>
          <div>
            <h2>Ranking provider unavailable</h2>
            <p>No team is being labeled unranked because the observations are missing. Score and schedule providers are still available in their own surfaces.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="trend-list" aria-label={`${source} ranking trend visualization`}>
            {teams.map((team) => (
              <div className="trend-row" key={team.id}>
                <div className="trend-team"><span className="team-mini-mark" style={{ backgroundColor: team.accent }}>{team.initials}</span><strong>{team.short}</strong></div>
                <div className="trend-cells">
                  {rankingHistory[season][source][team.id].map((value, index) => (
                    <div key={`${team.id}-${rankingDates[index]}`} className={`trend-cell ${value === null || value === "UR" ? "trend-gap" : ""}`}>
                      <span>{rankingDates[index]}</span>
                      <strong>{displayRanking(value)}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="table-wrap">
            <table>
              <caption>Accessible table: {source} fixture ranking observations for the {season} season</caption>
              <thead>
                <tr><th scope="col">Team</th>{rankingDates.map((date) => <th scope="col" key={date}>{date}</th>)}</tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <th scope="row">{team.name}</th>
                    {rankingHistory[season][source][team.id].map((value, index) => (
                      <td key={`${team.id}-table-${index}`}>{displayRanking(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <SourceLine>Source: {source} deterministic fixture poll · Poll dates shown per observation · Updated Oct 12, {season}, 9:00 AM CT</SourceLine>
    </section>
  );
}

function MetricBars({ season, metric }: { season: Season; metric: MetricKey }) {
  const definition = metricDefinitions[metric];
  const values = teams.map((team) => metrics[season][team.id][metric]);
  const maximum = Math.max(...values);
  const leaders = teams.filter((team) => metrics[season][team.id][metric] === (definition.higherIsBetter ? Math.max(...values) : Math.min(...values)));

  return (
    <div className="metric-panel">
      <div className="metric-definition">
        <div>
          <strong>{definition.label}</strong>
          <p>{definition.definition}</p>
        </div>
        <span>{season} season · {definition.unit}</span>
      </div>
      <div className="bar-list" aria-label={`${definition.label} comparison`}>
        {teams.map((team) => {
          const value = metrics[season][team.id][metric];
          const isLeader = leaders.some((leader) => leader.id === team.id);
          return (
            <div className="bar-row" key={team.id}>
              <div className="bar-label"><span>{team.short}</span><strong>{formatMetric(value, metric)}</strong></div>
              <div className="bar-track" aria-hidden="true">
                <div className="bar-fill" style={{ width: `${Math.max(12, (value / maximum) * 100)}%`, backgroundColor: team.accent }} />
              </div>
              <small>{isLeader ? (leaders.length > 1 ? "Tied leader" : "Leader") : "Compared value"}</small>
            </div>
          );
        })}
      </div>
      <SourceLine>Source: Fixture Stats Lab · Updated Oct 10, {season}, 8:00 AM CT</SourceLine>
    </div>
  );
}

function Compare({
  season,
  metric,
  setMetric,
  unavailable,
}: {
  season: Season;
  metric: MetricKey;
  setMetric: (metric: MetricKey) => void;
  unavailable: boolean;
}) {
  return (
    <section aria-labelledby="compare-title">
      <div className="page-heading page-heading-with-control">
        <div>
          <p className="kicker">{season} season · four configured metrics</p>
          <h1 id="compare-title">Compare one honest scale at a time.</h1>
          <p>Each focus view uses one unit. The complete table keeps every underlying value visible, including exact ties.</p>
        </div>
        <label className="field-label">
          <span>Focused comparison metric</span>
          <select value={metric} onChange={(event) => setMetric(event.target.value as MetricKey)}>
            {Object.entries(metricDefinitions).map(([key, definition]) => (
              <option key={key} value={key}>{definition.label}</option>
            ))}
          </select>
        </label>
      </div>

      {unavailable ? (
        <div className="unavailable-panel" role="alert">
          <div className="empty-icon" aria-hidden="true">!</div>
          <div>
            <h2>Statistics provider unavailable</h2>
            <p>Comparison values are withheld instead of shown as zero. Schedule, score, and ranking data remain available from their providers.</p>
          </div>
        </div>
      ) : (
        <MetricBars season={season} metric={metric} />
      )}

      <div className="metric-glossary">
        {Object.entries(metricDefinitions).map(([key, definition]) => (
          <article key={key}>
            <span>{definition.short}</span>
            <h2>{definition.label}</h2>
            <p>{definition.definition}</p>
            <dl>
              <div><dt>Unit</dt><dd>{definition.unit}</dd></div>
              <div><dt>Scope</dt><dd>{season} season</dd></div>
              <div><dt>Source</dt><dd>Fixture Stats Lab</dd></div>
              <div><dt>Updated</dt><dd>Oct 10 · 8:00 AM CT</dd></div>
            </dl>
          </article>
        ))}
      </div>

      {!unavailable ? (
        <div className="table-wrap compare-table">
          <table>
            <caption>All configured comparison values for the {season} season</caption>
            <thead>
              <tr>
                <th scope="col">Team</th>
                {(Object.keys(metricDefinitions) as MetricKey[]).map((key) => <th scope="col" key={key}>{metricDefinitions[key].short}<span>{metricDefinitions[key].unit}</span></th>)}
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <th scope="row">{team.name}</th>
                  {(Object.keys(metricDefinitions) as MetricKey[]).map((key) => <td key={key}>{formatMetric(metrics[season][team.id][key], key)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

function TeamDetail({
  team,
  season,
  source,
  metric,
  onBack,
}: {
  team: Team;
  season: Season;
  source: RankingSource;
  metric: MetricKey;
  onBack: () => void;
}) {
  const teamGames = games.filter((game) => game.season === season && (game.homeId === team.id || game.awayId === team.id));
  return (
    <section aria-labelledby="team-detail-title">
      <button type="button" className="back-button" onClick={onBack}>← Back to overview</button>
      <div className="team-detail-hero" style={{ borderColor: team.accent }}>
        <span className="team-hero-mark" style={{ backgroundColor: team.accent }}>{team.initials}</span>
        <div>
          <p className="kicker">{season} team detail · Configured ID: {team.id}</p>
          <h1 id="team-detail-title">{team.name}</h1>
          <p>Selected context preserved: {source} ranking · {metricDefinitions[metric].label} · current week and season filters.</p>
        </div>
        <div className="detail-record"><strong>{team.record[season]}</strong><span>{team.conferenceRecord[season]} · {team.streak[season]}</span></div>
      </div>

      <div className="detail-summary-grid">
        <article><span>Most recent result</span><strong>{team.lastResult[season]}</strong><SourceLine>Fixture Scorebook A · season {season}</SourceLine></article>
        <article><span>Next scheduled game</span><strong>{team.nextGame[season]}</strong><SourceLine>Fixture Schedule Desk · CT</SourceLine></article>
        <article><span>{source} ranking</span><strong>{displayRanking(team.currentRank[season][source])}</strong><SourceLine>{source} fixture poll · Oct 12, {season}</SourceLine></article>
      </div>

      <div className="detail-two-column">
        <div>
          <div className="section-heading"><div><p className="kicker">Season schedule</p><h2>Results & next games</h2></div></div>
          <div className="game-stack">
            {teamGames.length ? teamGames.map((game) => <GameCard key={game.id} game={game} compact />) : (
              <div className="empty-state"><h3>No games in this fixture slice</h3><p>Historical results remain attached to their original season.</p></div>
            )}
          </div>
        </div>
        <div>
          <div className="section-heading"><div><p className="kicker">Recent form</p><h2>Four-game trace</h2></div></div>
          <ol className="form-list" aria-label={`${team.name} recent form`}>
            <li><span>W</span><div><strong>{team.lastResult[season]}</strong><small>Most recent · final protected</small></div></li>
            <li><span>W</span><div><strong>W 27–21 · fixture result</strong><small>Prior game · {season} season</small></div></li>
            <li><span>{team.id === "notre-dame" ? "L" : "W"}</span><div><strong>{team.id === "notre-dame" ? "L 20–24" : "W 38–17"} · fixture result</strong><small>{season} season</small></div></li>
            <li><span>W</span><div><strong>W 31–14 · fixture result</strong><small>{season} season</small></div></li>
          </ol>
          <div className="metric-detail-card">
            <span>{metricDefinitions[metric].label}</span>
            <strong>{formatMetric(metrics[season][team.id][metric], metric)}</strong>
            <p>{metricDefinitions[metric].definition}</p>
            <SourceLine>Fixture Stats Lab · {season} season · Updated Oct 10, 8:00 AM CT</SourceLine>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <caption>{team.name} dated ranking history · {source} fixture poll</caption>
          <thead><tr><th scope="col">Poll date</th><th scope="col">Observation</th><th scope="col">Meaning</th></tr></thead>
          <tbody>
            {rankingDates.map((date, index) => {
              const value = rankingHistory[season][source][team.id][index];
              return <tr key={date}><th scope="row">{date}, {season}</th><td>{displayRanking(value)}</td><td>{value === null ? "Observation unavailable; gap preserved" : value === "UR" ? "Explicitly unranked by source" : `Ranked ${value} by ${source}`}</td></tr>;
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
