import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import DetailHeader from "@/components/dashboard/links/DetailHeader";
import StatCards from "@/components/dashboard/links/StatsCard";
import ClicksOverTimeChart from "@/components/dashboard/links/ClicksOverTimeChart";
import TopCountries from "@/components/dashboard/links/TopCountries";
import TrafficReferrers from "@/components/dashboard/links/TrafficReferrers";
import DeviceDistribution from "@/components/dashboard/analytics/DeviceDistribution";

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

function StatusFooter() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={9}
      className="flex items-center justify-between px-8 py-3 mt-8 -mx-8 bg-surface-container border-t border-border"
    >
      <div className="flex items-center gap-3 text-[10px] font-mono font-semibold tracking-widest text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
          API: ONLINE
        </span>
        <span className="opacity-30">/</span>
        <span>NODE: US-EAST-1</span>
      </div>
      <span className="text-[10px] font-mono font-semibold tracking-widest text-muted">
        EDITORIAL.ANALYTICS V4.2.0-STABLE
      </span>
    </motion.div>
  );
}

export default function LinkDetailPage() {
  const { slug = "launch-promo" } = useParams<{ slug: string }>();

  return (
    <div className="px-8 py-8 pb-0">
      <DetailHeader slug={slug} />
      <StatCards />
      <ClicksOverTimeChart />

      {/* Bottom three-panel row */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-4">
          <TopCountries />
        </div>
        <div className="col-span-4">
          <TrafficReferrers />
        </div>
        <div className="col-span-4">
          <DeviceDistribution />
        </div>
      </div>

      <StatusFooter />
    </div>
  );
}
