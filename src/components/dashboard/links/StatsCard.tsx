import { motion } from "motion/react";
import type { LinkStats } from "@/api/url";

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

function CardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={1 + index * 0.4}
      className="rounded-xl p-5 bg-surface-container animate-pulse"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="h-2.5 w-24 rounded bg-white/[0.07]" />
        <div className="h-3 w-10 rounded bg-white/[0.07]" />
      </div>
      <div className="h-8 w-28 rounded bg-white/[0.07] mb-4" />
      <div className="h-0.75 w-16 rounded-full bg-white/[0.07]" />
    </motion.div>
  );
}

interface StatCardsProps {
  stats: LinkStats | undefined;
  isLoading: boolean;
}

export default function StatCards({ stats, isLoading }: StatCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[0, 1, 2, 3].map((i) => (
          <CardSkeleton key={i} index={i} />
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "TOTAL CLICKS",
      value: (stats?.totalClicks ?? 0).toLocaleString(),
      unit: undefined,
      badge: "+12.4%",
      badgeColor: "text-green-400",
      accentColor: "#BD9DFF",
    },
    {
      label: "UNIQUE VISITORS",
      value: (stats?.uniqueVisitors ?? 0).toLocaleString(),
      unit: undefined,
      badge: "+5.2%",
      badgeColor: "text-green-400",
      accentColor: "#BD9DFF",
    },
    {
      label: "AVG REDIRECT TIME",
      value: String(stats?.avgRedirectTime ?? 142),
      unit: "ms",
      badge: "-18ms",
      badgeColor: "text-green-400",
      accentColor: "#BD9DFF",
    },
    {
      label: "BOUNCE RATE",
      value: String(stats?.bounceRate ?? 4.2),
      unit: "%",
      badge: "+2.1%",
      badgeColor: "text-red-400",
      accentColor: "#EF4444",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1 + i * 0.4}
          className="rounded-xl p-5 bg-surface-container overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10.5px] font-semibold tracking-[0.12em] text-muted">
              {card.label}
            </span>
            <span className={`text-[11px] font-bold ${card.badgeColor}`}>
              {card.badge}
            </span>
          </div>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-[2rem] font-bold text-white leading-none">
              {card.value}
            </span>
            {card.unit && (
              <span className="text-[1rem] font-bold text-muted">
                {card.unit}
              </span>
            )}
          </div>
          <motion.div
            className="h-0.75 rounded-full"
            style={{ background: card.accentColor }}
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{
              duration: 0.6,
              delay: 0.3 + i * 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
