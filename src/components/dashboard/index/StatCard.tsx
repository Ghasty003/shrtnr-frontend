import { motion } from "motion/react";

interface StatCardProps {
  delay: number;
  icon: React.ReactNode;
  iconBgClass: string;
  topRight: React.ReactNode;
  value: string;
  label: string;
  bottom: React.ReactNode;
}

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

export default function StatCard({
  delay,
  icon,
  iconBgClass,
  topRight,
  value,
  label,
  bottom,
}: StatCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={delay}
      className="rounded-xl p-4 sm:p-5 flex flex-col bg-surface-container"
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-8.5 h-8.5 rounded-[9px] flex items-center justify-center shrink-0 ${iconBgClass}`}
        >
          {icon}
        </div>
        {topRight}
      </div>
      <div className="mt-3.5">
        <div className="text-[1.5rem] sm:text-[1.85rem] font-bold text-white leading-none truncate">
          {value}
        </div>
        <div className="text-[10.5px] font-semibold tracking-[0.12em] uppercase mt-1.25 text-muted">
          {label}
        </div>
      </div>
      {bottom}
    </motion.div>
  );
}
