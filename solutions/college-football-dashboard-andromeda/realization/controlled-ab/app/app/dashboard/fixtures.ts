export type TeamId = "texas" | "ohio-state" | "oregon" | "notre-dame";
export type RankingSource = "ap" | "coaches" | "cfp";
export type MetricId =
  | "win-percentage"
  | "points-per-game"
  | "points-allowed-per-game"
  | "total-offense-yards-per-game";
export type GameStatus =
  | "scheduled"
  | "delayed"
  | "in-progress"
  | "halftime"
  | "final"
  | "postponed"
  | "canceled";

export const teams = [
  {
    id: "texas",
    name: "Texas Longhorns",
    shortName: "Texas",
    accent: "#BF5700",
    record: "5–1",
    conferenceRecord: "2–1 SEC",
    streak: "W2",
    ap: 7,
    coaches: 8,
    cfp: null,
    rankingState: "ranked",
    recent: ["W 34–17", "W 27–24", "L 21–24"],
    next: "vs. Georgia · Oct 17, 7:00 PM CT",
  },
  {
    id: "ohio-state",
    name: "Ohio State Buckeyes",
    shortName: "Ohio State",
    accent: "#BA0C2F",
    record: "6–0",
    conferenceRecord: "3–0 Big Ten",
    streak: "W6",
    ap: 2,
    coaches: 2,
    cfp: null,
    rankingState: "ranked",
    recent: ["W 38–10", "W 31–20", "W 45–7"],
    next: "at Wisconsin · Oct 17, 6:30 PM CT",
  },
  {
    id: "oregon",
    name: "Oregon Ducks",
    shortName: "Oregon",
    accent: "#154733",
    record: "4–2",
    conferenceRecord: "2–1 Big Ten",
    streak: "L1",
    ap: 15,
    coaches: 14,
    cfp: null,
    rankingState: "ranked",
    recent: ["L 24–27", "W 41–13", "W 28–17"],
    next: "vs. Washington · Oct 17, 2:30 PM CT",
  },
  {
    id: "notre-dame",
    name: "Notre Dame Fighting Irish",
    shortName: "Notre Dame",
    accent: "#0C2340",
    record: "4–2",
    conferenceRecord: "Independent",
    streak: "W1",
    ap: null,
    coaches: null,
    cfp: null,
    rankingState: "unranked",
    recent: ["W 30–13", "L 17–20", "W 35–14"],
    next: "vs. USC · Oct 17, 6:00 PM CT",
  },
] as const;

export const games = [
  {
    id: "g-01",
    week: "Week 7",
    watchedTeamIds: ["texas"] as TeamId[],
    away: "Texas",
    home: "Oklahoma",
    dateTime: "Sat, Oct 10 · 2:30 PM CT",
    venue: "Cotton Bowl · Dallas, TX",
    status: "halftime" as GameStatus,
    statusLabel: "Halftime",
    score: "Texas 21 · Oklahoma 17",
    period: "Halftime",
    source: "Demo Sports feed",
    updated: "Oct 10 · 4:12 PM CT",
  },
  {
    id: "g-02",
    week: "Week 7",
    watchedTeamIds: ["ohio-state"] as TeamId[],
    away: "Iowa",
    home: "Ohio State",
    dateTime: "Sat, Oct 10 · 11:00 AM CT",
    venue: "Ohio Stadium · Columbus, OH",
    status: "final" as GameStatus,
    statusLabel: "Final",
    score: "Iowa 10 · Ohio State 38",
    source: "Demo Sports feed",
    updated: "Oct 10 · 2:24 PM CT",
    protection: "Final score locked; ordinary refreshes cannot regress status.",
  },
  {
    id: "g-03",
    week: "Week 7",
    watchedTeamIds: ["oregon"] as TeamId[],
    away: "Oregon",
    home: "Michigan",
    dateTime: "Sat, Oct 10 · 6:30 PM CT",
    venue: "Michigan Stadium · Ann Arbor, MI",
    status: "in-progress" as GameStatus,
    statusLabel: "In progress · Q3 08:41",
    score: "Oregon 24 · Michigan 20",
    period: "Q3 · 08:41",
    source: "Demo Sports feed",
    updated: "Oct 10 · 8:46 PM CT",
  },
  {
    id: "g-04",
    week: "Week 7",
    watchedTeamIds: ["notre-dame"] as TeamId[],
    away: "Notre Dame",
    home: "Navy",
    dateTime: "Sat, Oct 10 · 6:00 PM CT",
    venue: "Unknown location",
    status: "delayed" as GameStatus,
    statusLabel: "Delayed · weather",
    source: "Demo Schedule feed",
    updated: "Oct 10 · 5:48 PM CT",
  },
  {
    id: "g-05",
    week: "Week 8",
    watchedTeamIds: ["texas"] as TeamId[],
    away: "Georgia",
    home: "Texas",
    dateTime: "Sat, Oct 17 · 7:00 PM CT",
    venue: "DKR–Texas Memorial Stadium · Austin, TX",
    status: "scheduled" as GameStatus,
    statusLabel: "Scheduled",
    source: "Demo Schedule feed",
    updated: "Oct 10 · 12:00 PM CT",
  },
  {
    id: "g-06",
    week: "Week 8",
    watchedTeamIds: ["ohio-state"] as TeamId[],
    away: "Ohio State",
    home: "Wisconsin",
    dateTime: "Sat, Oct 17 · 6:30 PM CT",
    venue: "Camp Randall Stadium · Madison, WI",
    status: "postponed" as GameStatus,
    statusLabel: "Postponed · date TBD",
    source: "Demo Schedule feed",
    updated: "Oct 11 · 9:15 AM CT",
  },
  {
    id: "g-07",
    week: "Week 8",
    watchedTeamIds: ["oregon"] as TeamId[],
    away: "Washington",
    home: "Oregon",
    dateTime: "Sat, Oct 17 · 2:30 PM CT",
    venue: "Autzen Stadium · Eugene, OR",
    status: "canceled" as GameStatus,
    statusLabel: "Canceled",
    source: "Demo Schedule feed",
    updated: "Oct 12 · 10:05 AM CT",
  },
] as const;

