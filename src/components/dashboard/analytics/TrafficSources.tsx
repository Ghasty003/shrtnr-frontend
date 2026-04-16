import { IconLightbulb } from "@/utils/icons";
import { motion } from "motion/react";

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

const SOURCES = [
  { label: "DIRECT TRAFFIC", pct: 42, color: "#BD9DFF" },
  { label: "TWITTER / X", pct: 28, color: "#7B5FD4" },
  { label: "LINKEDIN", pct: 18, color: "#5B44A8" },
  { label: "SEARCH ENGINES", pct: 12, color: "#3D2E7C" },
];

export default function TrafficSources() {
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
              <span className="text-[10.5px] font-semibold tracking-widest text-muted">
                {s.label}
              </span>
              <span className="text-[11px] font-bold text-white">{s.pct}%</span>
            </div>
            <div className="h-1.25 rounded-full bg-surface-container-high overflow-hidden">
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
        <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center shrink-0 bg-primary/15 mt-1px">
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
