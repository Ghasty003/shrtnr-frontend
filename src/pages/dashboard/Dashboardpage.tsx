import { useState } from "react";
import { motion } from "motion/react";

// ── Animation variants ────────────────────────────────────────────────────────
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

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconCopy = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconQR = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <path d="M14 14h3v3" />
    <path d="M17 17h3v3" />
    <path d="M14 20h3" />
  </svg>
);

const IconFilter = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="21" y1="6" x2="3" y2="6" />
    <line x1="17" y1="12" x2="7" y2="12" />
    <line x1="13" y1="18" x2="11" y2="18" />
  </svg>
);

const IconDownload = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconChainLink = ({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconCursor = ({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4l7.07 17 2.51-7.39L21 11.07z" />
  </svg>
);

const IconCalendar = ({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconTrending = ({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const IconWarning = ({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
  </svg>
);

const IconGear = ({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconEdit = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconTrash = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

// ── MiniBarChart ──────────────────────────────────────────────────────────────
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

// ── ShortenWidget ─────────────────────────────────────────────────────────────
function ShortenWidget() {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={1}
      className="rounded-xl p-6 bg-surface-container"
    >
      <div className="flex items-end gap-3">
        {/* Long URL */}
        <div className="flex-1 min-w-0">
          <label className="block text-[11px] font-semibold tracking-[0.1em] mb-[10px] text-primary">
            LONG URL
          </label>
          <input
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://very-long-and-complex-destination-url.com/path"
            className="w-full px-4 py-[11px] rounded-xl text-[13px] outline-none bg-surface-container-high text-white placeholder:text-muted/40 transition-all duration-150 focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Custom alias */}
        <div className="w-[210px] shrink-0">
          <label className="block text-[11px] font-semibold tracking-[0.1em] mb-[10px] text-primary">
            CUSTOM ALIAS (OPTIONAL)
          </label>
          <input
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="summer-promo"
            className="w-full px-4 py-[11px] rounded-xl text-[13px] outline-none bg-surface-container-high text-white placeholder:text-muted/40 transition-all duration-150 focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Shorten button */}
        <button className="px-7 py-[11px] rounded-xl text-[13px] font-extrabold text-white tracking-[0.12em] transition-opacity duration-150 hover:opacity-90 active:scale-[0.98] shrink-0 [background:var(--gradient-primary)]">
          SHORTEN
        </button>
      </div>

      {/* Preview row */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-muted">Preview:</span>
          <span className="px-[10px] py-[4px] rounded-lg text-[13px] font-mono font-medium bg-primary/15 text-primary">
            shrt.nr/summer-promo
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-2 rounded-lg text-muted transition-colors duration-150 hover:text-white"
            title="Copy"
          >
            <IconCopy />
          </button>
          <button
            className="p-2 rounded-lg text-muted transition-colors duration-150 hover:text-white"
            title="QR Code"
          >
            <IconQR />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── StatCard ──────────────────────────────────────────────────────────────────
interface StatCardProps {
  delay: number;
  icon: React.ReactNode;
  iconBgClass: string;
  topRight: React.ReactNode;
  value: string;
  label: string;
  bottom: React.ReactNode;
}

function StatCard({
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
      className="rounded-xl p-5 flex flex-col bg-surface-container"
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 ${iconBgClass}`}
        >
          {icon}
        </div>
        {topRight}
      </div>
      <div className="mt-[14px]">
        <div className="text-[1.85rem] font-bold text-white leading-none">
          {value}
        </div>
        <div className="text-[10.5px] font-semibold tracking-[0.12em] uppercase mt-[5px] text-muted">
          {label}
        </div>
      </div>
      {bottom}
    </motion.div>
  );
}

// ── StatsGrid ─────────────────────────────────────────────────────────────────
const CHART_1 = [3, 5, 4, 6, 4, 7, 9];
const CHART_2 = [4, 3, 6, 5, 7, 9, 8];
const CHART_3 = [5, 4, 7, 6, 9, 8, 10];

function StatsGrid() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      <StatCard
        delay={3}
        iconBgClass="bg-primary/12"
        icon={<IconChainLink size={15} className="text-primary" />}
        topRight={
          <span className="text-[11px] font-semibold text-green-500">+12%</span>
        }
        value="1,284"
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
        value="42.5k"
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
          <span className="text-[10px] font-bold tracking-wider px-[8px] py-[3px] rounded-full bg-blue-500/15 text-blue-300">
            Active
          </span>
        }
        value="892"
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
        value="shrt.nr/sale"
        label="MOST CLICKED"
        bottom={
          <div className="mt-4">
            <div className="h-[5px] rounded-full overflow-hidden bg-surface-container-high">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{
                  duration: 0.7,
                  delay: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="h-full rounded-full bg-red-500"
              />
            </div>
            <div className="flex justify-end mt-1.5">
              <span className="text-[11px] text-muted">75%</span>
            </div>
          </div>
        }
      />
    </div>
  );
}

// ── RecentLinks ───────────────────────────────────────────────────────────────
const LINKS = [
  {
    id: 1,
    short: "shrt.nr/dev-repo",
    long: "github.com/shrtnr-app/core-engine",
    clicks: 1240,
    date: ["Oct", "12, 2023"],
    faviconColor: "#EF4444",
  },
  {
    id: 2,
    short: "shrt.nr/docs",
    long: "notion.so/shrtnr-team/documentation",
    clicks: 856,
    date: ["Oct", "11, 2023"],
    faviconColor: "#3B82F6",
  },
  {
    id: 3,
    short: "shrt.nr/portfolio",
    long: "dribbble.com/alex-design/shots/2023",
    clicks: 3120,
    date: ["Oct", "09, 2023"],
    faviconColor: "#8B5CF6",
  },
];

function RecentLinks() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}>
      <div className="flex items-center justify-between mb-[18px]">
        <h2 className="text-[1.25rem] font-bold text-white">Recent Links</h2>
        <div className="flex items-center gap-2">
          <button className="p-[7px] rounded-lg bg-surface-container text-muted transition-colors duration-150 hover:text-white">
            <IconFilter />
          </button>
          <button className="p-[7px] rounded-lg bg-surface-container text-muted transition-colors duration-150 hover:text-white">
            <IconDownload />
          </button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden bg-surface-container">
        {/* Column headers */}
        <div
          className="grid items-center px-5 py-3"
          style={{ gridTemplateColumns: "1fr 90px 80px 90px 72px" }}
        >
          {["LINK", "CLICKS", "DATE", "STATUS", "ACTIONS"].map((col) => (
            <span
              key={col}
              className="text-[10.5px] font-semibold tracking-[0.1em] text-muted"
            >
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {LINKS.map((link, i) => (
          <motion.div
            key={link.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={7 + i * 0.5}
            className="grid items-center px-5 py-4 border-t border-border"
            style={{ gridTemplateColumns: "1fr 90px 80px 90px 72px" }}
          >
            {/* Link col */}
            <div className="flex items-center gap-[10px] min-w-0 pr-4">
              <div
                className="w-7 h-7 rounded-[7px] flex items-center justify-center shrink-0"
                style={{ background: link.faviconColor + "22" }}
              >
                <div
                  className="w-[10px] h-[10px] rounded-[3px]"
                  style={{ background: link.faviconColor }}
                />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-white truncate">
                  {link.short}
                </div>
                <div className="text-[11px] truncate mt-[1px] text-muted">
                  {link.long}
                </div>
              </div>
            </div>

            {/* Clicks */}
            <div>
              <span className="inline-block text-[12px] font-semibold px-2 py-[3px] rounded-[6px] bg-surface-container-high text-[#ABABAB]">
                {link.clicks.toLocaleString()}
              </span>
            </div>

            {/* Date */}
            <div className="text-[11px] font-medium leading-tight text-muted">
              <span>{link.date[0]}</span>
              <br />
              <span>{link.date[1]}</span>
            </div>

            {/* Status */}
            <div>
              <span className="text-[11px] font-bold tracking-wide flex items-center gap-1.5 text-green-500">
                <span className="w-[5px] h-[5px] rounded-full bg-green-500 shrink-0 inline-block" />
                ACTIVE
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-md text-muted transition-colors duration-150 hover:text-white">
                <IconEdit />
              </button>
              <button className="p-1.5 rounded-md text-muted transition-colors duration-150 hover:text-red-400">
                <IconTrash />
              </button>
            </div>
          </motion.div>
        ))}

        {/* Footer */}
        <div className="py-[14px] text-center border-t border-border">
          <button className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted transition-colors duration-150 hover:text-white">
            VIEW ALL LINKS
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── RecentActivity ────────────────────────────────────────────────────────────
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

function RecentActivity() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}>
      <h2 className="text-[1.25rem] font-bold text-white mb-[18px]">
        Recent Activity
      </h2>
      <div className="rounded-xl p-4 bg-surface-container">
        <div className="flex flex-col gap-[18px]">
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
                className={`w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 mt-[1px] ${item.iconBgClass}`}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-white leading-tight">
                  {item.title}
                </div>
                <div className="text-[12px] mt-[3px] leading-relaxed text-muted">
                  {item.desc}
                </div>
                <div className="text-[10px] font-semibold tracking-[0.1em] mt-[5px] text-muted-dim">
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
      <div className="text-[10px] font-bold tracking-[0.15em] uppercase mb-[10px] text-primary">
        UNLIMITED SCALE
      </div>
      <h3 className="text-[1.1rem] font-bold text-white mb-[8px] leading-snug">
        Upgrade to Enterprise
      </h3>
      <p className="text-[12.5px] leading-relaxed mb-5 text-muted">
        Unlock custom domains, advanced geo-targeting, and team collaboration
        tools.
      </p>
      <button className="w-full py-[10px] rounded-xl text-[11.5px] font-bold tracking-[0.1em] uppercase bg-surface-container-highest text-white transition-opacity duration-150 hover:opacity-80">
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
        <p className="text-[13px] mt-[7px] text-muted">
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
