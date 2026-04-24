import CreateLinkModal from "@/components/modals/CreateLinkModal";
import { IconPlus } from "@/utils/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface PageHeaderProps {
  filter: FilterTab;
  setFilter: (f: FilterTab) => void;
}

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

export default function PageHeader({ filter, setFilter }: PageHeaderProps) {
  const tabs: FilterTab[] = ["ALL", "ACTIVE", "DISABLED"];

  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
      className="mb-8"
    >
      {/* Breadcrumb */}
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-3">
        WORKSPACE <span className="mx-1 opacity-40">/</span>{" "}
        <span className="text-primary">HYPER-PRECISION VOID</span>
      </p>

      {/* Title row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1
          className="font-bold text-white leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
        >
          My Links
        </h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container w-full sm:w-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={[
                  "flex-1 sm:flex-none px-4 py-1.75 rounded-lg text-[11px] font-bold tracking-widest transition-all duration-150",
                  filter === t
                    ? "bg-surface-container-highest text-white"
                    : "text-muted hover:text-white",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.25 rounded-xl text-[13px] font-bold text-white tracking-wide whitespace-nowrap transition-opacity duration-150 hover:opacity-90 active:scale-[0.98] w-full sm:w-auto [background:var(--gradient-primary)]"
          >
            <IconPlus />
            Create New Link
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <CreateLinkModal onClose={() => setShowCreateModal(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
