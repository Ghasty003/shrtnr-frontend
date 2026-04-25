import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { getUser } from "@/lib/storage";
import CreateLinkModal from "@/components/modals/CreateLinkModal";
import LogoutModal from "@/components/modals/LogoutModal";
import Logo from "@/components/ui/Logo";
import {
  IconBarChart,
  IconGrid,
  IconLink,
  IconLogout,
  IconMenu,
  IconPlus,
  IconSearch,
  IconSettings,
  IconSupport,
} from "@/utils/icons";

const NAV_ITEMS = [
  { to: "/dashboard", label: "DASHBOARD", icon: <IconGrid /> },
  { to: "/dashboard/links", label: "MY LINKS", icon: <IconLink /> },
  { to: "/dashboard/analytics", label: "ANALYTICS", icon: <IconBarChart /> },
  { to: "/dashboard/settings", label: "SETTINGS", icon: <IconSettings /> },
] as const;

// Sidebar (desktop)

function Sidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <motion.aside
      initial={{ x: -192, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen w-48 flex flex-col z-20 bg-bg border-r border-border"
    >
      {/* ✅ Logo component — full variant with tagline fits the sidebar header */}
      <div className="px-5 pt-[22px] pb-8">
        <Logo variant="full" size="md" />
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
          onClick={onLogout}
          className="flex items-center gap-[10px] px-3 py-[9px] rounded-lg w-full text-left text-[11px] font-semibold tracking-[0.1em] text-muted transition-colors duration-150 hover:text-white"
        >
          <IconLogout />
          LOGOUT
        </button>
      </div>
    </motion.aside>
  );
}

// Mobile drawer

function MobileDrawer({
  open,
  onClose,
  onLogout,
  onCreateNew,
}: {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  onCreateNew: () => void;
}) {
  const user = getUser();
  const initial = (user?.username ?? "?")[0].toUpperCase();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-0 h-screen w-64 z-40 flex flex-col bg-bg border-r border-border lg:hidden"
          >
            {/* ✅ Logo component + user info */}
            <div className="px-5 pt-6 pb-5 border-b border-border">
              <div className="mb-5">
                <Logo variant="full" size="md" />
              </div>

              {/* User info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 [background:var(--gradient-primary)]">
                  {initial}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white leading-tight">
                    {user?.username ?? "—"}
                  </div>
                  <div className="text-[10px] font-semibold tracking-[0.12em] uppercase mt-[2px] text-muted">
                    FREE ACCOUNT
                  </div>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 flex flex-col gap-0.5 px-3 pt-3">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/dashboard"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-[10px] py-[10px] rounded-lg",
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

            {/* Create New */}
            <div className="px-3 pb-3">
              <button
                onClick={() => {
                  onCreateNew();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-bold text-white [background:var(--gradient-primary)] transition-opacity hover:opacity-90"
              >
                <IconPlus />
                Create New
              </button>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-0.5 px-3 pb-6 border-t border-border pt-3">
              <button className="flex items-center gap-[10px] px-3 py-[9px] rounded-lg w-full text-left text-[11px] font-semibold tracking-[0.1em] text-muted transition-colors duration-150 hover:text-white">
                <IconSupport />
                SUPPORT
              </button>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex items-center gap-[10px] px-3 py-[9px] rounded-lg w-full text-left text-[11px] font-semibold tracking-[0.1em] text-muted transition-colors duration-150 hover:text-white"
              >
                <IconLogout />
                LOGOUT
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// TopBar

function TopBar({
  onCreateNew,
  onMenuToggle,
}: {
  onCreateNew: () => void;
  onMenuToggle: () => void;
}) {
  const user = getUser();
  const initial = (user?.username ?? "?")[0].toUpperCase();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-10 flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-[14px] bg-bg border-b border-border"
    >
      {/* Hamburger — mobile/tablet only */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-muted hover:text-white hover:bg-surface-container-high transition-all duration-150 shrink-0"
      >
        <IconMenu />
      </button>

      {/* Search */}
      <div className="flex-1 flex items-center gap-3 px-4 py-[10px] rounded-xl bg-surface-container min-w-0">
        <span className="text-muted shrink-0">
          <IconSearch />
        </span>
        <input
          type="text"
          placeholder="Search links, aliases or destinations..."
          className="flex-1 bg-transparent text-[13px] outline-none text-white placeholder:text-muted min-w-0"
        />
      </div>

      {/* Create New — hidden on small screens */}
      <button
        onClick={onCreateNew}
        className="hidden sm:flex px-[18px] py-[10px] rounded-xl text-[13px] font-bold text-white tracking-wide whitespace-nowrap transition-opacity duration-150 hover:opacity-90 active:scale-[0.98] [background:var(--gradient-primary)]"
      >
        Create New
      </button>

      {/* Create icon button — small screens only */}
      <button
        onClick={onCreateNew}
        className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl text-white [background:var(--gradient-primary)] shrink-0"
      >
        <IconPlus />
      </button>

      {/* User — hidden on very small screens */}
      <div className="hidden sm:flex items-center gap-3 shrink-0">
        <div className="text-right hidden md:block">
          <div className="text-[13px] font-semibold text-white leading-tight">
            {user?.username ?? "—"}
          </div>
          <div className="text-[10px] font-semibold tracking-[0.12em] uppercase mt-[2px] text-muted">
            FREE ACCOUNT
          </div>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 [background:var(--gradient-primary)]">
          {initial}
        </div>
      </div>
    </motion.header>
  );
}

export default function DashboardLayout() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg overflow-x-hidden">
      {/* Desktop sidebar — visible lg and above */}
      <div className="hidden lg:block">
        <Sidebar onLogout={() => setShowLogoutModal(true)} />
      </div>

      {/* Mobile drawer */}
      <MobileDrawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onLogout={() => setShowLogoutModal(true)}
        onCreateNew={() => setShowCreateModal(true)}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-48 flex flex-col min-h-screen min-w-0">
        <TopBar
          onCreateNew={() => setShowCreateModal(true)}
          onMenuToggle={() => setMobileNavOpen((p) => !p)}
        />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateLinkModal onClose={() => setShowCreateModal(false)} />
        )}
        {showLogoutModal && (
          <LogoutModal onClose={() => setShowLogoutModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
