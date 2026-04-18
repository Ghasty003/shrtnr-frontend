import { useState } from "react";
import { motion } from "motion/react";
import PageHeader from "@/components/dashboard/links/PageHeader";
import { IconSparkle } from "@/utils/icons";
import StatsStrip from "@/components/dashboard/links/StatsStrip";
import LinksTable from "@/components/dashboard/links/LinksTable";

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

type FilterTab = "ALL" | "ACTIVE" | "DISABLED";

function InsightCallout() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={7}
      className="rounded-xl p-6 bg-surface-container flex items-center gap-5"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 [background:var(--gradient-primary)]">
        <IconSparkle />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[1rem] font-bold text-white mb-1.25">
          Precision Optimization Insight
        </h3>
        <p className="text-[13px] leading-relaxed text-muted">
          System analysis indicates your link CTR increased by{" "}
          <span className="text-white font-semibold">14.2%</span> after
          implementing custom vanity domains. Consider updating 8 pending
          generic links to further improve engagement metrics.
        </p>
      </div>

      {/* CTA */}
      <button className="px-6 py-2.5 rounded-xl text-[12px] font-bold tracking-[0.12em] uppercase text-white whitespace-nowrap transition-opacity duration-150 hover:opacity-90 active:scale-[0.98] shrink-0 bg-surface-container-highest">
        RUN ANALYSIS
      </button>
    </motion.div>
  );
}

export default function LinksPage() {
  const [filter, setFilter] = useState<FilterTab>("ALL");

  return (
    <div className="px-8 py-8 pb-12">
      <PageHeader filter={filter} setFilter={setFilter} />
      <StatsStrip />
      <LinksTable key={filter} filter={filter} />
      <InsightCallout />
    </div>
  );
}
