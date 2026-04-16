import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ── Animation variant ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.07,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconArrowRight = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconShare = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const IconGear = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconBolt = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconSearch = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconChevronLeft = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

// ── Mock data ─────────────────────────────────────────────────────────────────
const CHART_DATA_7D = [
  { date: "Oct 01", clicks: 180 },
  { date: "Oct 02", clicks: 340 },
  { date: "Oct 03", clicks: 290 },
  { date: "Oct 04", clicks: 520 },
  { date: "Oct 05", clicks: 410 },
  { date: "Oct 06", clicks: 680 },
  { date: "Oct 07", clicks: 590 },
];
const CHART_DATA_30D = [
  { date: "Oct 01", clicks: 800 },
  { date: "Oct 08", clicks: 2200 },
  { date: "Oct 15", clicks: 3100 },
  { date: "Oct 22", clicks: 4800 },
  { date: "Oct 30", clicks: 6200 },
];
const CHART_DATA_90D = [
  { date: "Aug", clicks: 1200 },
  { date: "Sep 01", clicks: 2800 },
  { date: "Sep 15", clicks: 4100 },
  { date: "Oct 01", clicks: 5900 },
  { date: "Oct 15", clicks: 8400 },
  { date: "Oct 30", clicks: 12408 },
];

type TimeRange = "7D" | "30D" | "90D";

// ── Custom tooltip ────────────────────────────────────────────────────────────
interface TooltipProps {
  active?: boolean;
  label?: string;
  payload?: { value: number }[];
}

function CustomTooltip({ active, label, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 bg-surface-container-highest border border-border text-[12px]">
      <p className="text-muted font-semibold tracking-wider mb-1">{label}</p>
      <p className="text-white font-bold">
        {payload[0].value.toLocaleString()} clicks
      </p>
    </div>
  );
}

// ── DetailHeader ──────────────────────────────────────────────────────────────
interface DetailHeaderProps {
  slug: string;
}

