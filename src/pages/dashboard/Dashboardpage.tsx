import { motion } from "motion/react";
import {
  IconCalendar,
  IconChainLink,
  IconCursor,
  IconTrending,
} from "@/utils/icons";
import ShortenWidget from "@/components/dashboard/index/ShortenWidget";
import StatCard from "@/components/dashboard/index/StatCard";
import RecentLinks from "@/components/dashboard/index/RecentLinks";
import RecentActivity from "@/components/dashboard/index/RecentActivity";
import { useStats } from "@/hooks/useStats";

// Animation variants
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

// MiniBarChart
interface MiniBarChartProps {
  data: number[];
  activeColorClass: string; // Tailwind text/bg colour class for the active bar
  activeIndex: number;
}

function MiniBarChart({
  data,
  activeColorClass,
  activeIndex,
}: MiniBarChartProps) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-9 mt-4">
      {data.map((v, i) => (
        <div
          key={i}
          className={`flex-1 rounded-[3px] ${i === activeIndex ? activeColorClass : "bg-white/[0.07]"}`}
          style={{ height: `${Math.max(8, (v / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}

// StatsGrid
const CHART_1 = [3, 5, 4, 6, 4, 7, 9];
const CHART_2 = [4, 3, 6, 5, 7, 9, 8];
const CHART_3 = [5, 4, 7, 6, 9, 8, 10];

function formatNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toLocaleString();
}

function StatCardSkeleton({ delay }: { delay: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={delay}
      className="rounded-xl p-5 bg-surface-container animate-pulse"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-lg bg-white/[0.07]" />
        <div className="h-4 w-10 rounded bg-white/[0.07]" />
      </div>
      <div className="h-7 w-20 rounded bg-white/[0.07] mb-1.5" />
      <div className="h-2.5 w-16 rounded bg-white/[0.07]" />
      <div className="flex items-end gap-1 h-9 mt-4">
        {[40, 55, 45, 65, 50, 75, 90].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-[3px] bg-white/[0.07]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function StatsGrid() {
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4 mt-6">
        {[3, 3.5, 4, 4.5].map((d) => (
          <StatCardSkeleton key={d} delay={d} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      <StatCard
        delay={3}
        iconBgClass="bg-primary/12"
        icon={<IconChainLink size={15} className="text-primary" />}
        topRight={
          <span className="text-[11px] font-semibold text-green-500">+12%</span>
        }
        value={formatNum(stats?.totalLinks ?? 0)}
        label="TOTAL LINKS"
        bottom={
          <MiniBarChart
            data={CHART_1}
            activeColorClass="bg-primary"
            activeIndex={6}
          />
        }
      />

      <StatCard
        delay={3.5}
        iconBgClass="bg-primary/12"
        icon={<IconCursor size={15} className="text-primary" />}
        topRight={
          <span className="text-[11px] font-semibold text-green-500">+24%</span>
        }
        value={formatNum(stats?.totalClicks ?? 0)}
        label="TOTAL CLICKS"
        bottom={
          <MiniBarChart
            data={CHART_2}
            activeColorClass="bg-primary"
            activeIndex={5}
          />
        }
      />

      <StatCard
        delay={4}
        iconBgClass="bg-red-500/12"
        icon={<IconCalendar size={15} className="text-red-400" />}
        topRight={
          <span className="text-2.5 font-bold tracking-wider px-2 py-0.75 rounded-full bg-blue-500/15 text-blue-300">
            Active
          </span>
        }
        value={formatNum(stats?.clicksToday ?? 0)}
        label="CLICKS TODAY"
        bottom={
          <MiniBarChart
            data={CHART_3}
            activeColorClass="bg-red-400"
            activeIndex={6}
          />
        }
      />

      <StatCard
        delay={4.5}
        iconBgClass="bg-red-500/10"
        icon={<IconTrending size={15} className="text-red-400" />}
        topRight={null}
        value={
          stats?.mostClicked ? `shrt.nr/${stats.mostClicked.short_code}` : "—"
        }
        label="MOST CLICKED"
        bottom={
          <div className="mt-4">
            <div className="h-1.25 rounded-full overflow-hidden bg-surface-container-high">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats?.mostClicked?.percentage ?? 0}%` }}
                transition={{
                  duration: 0.7,
                  delay: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="h-full rounded-full bg-red-500"
              />
            </div>
            <div className="flex justify-end mt-1.5">
              <span className="text-[11px] text-muted">
                {stats?.mostClicked?.percentage ?? 0}%
              </span>
            </div>
          </div>
        }
      />
    </div>
  );
}

// UpgradeCard
function UpgradeCard() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={12}
      className="rounded-xl p-5 mt-4 bg-surface-container"
    >
      <div className="text-2.5 font-bold tracking-[0.15em] uppercase mb-2.5 text-primary">
        UNLIMITED SCALE
      </div>
      <h3 className="text-[1.1rem] font-bold text-white mb-2 leading-snug">
        Upgrade to Enterprise
      </h3>
      <p className="text-[12.5px] leading-relaxed mb-5 text-muted">
        Unlock custom domains, advanced geo-targeting, and team collaboration
        tools.
      </p>
      <button className="w-full py-2.5 rounded-xl text-[11.5px] font-bold tracking-widest uppercase bg-surface-container-highest text-white transition-opacity duration-150 hover:opacity-80">
        LEARN MORE
      </button>
    </motion.div>
  );
}

// DashboardPage
export default function DashboardPage() {
  return (
    <div className="px-8 py-8 pb-12">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="mb-7"
      >
        <h1 className="text-[2rem] font-bold text-white leading-none">
          Dashboard
        </h1>
        <p className="text-[13px] mt-1.75 text-muted">
          Monitor and manage your precision shortcuts.
        </p>
      </motion.div>

      <ShortenWidget />
      <StatsGrid />

      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-7">
          <RecentLinks />
        </div>
        <div className="col-span-5">
          <RecentActivity />
          <UpgradeCard />
        </div>
      </div>
    </div>
  );
}
