import {
  IconChainLink,
  IconCursor,
  IconGear,
  IconWarning,
} from "@/utils/icons";
import { motion } from "motion/react";

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

const ACTIVITIES = [
  {
    key: "link",
    icon: <IconChainLink size={15} className="text-primary" />,
    iconBgClass: "bg-primary/12",
    title: "Link Created",
    desc: (
      <>
        Shortened{" "}
        <span className="text-primary font-semibold">shrt.nr/sale</span> for
        campaign.
      </>
    ),
    time: "2 MINUTES AGO",
  },
  {
    key: "click",
    icon: <IconCursor size={15} className="text-blue-400" />,
    iconBgClass: "bg-blue-500/12",
    title: "New Click Detected",
    desc: (
      <>
        Redirect from Twitter/X to{" "}
        <span className="text-primary font-semibold">shrt.nr/blog</span>
      </>
    ),
    time: "15 MINUTES AGO",
  },
  {
    key: "warning",
    icon: <IconWarning size={15} className="text-red-400" />,
    iconBgClass: "bg-red-500/12",
    title: "Security Alert",
    desc: (
      <>
        Unusual traffic spike on{" "}
        <span className="text-primary font-semibold">shrt.nr/promo</span>
      </>
    ),
    time: "1 HOUR AGO",
  },
  {
    key: "settings",
    icon: <IconGear size={15} className="text-muted" />,
    iconBgClass: "bg-surface-container-high",
    title: "Profile Updated",
    desc: "Changed primary email address.",
    time: "4 HOURS AGO",
  },
];

export default function RecentActivity() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}>
      <h2 className="text-[1.25rem] font-bold text-white mb-4.5">
        Recent Activity
      </h2>
      <div className="rounded-xl p-4 bg-surface-container">
        <div className="flex flex-col gap-4.5">
          {ACTIVITIES.map((item, i) => (
            <motion.div
              key={item.key}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={7 + i * 0.5}
              className="flex items-start gap-3"
            >
              <div
                className={`w-8.5 h-8.5 rounded-[9px] flex items-center justify-center shrink-0 mt-px ${item.iconBgClass}`}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-white leading-tight">
                  {item.title}
                </div>
                <div className="text-[12px] mt-0.75 leading-relaxed text-muted">
                  {item.desc}
                </div>
                <div className="text-2.5 font-semibold tracking-widest mt-1.25 text-muted-dim">
                  {item.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
