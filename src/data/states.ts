// Single source of truth for the US ban landscape.
// Map, directory, state pages, and counters all read from here.
// All data current as of the LAST_UPDATED date below.

export const LAST_UPDATED = '2026-05-26';

export type BanTier = 'banned' | 'restricted' | 'atrisk' | 'legal';

export interface StateEntry {
  /** USPS two-letter code */
  code: string;
  name: string;
  /** URL slug for /state/[slug] */
  slug: string;
  tier: BanTier;
  /** Statute or mechanism, e.g. "AB 831" */
  law?: string;
  /** Human-readable effective date, e.g. "Jan 1, 2026" */
  effective?: string;
  /** Approximate population, used for "players affected" counter */
  population: number;
  /** Short status label shown on map tooltip / pills */
  label: string;
}

export const TIER_META: Record<BanTier, { label: string; color: string; tooltip: string }> = {
  banned: { label: 'Banned', color: '#EF4444', tooltip: 'Banned by statute' },
  restricted: { label: 'Restricted', color: '#F59E0B', tooltip: 'Banned via enforcement' },
  atrisk: { label: 'At risk', color: '#EAB308', tooltip: 'Pending legislation' },
  legal: { label: 'Legal', color: '#1E2A3A', tooltip: 'No ban in effect' },
};

// Tier 1, banned by statute; Tier 2, enforcement; Tier 3, pending/at risk.
// Only banned/restricted/atrisk states get dedicated pages + map highlight.
export const STATES: StateEntry[] = [
  // Tier 1, explicitly banned by statute
  { code: 'CA', name: 'California', slug: 'california', tier: 'banned', law: 'AB 831', effective: 'Jan 1, 2026', population: 38_965_000, label: 'Banned' },
  { code: 'NY', name: 'New York', slug: 'new-york', tier: 'banned', law: 'SB 5935 / AB 6745', effective: 'Dec 2025', population: 19_571_000, label: 'Banned' },
  { code: 'NJ', name: 'New Jersey', slug: 'new-jersey', tier: 'banned', law: 'A5447', effective: 'Aug 2025', population: 9_290_000, label: 'Banned' },
  { code: 'CT', name: 'Connecticut', slug: 'connecticut', tier: 'banned', law: 'SB 1235', effective: 'Jun 2025', population: 3_617_000, label: 'Banned' },
  { code: 'MT', name: 'Montana', slug: 'montana', tier: 'banned', law: 'SB 555', effective: 'Oct 2025', population: 1_122_000, label: 'Banned' },
  { code: 'IN', name: 'Indiana', slug: 'indiana', tier: 'banned', law: 'HB 1052', effective: 'Jul 1, 2026', population: 6_862_000, label: 'Banned' },
  { code: 'ME', name: 'Maine', slug: 'maine', tier: 'banned', law: 'LD 2007', effective: 'Jul 14, 2026', population: 1_395_000, label: 'Banned' },
  { code: 'TN', name: 'Tennessee', slug: 'tennessee', tier: 'banned', law: 'SB 2136', effective: 'May 2026', population: 7_126_000, label: 'Banned' },
  { code: 'LA', name: 'Louisiana', slug: 'louisiana', tier: 'banned', law: 'HB 883', effective: 'May 2026', population: 4_574_000, label: 'Banned' },

  // Tier 2, banned via enforcement of pre-existing law
  { code: 'WA', name: 'Washington', slug: 'washington', tier: 'restricted', law: 'RCW 9.46.240', effective: 'In effect', population: 7_812_000, label: 'Restricted' },
  { code: 'MI', name: 'Michigan', slug: 'michigan', tier: 'restricted', law: 'MGCB enforcement', effective: 'In effect', population: 10_037_000, label: 'Restricted' },
  { code: 'ID', name: 'Idaho', slug: 'idaho', tier: 'restricted', law: 'Constitutional ban', effective: 'In effect', population: 1_964_000, label: 'Restricted' },
  { code: 'NV', name: 'Nevada', slug: 'nevada', tier: 'restricted', law: 'SB256 enforcement', effective: 'In effect', population: 3_194_000, label: 'Restricted' },

  // Tier 3, pending / high risk (watch list)
  { code: 'DC', name: 'Washington DC', slug: 'washington-dc', tier: 'atrisk', law: 'Council Bill 26-0656', effective: 'Hearing May 2026', population: 678_000, label: 'At risk' },
  { code: 'MN', name: 'Minnesota', slug: 'minnesota', tier: 'atrisk', law: 'SF 4474', effective: 'In committee', population: 5_737_000, label: 'At risk' },
  { code: 'IL', name: 'Illinois', slug: 'illinois', tier: 'atrisk', law: 'AG C&D letters', effective: 'Operators exiting', population: 12_549_000, label: 'At risk' },
  { code: 'IA', name: 'Iowa', slug: 'iowa', tier: 'atrisk', law: 'Enforcement bill', effective: 'Passed', population: 3_207_000, label: 'At risk' },
];

export const STATE_BY_CODE: Record<string, StateEntry> = Object.fromEntries(
  STATES.map((s) => [s.code, s]),
);
export const STATE_BY_SLUG: Record<string, StateEntry> = Object.fromEntries(
  STATES.map((s) => [s.slug, s]),
);

export const bannedStates = STATES.filter((s) => s.tier === 'banned');
export const restrictedStates = STATES.filter((s) => s.tier === 'restricted');
export const atRiskStates = STATES.filter((s) => s.tier === 'atrisk');

// Counter strip values (PRD §9). "Banned" = statute + enforcement bans.
export const STAT_BANNED_COUNT = bannedStates.length + restrictedStates.length; // 13
// Estimated affected *players* in banned states (not total population, which is ~116M).
// PRD §9 specifies displaying ~60M. Adjust as the player-base estimate is refined.
export const STAT_PLAYERS_AFFECTED = 60_000_000;
