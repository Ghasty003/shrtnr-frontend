import { useState } from "react";
import { motion } from "motion/react";
import { useDisable2FA } from "@/hooks/useTwoFactor";
import { getUser, saveUser } from "@/lib/storage";
import Modal from "@/components/modals/Modal";

interface DisableTwoFAModalProps {
  onClose: () => void;
  onDisabled: () => void;
}

export default function DisableTwoFAModal({
  onClose,
  onDisabled,
}: DisableTwoFAModalProps) {
  const [token, setToken] = useState("");
  const { mutate: disable, isPending, error, reset } = useDisable2FA();

  const handleConfirm = () => {
    reset();
    disable(token, {
      onSuccess: () => {
        const user = getUser();
        if (user) saveUser({ ...user, twoFactorEnabled: false });
        onDisabled();
      },
    });
  };

  return (
    <Modal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md mx-4 rounded-2xl border border-border bg-surface-container p-7 shadow-2xl"
        >
          <div className="flex flex-col gap-5">
            {/* Warning header */}
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-[7px] flex items-center justify-center bg-red-500/15 shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f87171"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h2 className="text-[17px] font-bold text-white">
                  Disable Two-Factor Auth
                </h2>
              </div>
              <p className="text-[12.5px] text-muted leading-relaxed">
                This will remove the extra layer of security from your account.
                Enter your current authenticator code to confirm.
              </p>
            </div>

            {/* TOTP input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted">
                Authentication Code
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={token}
                onChange={(e) => {
                  setToken(e.target.value.replace(/\D/g, ""));
                  reset();
                }}
                placeholder="000000"
                className="w-full px-4 py-2.75 rounded-xl text-[15px] tracking-[0.4em] font-mono bg-surface-container-high text-white placeholder:text-muted/40 outline-none border border-transparent focus:border-red-500/60 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] transition-all duration-150"
                autoFocus
              />
              {error && (
                <p className="text-[11px] text-red-400">{error.message}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-muted bg-surface-container-high hover:text-white transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={token.length !== 6 || isPending}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-white bg-red-500/80 hover:bg-red-500 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPending ? "Disabling..." : "Disable 2FA"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Modal>
  );
}
