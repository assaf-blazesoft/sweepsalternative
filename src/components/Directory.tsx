/** @jsxImportSource preact */
import { useMemo, useState } from 'preact/hooks';
import {
  PLATFORMS,
  MODEL_META,
  RISK_META,
  availabilityIn,
  type Availability,
  type LegalModel,
  type RiskLevel,
  type Platform,
} from '../data/platforms';
import { bannedStates, restrictedStates } from '../data/states';

const FILTER_STATES = [...bannedStates, ...restrictedStates];
const MODELS = Object.keys(MODEL_META) as LegalModel[];
const RISKS: RiskLevel[] = ['low', 'medium', 'high', 'unknown'];

interface Props {
  /** State codes selected by default, e.g. ['CA','NY'] */
  defaultStates?: string[];
  /** Hide the state filter (used on a state page where state is fixed) */
  lockedState?: string;
}

const AVAIL_LABEL: Record<Availability, string> = {
  yes: '✓', no: '✗', partial: '~', unknown: '?',
};
const AVAIL_CLASS: Record<Availability, string> = {
  yes: 'text-emerald-400 border-emerald-400/40',
  no: 'text-red-400/70 border-red-400/30',
  partial: 'text-amber-400 border-amber-400/40',
  unknown: 'text-ink-muted border-surface-border',
};

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: preact.ComponentChildren }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      class={`rounded-full border px-3 py-1 text-meta transition-colors ${
        active
          ? 'border-accent bg-accent/15 text-ink'
          : 'border-surface-border text-ink-muted hover:border-accent/40 hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

function Toggle<T extends string>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  next.has(value) ? next.delete(value) : next.add(value);
  return next;
}

export default function Directory({ defaultStates = ['CA', 'NY'], lockedState }: Props) {
  const initialStates = lockedState ? new Set([lockedState]) : new Set(defaultStates);
  const [states, setStates] = useState<Set<string>>(initialStates);
  const [models, setModels] = useState<Set<LegalModel>>(new Set());
  const [risks, setRisks] = useState<Set<RiskLevel>>(new Set());

  const filtered = useMemo(() => {
    return PLATFORMS.filter((p) => {
      if (states.size && ![...states].some((c) => availabilityIn(p, c) !== 'no')) return false;
      if (models.size && !models.has(p.model)) return false;
      if (risks.size && !risks.has(p.risk)) return false;
      return true;
    });
  }, [states, models, risks]);

  // Which state columns to show on each card.
  const pillStates = useMemo(() => {
    const base = lockedState ? [lockedState] : ['CA', 'NY'];
    const extra = [...states].filter((c) => !base.includes(c));
    return [...base, ...extra].slice(0, 4);
  }, [states, lockedState]);

  const reset = () => {
    setStates(lockedState ? new Set([lockedState]) : new Set());
    setModels(new Set());
    setRisks(new Set());
  };

  const hasActiveFilters =
    states.size > (lockedState ? 1 : 0) || models.size > 0 || risks.size > 0;

  return (
    <div>
      <div class="mb-6 space-y-4">
        {!lockedState && (
          <FilterRow label="State">
            {FILTER_STATES.map((s) => (
              <Pill key={s.code} active={states.has(s.code)} onClick={() => setStates(Toggle(states, s.code))}>
                {s.code}
              </Pill>
            ))}
          </FilterRow>
        )}
        <FilterRow label="Model">
          {MODELS.map((m) => (
            <Pill key={m} active={models.has(m)} onClick={() => setModels(Toggle(models, m))}>
              {MODEL_META[m].short}
            </Pill>
          ))}
        </FilterRow>
        <FilterRow label="Risk">
          {RISKS.map((r) => (
            <Pill key={r} active={risks.has(r)} onClick={() => setRisks(Toggle(risks, r))}>
              {RISK_META[r].label}
            </Pill>
          ))}
        </FilterRow>
      </div>

      <div class="mb-5 flex items-center justify-between">
        <p class="mono-meta">
          Showing {filtered.length} of {PLATFORMS.length} platforms
        </p>
        {hasActiveFilters && (
          <button type="button" onClick={reset} class="mono-meta text-accent hover:underline">
            Reset filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filtered.map((p) => (
            <Card key={p.slug} platform={p} pillStates={pillStates} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: preact.ComponentChildren }) {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <span class="mr-1 w-12 shrink-0 font-mono text-meta uppercase tracking-wide text-ink-muted">{label}</span>
      {children}
    </div>
  );
}

function Card({ platform: p, pillStates }: { platform: Platform; pillStates: string[] }) {
  const risk = RISK_META[p.risk];
  const rel = p.affiliate ? 'nofollow sponsored noopener' : 'noopener';
  return (
    <article class="card card-hover flex flex-col p-5">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-surface-border bg-white/5 font-head text-sm font-bold text-ink">
            {p.logoUrl ? (
              <img src={p.logoUrl} alt={`${p.name} logo`} width={44} height={44} loading="lazy" decoding="async" class="h-full w-full object-contain" />
            ) : (
              p.initials
            )}
          </span>
          <div>
            <h3 class="font-head text-lg font-semibold text-ink">{p.name}</h3>
            <span class="mono-meta border-l-2 pl-2" style={`border-color:${risk.color}`}>
              {MODEL_META[p.model].label}
            </span>
          </div>
        </div>
        {p.affiliate && (
          <span class="mono-meta rounded border border-surface-border px-1.5 py-0.5 text-[0.6rem] uppercase">affiliate</span>
        )}
      </div>

      <div class="mt-4 flex flex-wrap gap-1.5">
        {pillStates.map((c) => {
          const a = availabilityIn(p, c);
          return (
            <span key={c} class={`rounded border px-2 py-0.5 font-mono text-[0.7rem] ${AVAIL_CLASS[a]}`}>
              {c} {AVAIL_LABEL[a]}
            </span>
          );
        })}
        <span class="ml-auto flex items-center gap-1.5 mono-meta">
          <span class="inline-block h-2 w-2 rounded-full" style={`background:${risk.color}`}></span>
          {risk.label} risk
        </span>
      </div>

      <p class="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{p.blurb}</p>

      <p class="mt-3 mono-meta">Last verified {p.lastVerified}</p>

      <div class="mt-4 flex gap-3">
        <a href={`/review/${p.slug}`} class="btn-ghost flex-1 px-4 py-2 text-sm">Full review</a>
        <a href={p.outboundUrl} target="_blank" rel={rel} class="btn-primary flex-1 px-4 py-2 text-sm">
          Visit {p.name} ↗
        </a>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div class="card flex flex-col items-center gap-4 p-10 text-center">
      <p class="max-w-md text-ink-muted">
        No confirmed platforms match these filters yet. Leave your email and we'll notify you when
        something launches that fits.
      </p>
      <form class="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          required
          placeholder="you@email.com"
          class="flex-1 rounded-lg border border-surface-border bg-white/5 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
        />
        <button type="submit" class="btn-primary px-4 py-2 text-sm">Notify me</button>
      </form>
    </div>
  );
}
