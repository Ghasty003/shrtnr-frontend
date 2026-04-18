import { motion } from "motion/react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useLinkDevices } from "@/hooks/useLinkDevices";

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

const DEVICE_COLOURS: Record<string, string> = {
  Mobile: "#BD9DFF",
  Desktop: "#6D50C4",
  Tablet: "#3D2E7C",
};

function getColor(device: string, index: number) {
  return DEVICE_COLOURS[device] ?? ["#BD9DFF", "#6D50C4", "#3D2E7C"][index % 3];
}

function DonutLabel({
  viewBox,
  primary,
  sub,
}: {
  viewBox?: { cx: number; cy: number };
  primary: string;
  sub: string;
}) {
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
        {primary}
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
        {sub.toUpperCase()}
      </text>
    </g>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-center mb-6">
        <div className="w-45 h-45 rounded-full bg-white/[0.07]" />
      </div>
      <div className="flex flex-col gap-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.07]" />
              <div className="h-3 w-16 rounded bg-white/[0.07]" />
            </div>
            <div className="h-3 w-8 rounded bg-white/[0.07]" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface DeviceDistributionProps {
  slug: string;
}

export default function DeviceDistribution({ slug }: DeviceDistributionProps) {
  const { data, isLoading } = useLinkDevices(slug);

  const top = data?.[0];
  const chartData =
    data?.map((d, i) => ({ ...d, color: getColor(d.device, i) })) ?? [];

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

      {isLoading && <Skeleton />}

      {!isLoading && (
        <>
          <div className="flex justify-center mb-6">
            <div className="w-45 h-45">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={85}
                    dataKey="pct"
                    strokeWidth={0}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {chartData.map((d) => (
                      <Cell key={d.device} fill={d.color} />
                    ))}
                    {top && (
                      <text>
                        <DonutLabel primary={`${top.pct}%`} sub={top.device} />
                      </text>
                    )}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {chartData.map((d) => (
              <div key={d.device} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: d.color }}
                  />
                  <span className="text-[13px] text-muted">{d.device}</span>
                </div>
                <span className="text-[13px] font-semibold text-white">
                  {d.pct}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
