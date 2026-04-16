import { useState } from "react";
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
const IconCursor = ({ className = "" }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4l7.07 17 2.51-7.39L21 11.07z" />
  </svg>
);

const IconUsers = ({ className = "" }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconTarget = ({ className = "" }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconLink = ({ className = "" }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconLightbulb = ({ className = "" }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

// ── Chart data ─────────────────────────────────────────────────────────────────
const CLICKS_DATA = [
  { date: "Sept 01", direct: 18000, referred: 9000 },
  { date: "Sept 08", direct: 38000, referred: 18000 },
  { date: "Sept 15", direct: 62000, referred: 28000 },
  { date: "Sept 22", direct: 55000, referred: 32000 },
  { date: "Sept 30", direct: 30000, referred: 22000 },
];

// ── Custom Tooltip ────────────────────────────────────────────────────────────
interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: TooltipPayloadItem[];
}

function CustomTooltip({ active, label, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 bg-surface-container-highest border border-border text-[12px]">
      <p className="text-muted font-semibold tracking-wider mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: p.color }}
          />
          <span className="text-white font-semibold">
            {p.value.toLocaleString()}
          </span>
          <span className="text-muted capitalize">{p.name}</span>
        </div>
      ))}
    </div>
  );
}

// ── PageHeader ────────────────────────────────────────────────────────────────
type TimeRange = "30d" | "90d" | "ytd";

interface PageHeaderProps {
  range: TimeRange;
  setRange: (r: TimeRange) => void;
}

