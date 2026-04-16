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
  { flag: "🇺🇸", name: "United States", count: "421,040" },
  { flag: "🇬🇧", name: "United Kingdom", count: "182,300" },
  { flag: "🇩🇪", name: "Germany", count: "92,401" },
  { flag: "🇮🇳", name: "India", count: "76,211" },
  { flag: "🇨🇦", name: "Canada", count: "54,800" },
  { flag: "🇯🇵", name: "Japan", count: "32,109" },
];

export default function GlobalReach() {
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
      <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 mb-6">
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
        className="w-full h-22.5 rounded-xl overflow-hidden"
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
