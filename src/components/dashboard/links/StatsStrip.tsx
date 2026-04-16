import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.065,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

export default function StatsStrip() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={1}
      className="grid grid-cols-4 gap-4 mb-6"
    >
      {/* Total Assets */}
      <div className="rounded-xl p-5 bg-surface-container">
        <p className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted mb-3">
          TOTAL ASSETS
        </p>
        <p className="text-[2rem] font-bold text-white leading-none">1,248</p>
      </div>

      {/* Clicks 24H */}
      <div className="rounded-xl p-5 bg-surface-container">
        <p className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted mb-3">
          CLICKS (24H)
        </p>
        <p
          className="text-[2rem] font-bold leading-none"
          style={{ color: "#BD9DFF" }}
        >
          +42.5k
        </p>
      </div>

      {/* Avg CTR */}
      <div className="rounded-xl p-5 bg-surface-container">
        <p className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted mb-3">
          AVG CTR
        </p>
        <p className="text-[2rem] font-bold text-white leading-none">18.2%</p>
      </div>

      {/* System Status */}
      <div className="rounded-xl p-5 bg-surface-container">
        <p className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted mb-3">
          SYSTEM STATUS
        </p>
        <p className="flex items-center gap-2 text-[1rem] font-bold text-green-400 leading-none mt-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 shrink-0 animate-pulse" />
          OPERATIONAL
        </p>
      </div>
    </motion.div>
  );
}