function DetailHeader({ slug }: DetailHeaderProps) {
  const navigate = useNavigate();
  const displaySlug = `shrt.nr/${slug}`;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
      className="mb-8"
    >
      {/* Back + eyebrow */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => navigate("/dashboard/links")}
          className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-muted transition-colors duration-150 hover:text-white"
        >
          <IconChevronLeft />
          BACK
        </button>
        <span className="text-muted opacity-30">|</span>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
          REAL-TIME LINK INTELLIGENCE
        </p>
      </div>

      {/* Title + buttons */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1
            className="font-bold text-white leading-[1.05] tracking-[-0.02em] mb-2"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
          >
            {displaySlug}
          </h1>
          <div className="flex items-center gap-2 text-muted">
            <IconArrowRight />
            <span className="text-[12.5px] font-mono">
              https://editorial.engineering/campaigns/q4-launch-promo-final-v2
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 mt-1">
          <button className="flex items-center gap-2 px-4 py-[9px] rounded-xl text-[12.5px] font-semibold text-white bg-surface-container transition-colors duration-150 hover:bg-surface-container-high">
            <IconShare />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-[9px] rounded-xl text-[12.5px] font-semibold text-white bg-surface-container transition-colors duration-150 hover:bg-surface-container-high">
            <IconGear />
            Configure
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── StatCards ─────────────────────────────────────────────────────────────────
interface StatCardItem {
  label: string;
  value: string;
  unit?: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
}

const STAT_CARDS: StatCardItem[] = [
  {
    label: "TOTAL CLICKS",
    value: "12,408",
    badge: "+12.4%",
    badgeColor: "text-green-400",
    accentColor: "#BD9DFF",
  },
  {
    label: "UNIQUE VISITORS",
    value: "8,912",
    badge: "+5.2%",
    badgeColor: "text-green-400",
    accentColor: "#BD9DFF",
  },
  {
    label: "AVG REDIRECT TIME",
    value: "142",
    unit: "ms",
    badge: "-18ms",
    badgeColor: "text-green-400",
    accentColor: "#BD9DFF",
  },
  {
    label: "BOUNCE RATE",
    value: "4.2",
    unit: "%",
    badge: "+2.1%",
    badgeColor: "text-red-400",
    accentColor: "#EF4444",
  },
];

function StatCards() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {STAT_CARDS.map((card, i) => (
        <motion.div
          key={card.label}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1 + i * 0.4}
          className="rounded-xl p-5 bg-surface-container overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10.5px] font-semibold tracking-[0.12em] text-muted">
              {card.label}
            </span>
            <span className={`text-[11px] font-bold ${card.badgeColor}`}>
              {card.badge}
            </span>
          </div>

          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-[2rem] font-bold text-white leading-none">
              {card.value}
            </span>
            {card.unit && (
              <span className="text-[1rem] font-bold text-muted">
                {card.unit}
              </span>
            )}
          </div>

          {/* Accent underline bar */}
          <motion.div
            className="h-[3px] rounded-full"
            style={{ background: card.accentColor }}
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{
              duration: 0.6,
              delay: 0.3 + i * 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ── ClicksOverTimeChart ───────────────────────────────────────────────────────
function ClicksOverTimeChart() {
  const [range, setRange] = useState<TimeRange>("7D");
  const ranges: TimeRange[] = ["7D", "30D", "90D"];

  const data =
    range === "7D"
      ? CHART_DATA_7D
      : range === "30D"
        ? CHART_DATA_30D
        : CHART_DATA_90D;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={3}
      className="rounded-xl p-6 bg-surface-container mb-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="text-[1rem] font-bold text-white leading-none mb-1.5">
            Clicks Over Time
          </h2>
          <p className="text-[12px] text-muted">
            Link performance trend across the last 30 days
          </p>
        </div>

        {/* Range tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container-high">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={[
                "px-4 py-[6px] rounded-lg text-[11px] font-bold tracking-wide transition-all duration-150",
                range === r
                  ? "bg-surface-container-highest text-white"
                  : "text-muted hover:text-white",
              ].join(" ")}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[260px] mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BD9DFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#BD9DFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6B6A6A", fontSize: 10, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              tickMargin={12}
            />
            <YAxis
              tick={{ fill: "#6B6A6A", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
              }
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(189,157,255,0.15)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#BD9DFF"
              strokeWidth={2}
              fill="url(#gradClicks)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#BD9DFF",
                stroke: "#1A1919",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// ── TopCountries ──────────────────────────────────────────────────────────────
const COUNTRIES = [
  { flag: "🇺🇸", name: "United States", count: 4201, pct: 45 },
  { flag: "🇬🇧", name: "United Kingdom", count: 2110, pct: 22 },
  { flag: "🇩🇪", name: "Germany", count: 1240, pct: 13 },
  { flag: "🇯🇵", name: "Japan", count: 980, pct: 10 },
];

function TopCountries() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={4}
      className="rounded-xl p-6 bg-surface-container h-full"
    >
      <h2 className="text-[1rem] font-bold text-white mb-5">Top Countries</h2>
      <div className="flex flex-col gap-5">
        {COUNTRIES.map((c, i) => (
          <div key={c.name}>
            <div className="flex items-center justify-between mb-[8px]">
              <div className="flex items-center gap-2.5">
                <span className="text-[18px] leading-none">{c.flag}</span>
                <span className="text-[13px] text-white">{c.name}</span>
              </div>
              <span className="text-[12.5px] font-semibold text-muted">
                {c.count.toLocaleString()} ({c.pct}%)
              </span>
            </div>
            <div className="h-[4px] rounded-full bg-surface-container-high overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${c.pct}%` }}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── TrafficReferrers ──────────────────────────────────────────────────────────
const REFERRERS = [
  {
    icon: <IconTwitter />,
    iconBg: "bg-sky-500/15 text-sky-400",
    name: "Twitter / X",
    sub: "SOCIAL TRAFFIC",
    count: 5102,
    pct: "41.1%",
  },
  {
    icon: <IconBolt />,
    iconBg: "bg-primary/15 text-primary",
    name: "Direct",
    sub: "ORGANIC ENTRY",
    count: 3244,
    pct: "26.1%",
  },
  {
    icon: <IconSearch />,
    iconBg: "bg-green-500/15 text-green-400",
    name: "Google Search",
    sub: "SEARCH ENGINE",
    count: 2118,
    pct: "17.0%",
  },
];

function TrafficReferrers() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={4.5}
      className="rounded-xl p-6 bg-surface-container h-full"
    >
      <h2 className="text-[1rem] font-bold text-white mb-5">
        Traffic Referrers
      </h2>
      <div className="flex flex-col gap-3">
        {REFERRERS.map((r, i) => (
          <motion.div
            key={r.name}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5 + i * 0.3}
            className="flex items-center gap-3 px-4 py-4 rounded-xl bg-surface-container-high"
          >
            <div
              className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0 ${r.iconBg}`}
            >
              {r.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-white leading-none mb-[3px]">
                {r.name}
              </div>
              <div className="text-[10px] font-semibold tracking-[0.1em] text-muted">
                {r.sub}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[15px] font-bold text-white leading-none">
                {r.count.toLocaleString()}
              </div>
              <div className="text-[10px] text-muted mt-[2px]">{r.pct}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── DeviceDistribution ────────────────────────────────────────────────────────
const DEVICES = [
  { name: "MOBILE", pct: 55, color: "#BD9DFF" },
  { name: "DESKTOP", pct: 35, color: "#6D50C4" },
  { name: "TABLET", pct: 10, color: "#3D2E7C" },
];

function DonutCenter({ viewBox }: { viewBox?: { cx: number; cy: number } }) {
  const cx = viewBox?.cx ?? 0;
  const cy = viewBox?.cy ?? 0;
  return (
    <g>
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize={22}
        fontWeight={700}
      >
        100%
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fill="#6B6A6A"
        fontSize={9}
        fontWeight={600}
        letterSpacing={2}
      >
        PARSED
      </text>
    </g>
  );
}

function DeviceDistribution() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={5}
      className="rounded-xl p-6 bg-surface-container h-full"
    >
      <h2 className="text-[1rem] font-bold text-white mb-5">
        Device Distribution
      </h2>

      {/* Donut */}
      <div className="flex justify-center mb-5">
        <div className="w-[160px] h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DEVICES}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                dataKey="pct"
                strokeWidth={0}
                startAngle={90}
                endAngle={-270}
              >
                {DEVICES.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
                <text>
                  <DonutCenter />
                </text>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6">
        {DEVICES.map((d) => (
          <div key={d.name} className="text-center">
            <div
              className="text-[15px] font-bold leading-none mb-1"
              style={{ color: d.color }}
            >
              {d.pct}%
            </div>
            <div className="text-[9px] font-bold tracking-[0.12em] text-muted">
              {d.name}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── StatusFooter ──────────────────────────────────────────────────────────────
function StatusFooter() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={9}
      className="flex items-center justify-between px-8 py-3 mt-8 -mx-8 bg-surface-container border-t border-border"
    >
      <div className="flex items-center gap-3 text-[10px] font-mono font-semibold tracking-[0.1em] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-[6px] h-[6px] rounded-full bg-green-400 animate-pulse shrink-0" />
          API: ONLINE
        </span>
        <span className="opacity-30">/</span>
        <span>NODE: US-EAST-1</span>
      </div>
      <span className="text-[10px] font-mono font-semibold tracking-[0.1em] text-muted">
        EDITORIAL.ANALYTICS V4.2.0-STABLE
      </span>
    </motion.div>
  );
}

// ── LinkDetailPage ────────────────────────────────────────────────────────────
export default function LinkDetailPage() {
  const { slug = "launch-promo" } = useParams<{ slug: string }>();

  return (
    <div className="px-8 py-8 pb-0">
      <DetailHeader slug={slug} />
      <StatCards />
      <ClicksOverTimeChart />

      {/* Bottom three-panel row */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-4">
          <TopCountries />
        </div>
        <div className="col-span-4">
          <TrafficReferrers />
        </div>
        <div className="col-span-4">
          <DeviceDistribution />
        </div>
      </div>

      <StatusFooter />
    </div>
  );
}
