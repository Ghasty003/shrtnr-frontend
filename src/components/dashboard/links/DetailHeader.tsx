import {
  IconArrowRight,
  IconChevronLeft,
  IconGear,
  IconShare,
} from "@/utils/icons";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import type { LinkDetail } from "@/api/url";

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
  link: LinkDetail | undefined;
  isLoading: boolean;
}

export default function DetailHeader({
  slug,
  link,
  isLoading,
}: DetailHeaderProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
      className="mb-8"
    >
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          {isLoading ? (
            <div className="animate-pulse space-y-2.5">
              <div className="h-9 w-64 rounded-lg bg-white/[0.07]" />
              <div className="h-4 w-96 rounded bg-white/[0.07]" />
            </div>
          ) : (
            <>
              <h1
                className="font-bold text-white leading-[1.05] tracking-[-0.02em] mb-2"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
              >
                {import.meta.env.VITE_API_URL}/{slug}
              </h1>
              <div className="flex items-center gap-2 text-muted min-w-0">
                <IconArrowRight />
                <span className="text-[12.5px] font-mono truncate max-w-[60vw] sm:max-w-lg">
                  {link?.long_url}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 sm:shrink-0 sm:mt-1">
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
