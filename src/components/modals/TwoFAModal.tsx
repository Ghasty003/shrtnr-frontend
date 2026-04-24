import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { use2FASetup, useEnable2FA } from "@/hooks/useTwoFactor";
import { getUser, saveUser } from "@/lib/storage";
import Modal from "@/components/modals/Modal";

interface TwoFAModalProps {
  onClose: () => void;
  onEnabled: () => void;
}

type Step = "qr" | "codes";

export default function TwoFAModal({ onClose, onEnabled }: TwoFAModalProps) {
  const [step, setStep] = useState<Step>("qr");
  const [token, setToken] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const { data: setupData, isLoading: isLoadingQR } = use2FASetup(true);
  const { mutate: enable, isPending, error, reset } = useEnable2FA();

  const handleConfirm = () => {
    reset();
    enable(token, {
      onSuccess: (data) => {
        const user = getUser();
        if (user) saveUser({ ...user, twoFactorEnabled: true });
        setRecoveryCodes(data.data.recoveryCodes);
        setStep("codes");
      },
    });
  };

  const handleCopyCodes = () => {
    navigator.clipboard.writeText(recoveryCodes.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <AnimatePresence mode="wait">
            {step === "qr" ? (
              <motion.div
                key="qr"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <h2 className="text-[17px] font-bold text-white mb-1">
                    Enable Two-Factor Auth
                  </h2>
                  <p className="text-[12.5px] text-muted leading-relaxed">
                    Scan the QR code with your authenticator app, then enter the
                    6-digit code to confirm.
                  </p>
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  {isLoadingQR ? (
                    <div className="w-48 h-48 rounded-xl bg-surface-container-high animate-pulse" />
                  ) : setupData?.data.qrDataUrl ? (
                    <img
                      src={setupData.data.qrDataUrl}
                      alt="2FA QR Code"
                      className="w-48 h-48 rounded-xl"
                    />
                  ) : null}
                </div>

                {/* Manual entry key */}
                {setupData?.data.secret && (
                  <div className="rounded-xl bg-surface-container-high px-4 py-3">
                    <p className="text-[10.5px] font-semibold tracking-widest uppercase text-muted mb-1.5">
                      Manual entry key
                    </p>
                    <p className="font-mono text-[13px] text-white tracking-widest break-all">
                      {setupData.data.secret}
                    </p>
                  </div>
                )}

                {/* TOTP input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted">
                    Confirmation Code
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
                    className="w-full px-4 py-2.75 rounded-xl text-[15px] tracking-[0.4em] font-mono bg-surface-container-high text-white placeholder:text-muted/40 outline-none border border-transparent focus:border-primary focus:shadow-[0_0_0_3px_rgba(189,157,255,0.1)] transition-all duration-150"
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
                    className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-white [background:var(--gradient-primary)] transition-opacity duration-150 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isPending ? "Verifying..." : "Confirm →"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="codes"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <h2 className="text-[17px] font-bold text-white mb-1">
                    Save your recovery codes
                  </h2>
                  <p className="text-[12.5px] text-muted leading-relaxed">
                    Store these somewhere safe. Each code can only be used once
                    if you lose access to your authenticator app.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-xl bg-surface-container-high p-4">
                  {recoveryCodes.map((code) => (
                    <p
                      key={code}
                      className="font-mono text-[12.5px] text-white tracking-widest"
                    >
                      {code}
                    </p>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCopyCodes}
                    className="flex-1 py-2.5 rounded-xl text-[13px] font-bold bg-surface-container-high transition-colors duration-150 hover:text-white"
                    style={{ color: copied ? "#4ADE80" : undefined }}
                  >
                    {copied ? "Copied!" : "Copy codes"}
                  </button>
                  <button
                    onClick={onEnabled}
                    className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-white [background:var(--gradient-primary)] hover:opacity-90 transition-opacity duration-150"
                  >
                    Done →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Modal>
  );
}
