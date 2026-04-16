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

interface StatCardItem {
  label: string;
  value: string;
  unit?: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
}

const STAT_CARDS: StatCardItem[] = [
  {
    label: "TOTAL CLICKS",
    value: "12,408",
    badge: "+12.4%",
    badgeColor: "text-green-400",
    accentColor: "#BD9DFF",
  },
  {
    label: "UNIQUE VISITORS",
    value: "8,912",
    badge: "+5.2%",
    badgeColor: "text-green-400",
    accentColor: "#BD9DFF",
  },
  {
    label: "AVG REDIRECT TIME",
    value: "142",
    unit: "ms",
    badge: "-18ms",
    badgeColor: "text-green-400",
    accentColor: "#BD9DFF",
  },
  {
    label: "BOUNCE RATE",
    value: "4.2",
    unit: "%",
    badge: "+2.1%",
    badgeColor: "text-red-400",
    accentColor: "#EF4444",
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {STAT_CARDS.map((card, i) => (
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

          {/* Accent underline bar */}
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
