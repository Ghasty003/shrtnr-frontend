import { motion } from "motion/react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TimeRange = "7D" | "30D" | "90D";

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

export default function ClicksOverTimeChart() {
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
                "px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all duration-150",
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
      <div className="h-65 mt-6">
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
