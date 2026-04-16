import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

// ── Animation variant ─────────────────────────────────────────────────────────
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

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconPlus = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
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

const IconShare = () => (
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
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
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

const IconSparkle = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

const IconChevronLeft = () => (
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
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronRight = () => (
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
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────
type FilterTab = "ALL" | "ACTIVE" | "DISABLED";

const LINKS = [
  {
    id: "campaign-alpha",
    short: "shrt.nr/campaign-alpha",
    long: "https://marketing.global-editorial.io/...",
    clicks: 12402,
    unique: 8192,
    status: "ACTIVE" as const,
    created: "Oct 24, 2023",
  },
  {
    id: "internal-docs",
    short: "shrt.nr/internal-docs",
    long: "https://notion.so/editorial-engineer...",
    clicks: 458,
    unique: 102,
    status: "DISABLED" as const,
    created: "Oct 22, 2023",
  },
  {
    id: "beta-access",
    short: "shrt.nr/beta-access",
    long: "https://app.hyperprecision.io/auth/...",
    clicks: 3122,
    unique: 2840,
    status: "ACTIVE" as const,
    created: "Oct 20, 2023",
  },
];

// ── PageHeader ────────────────────────────────────────────────────────────────
interface PageHeaderProps {
  filter: FilterTab;
  setFilter: (f: FilterTab) => void;
}

function PageHeader({ filter, setFilter }: PageHeaderProps) {
  const tabs: FilterTab[] = ["ALL", "ACTIVE", "DISABLED"];
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
      className="mb-8"
    >
      {/* Breadcrumb */}
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-3">
        WORKSPACE <span className="mx-1 opacity-40">/</span>{" "}
        <span className="text-primary">HYPER-PRECISION VOID</span>
      </p>

      {/* Title row */}
      <div className="flex items-center justify-between">
        <h1
          className="font-bold text-white leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
        >
          My Links
        </h1>

        <div className="flex items-center gap-3">
          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={[
                  "px-4 py-[7px] rounded-lg text-[11px] font-bold tracking-[0.1em] transition-all duration-150",
                  filter === t
                    ? "bg-surface-container-highest text-white"
                    : "text-muted hover:text-white",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button className="flex items-center gap-2 px-5 py-[9px] rounded-xl text-[13px] font-bold text-white tracking-wide whitespace-nowrap transition-opacity duration-150 hover:opacity-90 active:scale-[0.98] [background:var(--gradient-primary)]">
            <IconPlus />
            Create New Link
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── StatsStrip ────────────────────────────────────────────────────────────────
function StatsStrip() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={1}
      className="grid grid-cols-4 gap-4 mb-6"
    >
      {/* Total Assets */}
      <div className="rounded-xl p-5 bg-surface-container">
        <p className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted mb-3">
          TOTAL ASSETS
        </p>
        <p className="text-[2rem] font-bold text-white leading-none">1,248</p>
      </div>

      {/* Clicks 24H */}
      <div className="rounded-xl p-5 bg-surface-container">
        <p className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted mb-3">
          CLICKS (24H)
        </p>
        <p
          className="text-[2rem] font-bold leading-none"
          style={{ color: "#BD9DFF" }}
        >
          +42.5k
        </p>
      </div>

      {/* Avg CTR */}
      <div className="rounded-xl p-5 bg-surface-container">
        <p className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted mb-3">
          AVG CTR
        </p>
        <p className="text-[2rem] font-bold text-white leading-none">18.2%</p>
      </div>

      {/* System Status */}
      <div className="rounded-xl p-5 bg-surface-container">
        <p className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted mb-3">
          SYSTEM STATUS
        </p>
        <p className="flex items-center gap-2 text-[1rem] font-bold text-green-400 leading-none mt-[6px]">
          <span className="w-2 h-2 rounded-full bg-green-400 shrink-0 animate-pulse" />
          OPERATIONAL
        </p>
      </div>
    </motion.div>
  );
}

// ── LinksTable ────────────────────────────────────────────────────────────────
interface LinksTableProps {
  filter: FilterTab;
}

function LinksTable({ filter }: LinksTableProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const totalPages = 84;

  const filtered = LINKS.filter((l) => filter === "ALL" || l.status === filter);

  const pageNums = [1, 2, 3];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={2}
      className="rounded-xl overflow-hidden bg-surface-container mb-6"
    >
      {/* Column headers */}
      <div
        className="grid items-center px-5 py-[14px]"
        style={{ gridTemplateColumns: "1fr 200px 120px 130px 100px" }}
      >
        {["LINK DETAILS", "PERFORMANCE", "STATUS", "CREATED", "ACTIONS"].map(
          (col) => (
            <span
              key={col}
              className="text-[10.5px] font-semibold tracking-[0.1em] text-muted"
            >
              {col}
            </span>
          ),
        )}
      </div>

      {/* Rows */}
      {filtered.map((link, i) => (
        <motion.div
          key={link.id}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3 + i * 0.4}
          className="grid items-center px-5 py-5 border-t border-border transition-colors duration-150 hover:bg-surface-container-high cursor-pointer"
          style={{ gridTemplateColumns: "1fr 200px 120px 130px 100px" }}
          onClick={() => navigate(`/dashboard/links/${link.id}`)}
        >
          {/* Link details */}
          <div className="min-w-0 pr-6">
            <div className="text-[13px] font-semibold text-primary truncate mb-[3px]">
              {link.short}
            </div>
            <div className="text-[11.5px] text-muted truncate">{link.long}</div>
          </div>

          {/* Performance */}
          <div className="flex items-center gap-5">
            <div>
              <div className="text-[13px] font-bold text-white">
                {link.clicks.toLocaleString()}
              </div>
              <div className="text-[10px] font-semibold tracking-[0.08em] text-muted mt-[2px]">
                CLICKS
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-white">
                {link.unique.toLocaleString()}
              </div>
              <div className="text-[10px] font-semibold tracking-[0.08em] text-muted mt-[2px]">
                UNIQUE
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            {link.status === "ACTIVE" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-[5px] rounded-[6px] text-[11px] font-bold tracking-wide bg-green-500/10 text-green-400 border border-green-500/20">
                <span className="w-[5px] h-[5px] rounded-full bg-green-400 shrink-0" />
                ACTIVE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-[5px] rounded-[6px] text-[11px] font-bold tracking-wide bg-white/5 text-muted border border-white/8">
                DISABLED
              </span>
            )}
          </div>

          {/* Created */}
          <div className="text-[12.5px] text-muted">{link.created}</div>

          {/* Actions */}
          <div
            className="flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="p-[7px] rounded-lg text-muted transition-colors duration-150 hover:text-white hover:bg-surface-container-highest">
              <IconEdit />
            </button>
            <button className="p-[7px] rounded-lg text-muted transition-colors duration-150 hover:text-white hover:bg-surface-container-highest">
              <IconShare />
            </button>
            <button className="p-[7px] rounded-lg text-muted transition-colors duration-150 hover:text-red-400 hover:bg-red-500/8">
              <IconTrash />
            </button>
          </div>
        </motion.div>
      ))}

      {/* Pagination footer */}
      <div className="flex items-center justify-between px-5 py-[14px] border-t border-border">
        <span className="text-[10.5px] font-semibold tracking-[0.08em] text-muted">
          SHOWING 1–15 OF 1,248 ITEMS
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-[7px] rounded-lg text-muted transition-colors duration-150 hover:text-white"
          >
            <IconChevronLeft />
          </button>

          {pageNums.map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={[
                "w-8 h-8 rounded-lg text-[12px] font-semibold transition-all duration-150",
                page === n
                  ? "bg-primary text-white"
                  : "text-muted hover:text-white",
              ].join(" ")}
            >
              {n}
            </button>
          ))}

          <span className="w-8 h-8 flex items-center justify-center text-[12px] text-muted">
            …
          </span>

          <button
            onClick={() => setPage(totalPages)}
            className={[
              "w-8 h-8 rounded-lg text-[12px] font-semibold transition-all duration-150",
              page === totalPages
                ? "bg-primary text-white"
                : "text-muted hover:text-white",
            ].join(" ")}
          >
            {totalPages}
          </button>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="p-[7px] rounded-lg text-muted transition-colors duration-150 hover:text-white"
          >
            <IconChevronRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── InsightCallout ────────────────────────────────────────────────────────────
function InsightCallout() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={7}
      className="rounded-xl p-6 bg-surface-container flex items-center gap-5"
    >
      {/* Icon */}
      <div className="w-[56px] h-[56px] rounded-xl flex items-center justify-center shrink-0 [background:var(--gradient-primary)]">
        <IconSparkle />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[1rem] font-bold text-white mb-[5px]">
          Precision Optimization Insight
        </h3>
        <p className="text-[13px] leading-relaxed text-muted">
          System analysis indicates your link CTR increased by{" "}
          <span className="text-white font-semibold">14.2%</span> after
          implementing custom vanity domains. Consider updating 8 pending
          generic links to further improve engagement metrics.
        </p>
      </div>

      {/* CTA */}
      <button className="px-6 py-[10px] rounded-xl text-[12px] font-bold tracking-[0.12em] uppercase text-white whitespace-nowrap transition-opacity duration-150 hover:opacity-90 active:scale-[0.98] shrink-0 bg-surface-container-highest">
        RUN ANALYSIS
      </button>
    </motion.div>
  );
}

// ── LinksPage ─────────────────────────────────────────────────────────────────
export default function LinksPage() {
  const [filter, setFilter] = useState<FilterTab>("ALL");

  return (
    <div className="px-8 py-8 pb-12">
      <PageHeader filter={filter} setFilter={setFilter} />
      <StatsStrip />
      <LinksTable filter={filter} />
      <InsightCallout />
    </div>
  );
}