function PageHeader({ range, setRange }: PageHeaderProps) {
  const tabs: { key: TimeRange; label: string }[] = [
    { key: "30d", label: "Last 30 Days" },
    { key: "90d", label: "90 Days" },
    { key: "ytd", label: "YTD" },
  ];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
      className="flex items-end justify-between mb-8"
    >
      <div>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2">
          GLOBAL INSIGHTS
        </p>
        <h1
          className="font-bold text-white leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
        >
          Performance Overview
        </h1>
      </div>

      {/* Time range tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setRange(t.key)}
            className={[
              "px-4 py-[7px] rounded-lg text-[12px] font-semibold tracking-wide transition-all duration-150",
              range === t.key
                ? "bg-surface-container-highest text-white"
                : "text-muted hover:text-white",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ── StatsRow ──────────────────────────────────────────────────────────────────
interface StatItem {
  icon: React.ReactNode;
  iconBgClass: string;
  label: string;
  value: string;
  badge: React.ReactNode;
}

const STATS: StatItem[] = [
  {
    icon: <IconCursor className="text-primary" />,
    iconBgClass: "bg-primary/12",
    label: "Total Clicks",
    value: "1.28M",
    badge: (
      <span className="text-[11px] font-semibold text-green-500">+14.2%</span>
    ),
  },
  {
    icon: <IconUsers className="text-primary" />,
    iconBgClass: "bg-primary/12",
    label: "Unique Visitors",
    value: "842.1K",
    badge: (
      <span className="text-[11px] font-semibold text-green-500">+8.1%</span>
    ),
  },
  {
    icon: <IconTarget className="text-red-400" />,
    iconBgClass: "bg-red-500/12",
    label: "Avg. CTR",
    value: "4.2%",
    badge: (
      <span className="text-[11px] font-semibold text-red-400">-1.2%</span>
    ),
  },
  {
    icon: <IconLink className="text-primary" />,
    iconBgClass: "bg-primary/12",
    label: "Active Links",
    value: "1,402",
    badge: (
      <span className="text-[10px] font-bold tracking-wider px-2 py-[3px] rounded-full bg-blue-500/15 text-blue-300">
        Active
      </span>
    ),
  },
];

function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1 + i * 0.5}
          className="rounded-xl p-5 bg-surface-container"
        >
          <div className="flex items-start justify-between mb-[14px]">
            <div
              className={`w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 ${s.iconBgClass}`}
            >
              {s.icon}
            </div>
            {s.badge}
          </div>
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-[5px]">
            {s.label}
          </p>
          <p className="text-[1.85rem] font-bold text-white leading-none">
            {s.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ── ClicksOverTimeChart ───────────────────────────────────────────────────────
function ClicksOverTimeChart() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={4}
      className="rounded-xl p-6 bg-surface-container mb-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[1rem] font-bold text-white leading-none mb-1.5">
            Combined Clicks Over Time
          </h2>
          <p className="text-[12px] text-muted">
            Aggregate account traffic across all active channels
          </p>
        </div>
        <div className="flex items-center gap-4">
          {[
            { color: "#BD9DFF", label: "Direct Traffic" },
            { color: "#6D50C4", label: "Referred Traffic" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: l.color }}
              />
              <span className="text-[11px] text-muted">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={CLICKS_DATA}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradDirect" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BD9DFF" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#BD9DFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradReferred" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D50C4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6D50C4" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="0"
              vertical={true}
              horizontal={false}
              stroke="rgba(255,255,255,0.04)"
            />

            <XAxis
              dataKey="date"
              tick={{
                fill: "#6B6A6A",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 1,
              }}
              axisLine={false}
              tickLine={false}
              tickMargin={12}
            />
            <YAxis
              tick={{ fill: "#6B6A6A", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(189,157,255,0.15)", strokeWidth: 1 }}
            />

            <Area
              type="monotone"
              dataKey="referred"
              name="referred"
              stroke="#6D50C4"
              strokeWidth={2}
              fill="url(#gradReferred)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#6D50C4",
                stroke: "#1A1919",
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="direct"
              name="direct"
              stroke="#BD9DFF"
              strokeWidth={2.5}
              fill="url(#gradDirect)"
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

// ── TopPerformingLinks ────────────────────────────────────────────────────────
const TOP_LINKS = [
  {
    rank: 1,
    slug: "shorten.io/q2-report-2024",
    created: "Created 2 days ago",
    clicks: "142.8K",
    delta: "+22.4%",
    positive: true,
  },
  {
    rank: 2,
    slug: "shorten.io/product-launch",
    created: "Created 5 days ago",
    clicks: "98.2K",
    delta: "+12.8%",
    positive: true,
  },
  {
    rank: 3,
    slug: "shorten.io/exclusive-deal",
    created: "Created 1 week ago",
    clicks: "76.4K",
    delta: "-4.1%",
    positive: false,
  },
];

function TopPerformingLinks() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={5}
      className="rounded-xl p-6 bg-surface-container"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[1rem] font-bold text-white">
          Top Performing Links
        </h2>
        <button className="text-[11px] font-semibold text-primary hover:opacity-80 transition-opacity duration-150">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-[2px]">
        {TOP_LINKS.map((link, i) => (
          <motion.div
            key={link.rank}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={6 + i * 0.5}
            className="flex items-center gap-4 px-3 py-[14px] rounded-xl transition-colors duration-150 hover:bg-surface-container-high"
          >
            {/* Rank badge */}
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-surface-container-high text-[11px] font-bold text-muted">
              {link.rank}
            </div>

            {/* URL + meta */}
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-white truncate">
                {link.slug}
              </div>
              <div className="text-[11px] text-muted mt-[2px]">
                {link.created}
              </div>
            </div>

            {/* Stats */}
            <div className="text-right shrink-0">
              <div className="text-[13px] font-bold text-white">
                {link.clicks}
              </div>
              <div
                className={`text-[11px] font-semibold mt-[2px] ${link.positive ? "text-green-500" : "text-red-400"}`}
              >
                {link.delta}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── TrafficSources ────────────────────────────────────────────────────────────
const SOURCES = [
  { label: "DIRECT TRAFFIC", pct: 42, color: "#BD9DFF" },
  { label: "TWITTER / X", pct: 28, color: "#7B5FD4" },
  { label: "LINKEDIN", pct: 18, color: "#5B44A8" },
  { label: "SEARCH ENGINES", pct: 12, color: "#3D2E7C" },
];

function TrafficSources() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={5}
      className="rounded-xl p-6 bg-surface-container flex flex-col gap-5"
    >
      <h2 className="text-[1rem] font-bold text-white">Traffic Sources</h2>

      {/* Source bars */}
      <div className="flex flex-col gap-5">
        {SOURCES.map((s, i) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] font-semibold tracking-[0.1em] text-muted">
                {s.label}
              </span>
              <span className="text-[11px] font-bold text-white">{s.pct}%</span>
            </div>
            <div className="h-[5px] rounded-full bg-surface-container-high overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: s.color }}
                initial={{ width: 0 }}
                animate={{ width: `${s.pct}%` }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Insight callout */}
      <div className="mt-1 rounded-xl p-4 bg-surface-container-high flex items-start gap-3">
        <div className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center shrink-0 bg-primary/15 mt-[1px]">
          <IconLightbulb className="text-primary" />
        </div>
        <p className="text-[12px] leading-relaxed text-muted">
          Social referral traffic is up{" "}
          <span className="text-white font-semibold">12%</span> this month.
          Twitter continues to be your strongest outbound channel.
        </p>
      </div>
    </motion.div>
  );
}

