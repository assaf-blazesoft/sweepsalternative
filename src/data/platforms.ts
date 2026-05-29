// Single source of truth for alternative platforms.
// Directory cards, review pages, and state pages all read from here.

export type Availability = 'yes' | 'no' | 'partial' | 'unknown';
export type RiskLevel = 'low' | 'medium' | 'high' | 'unknown';
export type LegalModel =
  | 'single-currency'
  | 'parimutuel'
  | 'p2p-dfs'
  | 'prediction-markets'
  | 'poker-education';

export const MODEL_META: Record<LegalModel, { label: string; short: string }> = {
  'single-currency': { label: 'Single currency', short: 'Single currency' },
  parimutuel: { label: 'Parimutuel / ADW', short: 'Parimutuel' },
  'p2p-dfs': { label: 'P2P Daily Fantasy Sports', short: 'P2P DFS' },
  'prediction-markets': { label: 'Prediction markets (CFTC)', short: 'Prediction markets' },
  'poker-education': { label: 'Poker / education bundle', short: 'Poker-education' },
};

export const RISK_META: Record<RiskLevel, { label: string; color: string }> = {
  low: { label: 'Low', color: '#22C55E' },
  medium: { label: 'Medium', color: '#F59E0B' },
  high: { label: 'High', color: '#EF4444' },
  unknown: { label: 'Unknown', color: '#8A93A6' },
};

export interface Platform {
  slug: string;
  name: string;
  /** Initials shown when no logo asset is available */
  initials: string;
  /** Optional logo path (under /public). When present, replaces the initials badge. */
  logoUrl?: string;
  model: LegalModel;
  risk: RiskLevel;
  /** Availability keyed by USPS state code; default 'unknown' if absent */
  availability: Record<string, Availability>;
  /** One- to two-line directory description */
  blurb: string;
  /** Short checkmark bullets shown on the homepage row card. 2-4 items. */
  highlights?: string[];
  /** Short chip-style tags rendered under the platform name. */
  perks?: PerkChip[];
  /** Promotional offer rendered in the middle of the row card. */
  offer?: { headline: string; details?: string; terms?: string };
  /** Ribbon label rendered above the row card. Used sparingly. */
  featuredLabel?: string;
  /** Outbound link. affiliate=true => rel="nofollow sponsored" */
  outboundUrl: string;
  affiliate: boolean;
  lastVerified: string;
  /** True when legal model is not yet confirmed (extra hedging on the page) */
  unconfirmed?: boolean;
}

export type PerkIcon = 'bolt' | 'shield' | 'pin' | 'spark' | 'clock';
export interface PerkChip {
  icon: PerkIcon;
  label: string;
  /** Optional tone override; otherwise neutral. */
  tone?: 'good' | 'warn' | 'note' | 'neutral';
}

export const PLATFORMS: Platform[] = [
  {
    slug: 'albumza',
    name: 'Albumza',
    initials: 'AZ',
    logoUrl: '/logos/albumza.png',
    model: 'single-currency',
    risk: 'low',
    availability: { CA: 'yes', NY: 'yes' },
    blurb: 'Purpose-built for the post-ban landscape. Fast redemptions, full CA + NY access.',
    perks: [
      { icon: 'bolt', label: 'Fast redeems', tone: 'good' },
      { icon: 'shield', label: 'Low risk', tone: 'good' },
      { icon: 'pin', label: 'CA · NY · most states', tone: 'note' },
    ],
    offer: {
      headline: '200,000 Coins + 50 Sweeps',
      details: 'Welcome pack on first verified deposit',
      terms: '21+. T&Cs apply.',
    },
    featuredLabel: 'Our pick',
    outboundUrl: 'https://albumza.com/?utm_source=sweepsalternative&utm_medium=affiliate&utm_campaign=directory',
    affiliate: true,
    lastVerified: '2026-05-29',
  },
  {
    slug: 'horseplay',
    name: 'Horseplay',
    initials: 'HP',
    logoUrl: '/logos/horseplay.png',
    model: 'parimutuel',
    risk: 'low',
    availability: { CA: 'yes', NY: 'partial' },
    blurb: 'Reveal-style parimutuel gaming. Decades of settled US wagering law behind the model.',
    perks: [
      { icon: 'shield', label: 'Low risk', tone: 'good' },
      { icon: 'spark', label: 'Game-like reveal play', tone: 'note' },
      { icon: 'pin', label: 'CA · NY (partial)', tone: 'note' },
    ],
    offer: {
      headline: '$50 first-wager bonus',
      details: 'Risk-free on your opening wager',
      terms: '21+. T&Cs apply.',
    },
    outboundUrl: 'https://horseplay.com/?utm_source=sweepsalternative&utm_medium=affiliate&utm_campaign=directory',
    affiliate: true,
    lastVerified: '2026-05-26',
  },
  {
    slug: 'cardcrush',
    name: 'CardCrush',
    initials: 'CC',
    logoUrl: '/logos/cardcrush.png',
    model: 'single-currency',
    risk: 'medium',
    availability: { CA: 'yes', NY: 'yes' },
    blurb: 'Single-currency play with an RPG progression layer on top. Plays in CA and NY.',
    perks: [
      { icon: 'shield', label: 'Medium risk', tone: 'warn' },
      { icon: 'spark', label: 'RPG progression', tone: 'note' },
      { icon: 'pin', label: 'CA · NY', tone: 'note' },
    ],
    offer: {
      headline: '500,000 Coins + 50 Sweeps',
      details: 'Welcome pack on first deposit',
      terms: '21+. T&Cs apply.',
    },
    outboundUrl: 'https://cardcrush.com/?utm_source=sweepsalternative&utm_medium=affiliate&utm_campaign=directory',
    affiliate: true,
    lastVerified: '2026-05-26',
  },
  {
    slug: 'clash5',
    name: 'Clash5',
    initials: 'C5',
    logoUrl: '/logos/clash5.png',
    model: 'single-currency',
    risk: 'unknown',
    availability: { CA: 'unknown', NY: 'unknown' },
    blurb: 'Single-currency framing aimed at banned-state players. We are tracking it, not yet recommending it.',
    perks: [
      { icon: 'shield', label: 'Risk unverified', tone: 'warn' },
      { icon: 'clock', label: 'On our watch list', tone: 'warn' },
    ],
    outboundUrl: 'https://clash5.com/?utm_source=sweepsalternative&utm_medium=referral&utm_campaign=directory',
    affiliate: false,
    lastVerified: '2026-05-26',
    unconfirmed: true,
  },
];

export const PLATFORM_BY_SLUG: Record<string, Platform> = Object.fromEntries(
  PLATFORMS.map((p) => [p.slug, p]),
);

export function availabilityIn(platform: Platform, stateCode: string): Availability {
  return platform.availability[stateCode] ?? 'unknown';
}

// Platforms with any presence (yes/partial/unknown, i.e. not an explicit 'no') in a state.
export function platformsForState(stateCode: string): Platform[] {
  return PLATFORMS.filter((p) => availabilityIn(p, stateCode) !== 'no');
}

export const PLATFORM_COUNT = PLATFORMS.length;
