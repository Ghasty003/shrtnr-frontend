import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const CLICKS_DATA = [
  { date: "Sept 01", direct: 18000, referred: 9000 },
  { date: "Sept 08", direct: 38000, referred: 18000 },
  { date: "Sept 15", direct: 62000, referred: 28000 },
  { date: "Sept 22", direct: 55000, referred: 32000 },
  { date: "Sept 30", direct: 30000, referred: 22000 },
];

export default function ClicksOverTimeChart() {
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
      <div className="h-60">
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