// ── GlobalReach ───────────────────────────────────────────────────────────────
const COUNTRIES = [
  { flag: "🇺🇸", name: "United States", count: "421,040" },
  { flag: "🇬🇧", name: "United Kingdom", count: "182,300" },
  { flag: "🇩🇪", name: "Germany", count: "92,401" },
  { flag: "🇮🇳", name: "India", count: "76,211" },
  { flag: "🇨🇦", name: "Canada", count: "54,800" },
  { flag: "🇯🇵", name: "Japan", count: "32,109" },
];

function GlobalReach() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={8}
      className="rounded-xl p-6 bg-surface-container"
    >
      <h2 className="text-[1rem] font-bold text-white mb-5">Global Reach</h2>

      {/* Country grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-[14px] mb-6">
        {COUNTRIES.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="text-xl leading-none shrink-0">{c.flag}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] text-white truncate">
                  {c.name}
                </span>
                <span className="text-[13px] font-semibold text-white shrink-0">
                  {c.count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative world map */}
      <div
        className="w-full h-[90px] rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1A1919 0%, #0E0E0E 100%)",
        }}
      >
        {/* SVG world map dots — purely decorative */}
        <svg
          viewBox="0 0 500 120"
          className="w-full h-full opacity-20"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 180 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 30) * 17 + 8}
              cy={Math.floor(i / 30) * 22 + 12}
              r="2"
              fill="#BD9DFF"
              opacity={Math.random() > 0.55 ? 0.8 : 0.15}
            />
          ))}
        </svg>
      </div>
    </motion.div>
  );
}

// ── DeviceDistribution ────────────────────────────────────────────────────────
const DEVICES = [
  { name: "Mobile", pct: 60, color: "#BD9DFF" },
  { name: "Desktop", pct: 30, color: "#6D50C4" },
  { name: "Tablet", pct: 10, color: "#3D2E7C" },
];

// Custom centre label rendered via a Recharts label component
function DonutLabel({ viewBox }: { viewBox?: { cx: number; cy: number } }) {
  const cx = viewBox?.cx ?? 0;
  const cy = viewBox?.cy ?? 0;
  return (
    <g>
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize={24}
        fontWeight={700}
      >
        60%
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fill="#6B6A6A"
        fontSize={10}
        fontWeight={600}
        letterSpacing={2}
      >
        MOBILE
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
      custom={8}
      className="rounded-xl p-6 bg-surface-container"
    >
      <h2 className="text-[1rem] font-bold text-white mb-6">
        Device Distribution
      </h2>

      {/* Donut */}
      <div className="flex justify-center mb-6">
        <div className="w-[180px] h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DEVICES}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={85}
                dataKey="pct"
                strokeWidth={0}
                startAngle={90}
                endAngle={-270}
              >
                {DEVICES.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}

                <text>
                  <DonutLabel />
                </text>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-[10px]">
        {DEVICES.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span
                className="w-[10px] h-[10px] rounded-full shrink-0"
                style={{ background: d.color }}
              />
              <span className="text-[13px] text-muted">{d.name}</span>
            </div>
            <span className="text-[13px] font-semibold text-white">
              {d.pct}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── AnalyticsPage ─────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [range, setRange] = useState<"30d" | "90d" | "ytd">("30d");

  return (
    <div className="px-8 py-8 pb-12">
      <PageHeader range={range} setRange={setRange} />
      <StatsRow />
      <ClicksOverTimeChart />

      {/* Mid row: Top Links + Traffic Sources */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-7">
          <TopPerformingLinks />
        </div>
        <div className="col-span-5">
          <TrafficSources />
        </div>
      </div>

      {/* Bottom row: Global Reach + Device Distribution */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <GlobalReach />
        </div>
        <div className="col-span-5">
          <DeviceDistribution />
        </div>
      </div>
    </div>
  );
}
