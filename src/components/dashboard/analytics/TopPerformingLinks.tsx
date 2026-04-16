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

const TOP_LINKS = [
  {
    rank: 1,
    slug: "shorten.io/q2-report-2024",
    created: "Created 2 days ago",
    clicks: "142.8K",
    delta: "+22.4%",
    positive: true,
  },
  {
    rank: 2,
    slug: "shorten.io/product-launch",
    created: "Created 5 days ago",
    clicks: "98.2K",
    delta: "+12.8%",
    positive: true,
  },
  {
    rank: 3,
    slug: "shorten.io/exclusive-deal",
    created: "Created 1 week ago",
    clicks: "76.4K",
    delta: "-4.1%",
    positive: false,
  },
];

export default function TopPerformingLinks() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={5}
      className="rounded-xl p-6 bg-surface-container"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[1rem] font-bold text-white">
          Top Performing Links
        </h2>
        <button className="text-[11px] font-semibold text-primary hover:opacity-80 transition-opacity duration-150">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-0.5">
        {TOP_LINKS.map((link, i) => (
          <motion.div
            key={link.rank}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={6 + i * 0.5}
            className="flex items-center gap-4 px-3 py-3.5 rounded-xl transition-colors duration-150 hover:bg-surface-container-high"
          >
            {/* Rank badge */}
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-surface-container-high text-[11px] font-bold text-muted">
              {link.rank}
            </div>

            {/* URL + meta */}
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-white truncate">
                {link.slug}
              </div>
              <div className="text-[11px] text-muted mt-0.5">
                {link.created}
              </div>
            </div>

            {/* Stats */}
            <div className="text-right shrink-0">
              <div className="text-[13px] font-bold text-white">
                {link.clicks}
              </div>
              <div
                className={`text-[11px] font-semibold mt-0.5 ${link.positive ? "text-green-500" : "text-red-400"}`}
              >
                {link.delta}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
