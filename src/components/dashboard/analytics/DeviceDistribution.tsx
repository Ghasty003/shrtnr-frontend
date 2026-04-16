import { motion } from "motion/react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

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

export default function DeviceDistribution() {
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
        <div className="w-45 h-45">
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
      <div className="flex flex-col gap-2.5">
        {DEVICES.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
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
