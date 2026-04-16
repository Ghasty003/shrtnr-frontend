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

const COUNTRIES = [
  { flag: "🇺🇸", name: "United States", count: 4201, pct: 45 },
  { flag: "🇬🇧", name: "United Kingdom", count: 2110, pct: 22 },
  { flag: "🇩🇪", name: "Germany", count: 1240, pct: 13 },
  { flag: "🇯🇵", name: "Japan", count: 980, pct: 10 },
];

export default function TopCountries() {
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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <span className="text-[18px] leading-none">{c.flag}</span>
                <span className="text-[13px] text-white">{c.name}</span>
              </div>
              <span className="text-[12.5px] font-semibold text-muted">
                {c.count.toLocaleString()} ({c.pct}%)
              </span>
            </div>
            <div className="h-1 rounded-full bg-surface-container-high overflow-hidden">
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
