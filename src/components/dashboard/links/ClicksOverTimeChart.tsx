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
import { useLinkClicks } from "@/hooks/useLinkClicks";

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

function CustomTooltip({
  active,
  label,
  payload,
}: {
  active?: boolean;
  label?: string;
  payload?: { value: number }[];
}) {
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

function ChartSkeleton() {
  return (
    <div className="h-65 mt-6 rounded-xl bg-white/3 animate-pulse flex items-end gap-2 px-4 pb-4">
      {[40, 60, 45, 75, 55, 85, 70].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-white/[0.07]"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

interface ClicksOverTimeChartProps {
  slug: string;
}

export default function ClicksOverTimeChart({
  slug,
}: ClicksOverTimeChartProps) {
  const [range, setRange] = useState<TimeRange>("7D");
  const { data, isLoading } = useLinkClicks(slug, range);
  const ranges: TimeRange[] = ["7D", "30D", "90D"];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={3}
      className="rounded-xl p-6 bg-surface-container mb-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-1">
        <div>
          <h2 className="text-[1rem] font-bold text-white leading-none mb-1.5">
            Clicks Over Time
          </h2>
          <p className="text-[12px] text-muted">
            Link performance across the selected range
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container-high self-start">
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

      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <div className="h-65 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data ?? []}
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
      )}
    </motion.div>
  );
}