export const rankingHistory: Record<
  RankingSource,
  Array<Record<string, string | number | null>>
> = {
  ap: [
    { week: "Pre", texas: 4, "ohio-state": 3, oregon: 8, "notre-dame": 10 },
    { week: "W2", texas: 5, "ohio-state": 3, oregon: 7, "notre-dame": 12 },
    { week: "W3", texas: 5, "ohio-state": 2, oregon: null, "notre-dame": 15 },
    { week: "W4", texas: 6, "ohio-state": 2, oregon: 12, "notre-dame": null },
    { week: "W5", texas: 9, "ohio-state": 2, oregon: 11, "notre-dame": null },
    { week: "W6", texas: 7, "ohio-state": 2, oregon: 15, "notre-dame": null },
  ],
  coaches: [
    { week: "Pre", texas: 5, "ohio-state": 2, oregon: 9, "notre-dame": 11 },
    { week: "W2", texas: 6, "ohio-state": 2, oregon: 8, "notre-dame": 13 },
    { week: "W3", texas: 6, "ohio-state": 2, oregon: 9, "notre-dame": 16 },
    { week: "W4", texas: 7, "ohio-state": 2, oregon: 13, "notre-dame": null },
    { week: "W5", texas: 10, "ohio-state": 2, oregon: 12, "notre-dame": null },
    { week: "W6", texas: 8, "ohio-state": 2, oregon: 14, "notre-dame": null },
  ],
  cfp: [
    { week: "W1", texas: null, "ohio-state": null, oregon: null, "notre-dame": null },
    { week: "W2", texas: null, "ohio-state": null, oregon: null, "notre-dame": null },
    { week: "W3", texas: null, "ohio-state": null, oregon: null, "notre-dame": null },
    { week: "W4", texas: null, "ohio-state": null, oregon: null, "notre-dame": null },
    { week: "W5", texas: null, "ohio-state": null, oregon: null, "notre-dame": null },
    { week: "W6", texas: null, "ohio-state": null, oregon: null, "notre-dame": null },
  ],
};

export const metrics = {
  "win-percentage": {
    label: "Win percentage",
    definition: "Wins divided by games completed in the selected season.",
    unit: "%",
    source: "Demo Statistics feed",
    updated: "Oct 10 · 9:00 AM CT",
    values: { texas: 83.3, "ohio-state": 100, oregon: 66.7, "notre-dame": 66.7 },
  },
  "points-per-game": {
    label: "Points per game",
    definition: "Average points scored per completed game.",
    unit: "points/game",
    source: "Demo Statistics feed",
    updated: "Oct 10 · 9:00 AM CT",
    values: { texas: 31.8, "ohio-state": 37.2, oregon: 29.5, "notre-dame": 28.8 },
  },
  "points-allowed-per-game": {
    label: "Points allowed",
    definition: "Average opponent points in completed games; lower is better.",
    unit: "points/game",
    source: "Demo Statistics feed",
    updated: "Oct 10 · 9:00 AM CT",
    values: { texas: 18.5, "ohio-state": 12.8, oregon: 20.3, "notre-dame": 20.3 },
  },
  "total-offense-yards-per-game": {
    label: "Total offense",
    definition: "Average rushing plus passing yards gained per completed game.",
    unit: "yards/game",
    source: "Demo Statistics feed",
    updated: "Oct 10 · 9:00 AM CT",
    values: { texas: 438.2, "ohio-state": 471.5, oregon: 422.1, "notre-dame": 405.7 },
  },
} satisfies Record<
  MetricId,
  {
    label: string;
    definition: string;
    unit: string;
    source: string;
    updated: string;
    values: Record<TeamId, number>;
  }
>;

export const rankingObservationState: Record<
  RankingSource,
  Record<TeamId, "ranked" | "unranked" | "unavailable">
> = {
  ap: {
    texas: "ranked",
    "ohio-state": "ranked",
    oregon: "ranked",
    "notre-dame": "unranked",
  },
  coaches: {
    texas: "ranked",
    "ohio-state": "ranked",
    oregon: "ranked",
    "notre-dame": "unranked",
  },
  cfp: {
    texas: "unavailable",
    "ohio-state": "unavailable",
    oregon: "unavailable",
    "notre-dame": "unavailable",
  },
};

