import { motion } from "motion/react";
import Modal from "@/components/modals/Modal";
import { useLogout } from "@/hooks/useLogout";

interface LogoutModalProps {
  onClose: () => void;
}

const IconMonitor = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const IconDevices = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="14" height="10" rx="2" />
    <rect x="14" y="8" width="8" height="10" rx="1" />
    <line x1="6" y1="13" x2="6" y2="16" />
    <line x1="4" y1="16" x2="8" y2="16" />
  </svg>
);

export default function LogoutModal({ onClose }: LogoutModalProps) {
  const { logoutOne, logoutAll, isPending } = useLogout();

  return (
    <Modal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-sm mx-4 rounded-2xl border border-border bg-surface-container p-7 shadow-2xl"
        >
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-[17px] font-bold text-white mb-1">Sign out</h2>
            <p className="text-[12.5px] text-muted leading-relaxed">
              Choose whether to sign out of this device only or all devices
              where you're currently logged in.
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3 mb-5">
            <button
              onClick={() => logoutOne()}
              disabled={isPending}
              className="flex items-start gap-4 px-4 py-4 rounded-xl border border-border bg-surface-container-high hover:border-primary/40 hover:bg-primary/5 transition-all duration-150 text-left disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-primary/10 text-primary mt-0.5">
                <IconMonitor />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white mb-0.5 group-hover:text-primary transition-colors duration-150">
                  This device only
                </p>
                <p className="text-[11.5px] text-muted leading-relaxed">
                  Stay signed in on your other devices.
                </p>
              </div>
            </button>

            <button
              onClick={() => logoutAll()}
              disabled={isPending}
              className="flex items-start gap-4 px-4 py-4 rounded-xl border border-border bg-surface-container-high hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-150 text-left disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-red-500/10 text-red-400 mt-0.5">
                <IconDevices />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white mb-0.5 group-hover:text-red-400 transition-colors duration-150">
                  All devices
                </p>
                <p className="text-[11.5px] text-muted leading-relaxed">
                  Sign out everywhere, including other browsers and apps.
                </p>
              </div>
            </button>
          </div>

          {/* Cancel */}
          <button
            onClick={onClose}
            disabled={isPending}
            className="w-full py-2.5 rounded-xl text-[13px] font-bold text-muted bg-surface-container-high hover:text-white transition-colors duration-150 disabled:opacity-50"
          >
            Cancel
          </button>
        </motion.div>
      </div>
    </Modal>
  );
}
