import { useState, useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from "motion/react";
import { useShortUrl } from "@/hooks/useShortUrl";
import { type ShortUrl } from "@/api/url";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  index: number;
}

interface FeatureItem {
  icon: ReactNode;
  title: string;
  desc: string;
}

interface WorkflowStep {
  num: string;
  title: string;
  desc: string;
}

interface FooterColumn {
  heading: string;
  items: string[];
}

// Animation Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

// Icons
const IconBolt = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconChart = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const IconAlias = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconShield = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconLink = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

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
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconCheck = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Hamburger icon — two states handled by parent
const IconMenu = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconX = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Navbar
function Navbar() {
  const navItems: string[] = ["Features", "API", "Docs"];
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4.5"
        style={{
          background: "rgba(14,14,14,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(73,72,71,0.15)",
        }}
      >
        <span className="text-white font-bold text-[17px] tracking-tight">
          Shrtnr
        </span>

        {/* Desktop nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href="#"
              className="text-sm font-medium transition-colors duration-150"
              style={{
                color: i === 0 ? "#CBD5E1" : "#71717A",
                textDecoration: i === 0 ? "underline" : "none",
                textUnderlineOffset: "4px",
                textDecorationColor: "rgba(189,157,255,0.5)",
              }}
              whileHover={{ color: "#CBD5E1" }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Desktop auth — hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="#"
            className="text-sm font-medium text-[#71717A] hover:text-[#CBD5E1] transition-colors duration-150"
          >
            Login
          </motion.a>
          <motion.button
            whileHover={{ opacity: 0.9, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="px-4 py-1.75 text-sm font-medium text-white rounded-xl border"
            style={{
              background: "linear-gradient(135deg, #BD9DFF, #8A4CFC)",
              borderColor: "transparent",
              boxShadow: "0 0 20px rgba(189,157,255,0.15)",
            }}
          >
            Sign Up
          </motion.button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-150"
          style={{ color: "#71717A", background: "rgba(73,72,71,0.15)" }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <IconX /> : <IconMenu />}
        </button>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-15.25 left-0 right-0 z-40 flex flex-col px-4 pt-4 pb-6 gap-1 md:hidden"
            style={{
              background: "rgba(14,14,14,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(73,72,71,0.2)",
            }}
          >
            {navItems.map((item, i) => (
              <a
                key={item}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium py-3 px-2 rounded-lg transition-colors duration-150"
                style={{
                  color: i === 0 ? "#CBD5E1" : "#71717A",
                  borderBottom:
                    i < navItems.length - 1
                      ? "1px solid rgba(73,72,71,0.1)"
                      : "none",
                }}
              >
                {item}
              </a>
            ))}

            {/* Auth row inside mobile menu */}
            <div
              className="flex items-center gap-3 mt-4 pt-4"
              style={{ borderTop: "1px solid rgba(73,72,71,0.15)" }}
            >
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-sm font-medium text-center py-2.5 rounded-xl transition-colors duration-150"
                style={{ color: "#71717A", background: "rgba(73,72,71,0.15)" }}
              >
                Login
              </a>
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-sm font-medium text-center text-white py-2.5 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #BD9DFF, #8A4CFC)",
                  boxShadow: "0 0 20px rgba(189,157,255,0.15)",
                }}
              >
                Sign Up
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// URL Result Card
function UrlCard({ result }: { result: ShortUrl }) {
  const [copied, setCopied] = useState<boolean>(false);

  const shortUrl = `${import.meta.env.VITE_API_URL}/${result.short_code}`;

  const handleCopy = (): void => {
    navigator.clipboard.writeText(shortUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="w-full rounded-xl flex items-center justify-between px-4 py-3.5 mt-3"
      style={{ background: "#1A1919", border: "1px solid rgba(73,72,71,0.3)" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "rgba(189,157,255,0.12)", color: "#BD9DFF" }}
        >
          <IconLink />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {shortUrl}
          </p>
          <p className="text-xs truncate mt-0.5" style={{ color: "#71717A" }}>
            Redirects to:{" "}
            {result.long_url.replace(/^https?:\/\//, "").substring(0, 48)}
            {result.long_url.length > 55 ? "…" : ""}
          </p>
        </div>
      </div>
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg shrink-0 ml-4 transition-colors duration-150"
        style={{
          background: copied ? "rgba(34,197,94,0.1)" : "rgba(189,157,255,0.1)",
          color: copied ? "#4ADE80" : "#BD9DFF",
          border: `1px solid ${copied ? "rgba(74,222,128,0.2)" : "rgba(189,157,255,0.2)"}`,
        }}
      >
        {copied ? <IconCheck /> : <IconCopy />}
        {/* Hide label on very small screens, keep icon */}
        <span className="hidden xs:inline">{copied ? "Copied!" : "Copy"}</span>
        <span className="xs:hidden">{copied ? "!" : ""}</span>
      </motion.button>
    </motion.div>
  );
}

// Hero Section
function HeroSection() {
  const [inputUrl, setInputUrl] = useState<string>("");
  const { shorten, result, isPending, isError, error, reset } = useShortUrl();

  const handleShorten = (): void => {
    const trimmed = inputUrl.trim();
    if (!trimmed) return;
    reset();
    shorten(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleShorten();
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center pt-32 pb-20 px-4 sm:pt-40 sm:pb-30 sm:px-6 overflow-hidden"
      style={{ background: "#0E0E0E" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(189,157,255,0.06) 0%, transparent 70%)",
        }}
      />

      <h1
        className="font-mono font-bold leading-[1.08] tracking-[-0.03em] max-w-175"
        style={{ fontSize: "clamp(2rem, 7vw, 3.5rem)" }}
      >
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="block text-white"
        >
          Shorten your links,
        </motion.span>
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="block"
          style={{ color: "#BD9DFF" }}
        >
          broaden your reach
        </motion.span>
      </h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
        className="mt-4 sm:mt-5 text-[14px] sm:text-[15px] leading-relaxed max-w-sm sm:max-w-110 px-2 sm:px-0"
        style={{ color: "#71717A" }}
      >
        Optimize your online presence with high-performance link management.
        Built for speed, security, and precision analytics.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
        className="mt-8 sm:mt-10 w-full max-w-132.5"
      >
        {/* Input row — stacks on very small screens */}
        <div
          className="flex flex-col xs:flex-row items-stretch xs:items-center rounded-xl overflow-hidden p-1.25 gap-1.25 xs:gap-0"
          style={{
            background: "#161616",
            border: "1px solid rgba(73,72,71,0.35)",
          }}
        >
          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://your-extremely-long-url.com/analytics-dashboard/v1"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#3F3F46] text-[#CBD5E1] px-4 py-2.25 min-w-0"
          />
          <motion.button
            onClick={handleShorten}
            disabled={isPending || !inputUrl.trim()}
            whileHover={{ opacity: isPending ? 1 : 0.92 }}
            whileTap={{ scale: isPending ? 1 : 0.97 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="shrink-0 px-5 py-2.25 rounded-lg text-sm font-semibold text-white disabled:opacity-50 transition-opacity"
            style={{
              background: "linear-gradient(135deg, #BD9DFF, #8A4CFC)",
              boxShadow: "0 0 20px rgba(138,76,252,0.3)",
              minWidth: "88px",
            }}
          >
            {isPending ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white mx-auto"
              />
            ) : (
              "Shorten"
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isError && error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs mt-2 text-red-400 text-left px-1"
            >
              {error.message}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && <UrlCard result={result} />}
        </AnimatePresence>

        {/* Placeholder shown before any request is made */}
        <AnimatePresence>
          {!result && !isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full rounded-xl flex items-center justify-between px-4 py-3.5 mt-3"
              style={{
                background: "#141414",
                border: "1px solid rgba(73,72,71,0.2)",
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(73,72,71,0.3)", color: "#494847" }}
                >
                  <IconLink />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: "#BD9DFF" }}
                  >
                    shrtnr.dev/alpha-beta-99
                  </p>
                  <p
                    className="text-xs mt-0.5 truncate"
                    style={{ color: "#3F3F46" }}
                  >
                    Redirects to: google.com/search?q=very-long-query…
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg shrink-0 ml-4"
                style={{ background: "rgba(73,72,71,0.2)", color: "#494847" }}
              >
                <IconCopy />
                <span className="hidden xs:inline">Copy</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// Features Section
const features: FeatureItem[] = [
  {
    icon: <IconBolt />,
    title: "Fast Redirects",
    desc: "Global edge network ensures sub-50ms latency for every link clicked.",
  },
  {
    icon: <IconChart />,
    title: "Advanced Analytics",
    desc: "Real-time tracking of geolocation, devices, and referral sources.",
  },
  {
    icon: <IconAlias />,
    title: "Custom Aliases",
    desc: "Branded links that increase click-through rates by up to 34%.",
  },
  {
    icon: <IconShield />,
    title: "Enterprise Reliability",
    desc: "SLA-backed 99.99% uptime with 24/7 infrastructure monitoring.",
  },
];

function FeatureCard({ icon, title, desc, index }: FeatureCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      whileHover={{ y: -4, boxShadow: "0 0 64px rgba(189,157,255,0.07)" }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-xl p-6 flex flex-col gap-4"
      style={{ background: "#141414", border: "1px solid rgba(73,72,71,0.2)" }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ background: "rgba(189,157,255,0.1)", color: "#BD9DFF" }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-white mb-1.5">{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#71717A" }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="px-4 sm:px-6 py-16 sm:py-20"
      style={{ background: "#0A0A0A" }}
    >
      <div className="max-w-225 mx-auto">
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09 } },
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Workflow Section
const steps: WorkflowStep[] = [
  {
    num: "01",
    title: "Paste",
    desc: "Input your long URL into the terminal-styled input field.",
  },
  {
    num: "02",
    title: "Shorten",
    desc: "Our engine generates a unique, optimized hash for your link.",
  },
  {
    num: "03",
    title: "Track",
    desc: "Monitor performance metrics in your private dashboard.",
  },
];

function WorkflowSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="px-4 sm:px-6 py-20 sm:py-30"
      style={{ background: "#0E0E0E" }}
    >
      <div className="max-w-210 mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center font-mono font-bold text-[1.75rem] mb-12 sm:mb-16 tracking-[-0.02em]"
          style={{ color: "#CBD5E1" }}
        >
          System Workflow
        </motion.h2>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-10"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              custom={i}
              className="flex flex-col items-center text-center gap-5"
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.15 }}
                className="w-13 h-13 rounded-xl flex items-center justify-center font-mono font-bold text-sm text-white"
                style={{
                  background:
                    i === 1
                      ? "linear-gradient(135deg, #BD9DFF, #8A4CFC)"
                      : "#1A1919",
                  border: i !== 1 ? "1px solid rgba(73,72,71,0.4)" : "none",
                  boxShadow:
                    i === 1 ? "0 0 32px rgba(189,157,255,0.25)" : "none",
                }}
              >
                {step.num}
              </motion.div>
              <div>
                <h3 className="font-bold text-sm text-white mb-1.5">
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#71717A" }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Footer
const footerColumns: FooterColumn[] = [
  { heading: "Product", items: ["Features", "API"] },
  { heading: "Company", items: ["About", "Blog"] },
  { heading: "Resources", items: ["Documentation", "Status"] },
];

function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.footer
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="px-4 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10 sm:gap-8"
      style={{
        background: "#0E0E0E",
        borderTop: "1px solid rgba(73,72,71,0.18)",
      }}
    >
      <div>
        <span className="text-white font-bold text-[16px]">Shrtnr</span>
        <p
          className="text-[11px] tracking-widest mt-2"
          style={{ color: "#3F3F46" }}
        >
          © 2024 SHRTNR TERMINAL . BUILT FOR SPEED.
        </p>
      </div>

      {/* Footer columns — wrap on very small screens */}
      <div className="flex flex-wrap gap-x-10 gap-y-8 sm:gap-14">
        {footerColumns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <p
              className="text-[11px] font-semibold tracking-widest"
              style={{ color: "#494847" }}
            >
              {col.heading.toUpperCase()}
            </p>
            {col.items.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] tracking-[0.08em] transition-colors duration-150 hover:text-white"
                style={{ color: "#71717A" }}
              >
                {item.toUpperCase()}
              </a>
            ))}
          </div>
        ))}
      </div>
    </motion.footer>
  );
}

// Page
export default function ShrtnrLanding() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#0E0E0E",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <Footer />
    </div>
  );
}
