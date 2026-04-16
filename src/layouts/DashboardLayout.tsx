import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

// Icons
const IconGrid = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const IconLink = () => (
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
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconBarChart = () => (
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
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconSettings = () => (
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
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconSupport = () => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
  </svg>
);

const IconLogout = () => (
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
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const IconSearch = () => (
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// Nav config
const NAV_ITEMS = [
  { to: "/dashboard", label: "DASHBOARD", icon: <IconGrid /> },
  { to: "/dashboard/links", label: "MY LINKS", icon: <IconLink /> },
  { to: "/dashboard/analytics", label: "ANALYTICS", icon: <IconBarChart /> },
  { to: "/dashboard/settings", label: "SETTINGS", icon: <IconSettings /> },
] as const;

// Sidebar
function Sidebar() {
  const navigate = useNavigate();

  return (
    <motion.aside
      initial={{ x: -192, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen w-48 flex flex-col z-20 bg-bg"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 pt-[22px] pb-8">
        <div className="w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0 [background:var(--gradient-primary)]">
          <svg width="16" height="10" viewBox="0 0 32 16" fill="none">
            <path
              d="M16 8C13 4.5 10 2 6 2a6 6 0 0 0 0 12c4 0 7-3.5 10-6z"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M16 8c3 3.5 6 6 10 6a6 6 0 0 0 0-12c-4 0-7 3.5-10 6z"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div className="text-white font-bold text-[15px] leading-none tracking-wide">
            Shrtnr
          </div>
          <div className="text-[9px] font-semibold tracking-[0.15em] uppercase mt-[3px] text-muted">
            PRECISION VOID
          </div>
        </div>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className={({ isActive }) =>
              [
                "flex items-center gap-[10px] py-[9px] rounded-lg",
                "text-[11px] font-semibold tracking-[0.1em] no-underline",
                "border-l-2 transition-all duration-150",
                isActive
                  ? "text-white bg-primary/7 border-primary pl-[10px] pr-3"
                  : "text-muted border-transparent pl-3 pr-3 hover:text-white",
              ].join(" ")
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer nav */}
      <div className="flex flex-col gap-0.5 px-3 pb-6">
        <button className="flex items-center gap-[10px] px-3 py-[9px] rounded-lg w-full text-left text-[11px] font-semibold tracking-[0.1em] text-muted transition-colors duration-150 hover:text-white">
          <IconSupport />
          SUPPORT
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/auth/login");
          }}
          className="flex items-center gap-[10px] px-3 py-[9px] rounded-lg w-full text-left text-[11px] font-semibold tracking-[0.1em] text-muted transition-colors duration-150 hover:text-white"
        >
          <IconLogout />
          LOGOUT
        </button>
      </div>
    </motion.aside>
  );
}

// TopBar
function TopBar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-10 flex items-center gap-4 px-8 py-[14px] bg-bg"
    >
      {/* Search */}
      <div className="flex-1 flex items-center gap-3 px-4 py-[10px] rounded-xl bg-surface-container">
        <span className="text-muted">
          <IconSearch />
        </span>
        <input
          type="text"
          placeholder="Search links, aliases or destinations..."
          className="flex-1 bg-transparent text-[13px] outline-none text-white placeholder:text-muted"
        />
      </div>

      {/* Create New */}
      <button className="px-[18px] py-[10px] rounded-xl text-[13px] font-bold text-white tracking-wide whitespace-nowrap transition-opacity duration-150 hover:opacity-90 active:scale-[0.98] [background:var(--gradient-primary)]">
        Create New
      </button>

      {/* User */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-[13px] font-semibold text-white leading-tight">
            Alex Rivera
          </div>
          <div className="text-[10px] font-semibold tracking-[0.12em] uppercase mt-[2px] text-muted">
            PRO ACCOUNT
          </div>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 [background:var(--gradient-primary)]">
          A
        </div>
      </div>
    </motion.header>
  );
}

// Layout
export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 ml-48 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
