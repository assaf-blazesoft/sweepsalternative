/** @jsxImportSource preact */
import { useEffect, useRef, useState } from 'preact/hooks';

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  /** Format large numbers compactly, e.g. 60_000_000 -> "60M" */
  compact?: boolean;
}

function format(n: number, compact?: boolean): string {
  if (compact) {
    if (n >= 1_000_000) return `${Math.round(n / 1_000_000)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  }
  return Math.round(n).toLocaleString('en-US');
}

function useCountUp(target: number, run: boolean, duration = 800): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return val;
}

export default function CounterStrip({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} class="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-surface-border bg-surface-border sm:grid-cols-3">
      {stats.map((s) => (
        <Counter key={s.label} stat={s} run={run} />
      ))}
    </div>
  );
}

function Counter({ stat, run }: { stat: Stat; run: boolean }) {
  const v = useCountUp(stat.value, run);
  return (
    <div class="bg-bg px-6 py-8 text-center sm:text-left">
      <div class="font-head text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        {stat.prefix ?? ''}
        {format(v, stat.compact)}
        {stat.suffix ?? ''}
      </div>
      <div class="mt-2 text-meta text-ink-muted">{stat.label}</div>
    </div>
  );
}
