import { IconCursor, IconLink, IconTarget, IconUsers } from "@/utils/icons";
import { motion } from "motion/react";

interface StatItem {
  icon: React.ReactNode;
  iconBgClass: string;
  label: string;
  value: string;
  badge: React.ReactNode;
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

const STATS: StatItem[] = [
  {
    icon: <IconCursor className="text-primary" />,
    iconBgClass: "bg-primary/12",
    label: "Total Clicks",
    value: "1.28M",
    badge: (
      <span className="text-[11px] font-semibold text-green-500">+14.2%</span>
    ),
  },
  {
    icon: <IconUsers className="text-primary" />,
    iconBgClass: "bg-primary/12",
    label: "Unique Visitors",
    value: "842.1K",
    badge: (
      <span className="text-[11px] font-semibold text-green-500">+8.1%</span>
    ),
  },
  {
    icon: <IconTarget className="text-red-400" />,
    iconBgClass: "bg-red-500/12",
    label: "Avg. CTR",
    value: "4.2%",
    badge: (
      <span className="text-[11px] font-semibold text-red-400">-1.2%</span>
    ),
  },
  {
    icon: <IconLink className="text-primary" />,
    iconBgClass: "bg-primary/12",
    label: "Active Links",
    value: "1,402",
    badge: (
      <span className="text-[10px] font-bold tracking-wider px-2 py-0.75 rounded-full bg-blue-500/15 text-blue-300">
        Active
      </span>
    ),
  },
];

export default function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1 + i * 0.5}
          className="rounded-xl p-5 bg-surface-container"
        >
          <div className="flex items-start justify-between mb-3.5">
            <div
              className={`w-8.5 h-8.5 rounded-[9px] flex items-center justify-center shrink-0 ${s.iconBgClass}`}
            >
              {s.icon}
            </div>
            {s.badge}
          </div>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-1.25">
            {s.label}
          </p>
          <p className="text-[1.85rem] font-bold text-white leading-none">
            {s.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
