import { motion } from "motion/react";
import { useAnalyticsStore } from "@/store/analyticsStore";
import type { AnalyticsRange } from "@/api/analytics";

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

export default function PageHeader() {
  const { range, setRange } = useAnalyticsStore();

  const tabs: { key: AnalyticsRange; label: string }[] = [
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
      className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8"
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

      <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container self-start sm:self-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setRange(t.key)}
            className={[
              "px-4 py-1.75 rounded-lg text-[12px] font-semibold tracking-wide transition-all duration-150",
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
