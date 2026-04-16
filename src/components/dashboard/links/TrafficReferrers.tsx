import { IconBolt, IconSearch, IconTwitter } from "@/utils/icons";
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

const REFERRERS = [
  {
    icon: <IconTwitter />,
    iconBg: "bg-sky-500/15 text-sky-400",
    name: "Twitter / X",
    sub: "SOCIAL TRAFFIC",
    count: 5102,
    pct: "41.1%",
  },
  {
    icon: <IconBolt />,
    iconBg: "bg-primary/15 text-primary",
    name: "Direct",
    sub: "ORGANIC ENTRY",
    count: 3244,
    pct: "26.1%",
  },
  {
    icon: <IconSearch />,
    iconBg: "bg-green-500/15 text-green-400",
    name: "Google Search",
    sub: "SEARCH ENGINE",
    count: 2118,
    pct: "17.0%",
  },
];

export default function TrafficReferrers() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={4.5}
      className="rounded-xl p-6 bg-surface-container h-full"
    >
      <h2 className="text-[1rem] font-bold text-white mb-5">
        Traffic Referrers
      </h2>
      <div className="flex flex-col gap-3">
        {REFERRERS.map((r, i) => (
          <motion.div
            key={r.name}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5 + i * 0.3}
            className="flex items-center gap-3 px-4 py-4 rounded-xl bg-surface-container-high"
          >
            <div
              className={`w-9.5 h-9.5 rounded-[10px] flex items-center justify-center shrink-0 ${r.iconBg}`}
            >
              {r.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-white leading-none mb-0.75">
                {r.name}
              </div>
              <div className="text-[10px] font-semibold tracking-widest text-muted">
                {r.sub}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[15px] font-bold text-white leading-none">
                {r.count.toLocaleString()}
              </div>
              <div className="text-[10px] text-muted mt-0.5">{r.pct}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
