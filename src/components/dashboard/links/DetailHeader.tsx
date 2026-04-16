import {
  IconArrowRight,
  IconChevronLeft,
  IconGear,
  IconShare,
} from "@/utils/icons";
import { useNavigate } from "react-router";
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

interface DetailHeaderProps {
  slug: string;
}

export default function DetailHeader({ slug }: DetailHeaderProps) {
  const navigate = useNavigate();
  const displaySlug = `shrt.nr/${slug}`;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
      className="mb-8"
    >
      {/* Back + eyebrow */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => navigate("/dashboard/links")}
          className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-muted transition-colors duration-150 hover:text-white"
        >
          <IconChevronLeft />
          BACK
        </button>
        <span className="text-muted opacity-30">|</span>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
          REAL-TIME LINK INTELLIGENCE
        </p>
      </div>

      {/* Title + buttons */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1
            className="font-bold text-white leading-[1.05] tracking-[-0.02em] mb-2"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
          >
            {displaySlug}
          </h1>
          <div className="flex items-center gap-2 text-muted">
            <IconArrowRight />
            <span className="text-[12.5px] font-mono">
              https://editorial.engineering/campaigns/q4-launch-promo-final-v2
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 mt-1">
          <button className="flex items-center gap-2 px-4 py-2.25 rounded-xl text-[12.5px] font-semibold text-white bg-surface-container transition-colors duration-150 hover:bg-surface-container-high">
            <IconShare />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.25 rounded-xl text-[12.5px] font-semibold text-white bg-surface-container transition-colors duration-150 hover:bg-surface-container-high">
            <IconGear />
            Configure
          </button>
        </div>
      </div>
    </motion.div>
  );
}
