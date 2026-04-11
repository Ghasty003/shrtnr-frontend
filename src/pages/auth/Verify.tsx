import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { motion, AnimatePresence } from "motion/react";
import {
  AuthCard,
  PrimaryButton,
  C,
  fadeUp,
} from "@/components/auth/AuthShared";
import { useVerifyOtp } from "@/hooks/verifyOtp";
import { RateLimitError } from "@/lib/axios";

// Validation
const schema = z.object({
  otp: z.string().length(6, "Enter all 6 digits."),
});

type OTPForm = z.infer<typeof schema>;

// Icons
const IconMail = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={C.primary}
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconRefresh = () => (
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
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

// Terminal log block
function TerminalLog({
  status,
}: {
  status: "waiting" | "verifying" | "success" | "error";
}) {
  const messages: Record<typeof status, string> = {
    waiting: "Waiting for verification response from hyper-precision core...",
    verifying: "Dispatching OTP token to verification daemon...",
    success: "Identity confirmed. Routing to precision grid...",
    error: "Verification failed. Token mismatch detected.",
  };

  const dotColor: Record<typeof status, string> = {
    waiting: C.mutedDim,
    verifying: "#F59E0B",
    success: "#4ADE80",
    error: "#EF4444",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="w-full max-w-105 rounded-xl px-5 py-4 mt-5"
      style={{ background: "#0A0A0A", border: `1px solid ${C.border}` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: dotColor[status] }}
        />
        <span
          className="text-[11px] font-mono tracking-[0.12em] uppercase"
          style={{ color: C.mutedDim }}
        >
          Protocol: VOID_AUTH_V2.0
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={status}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="text-[12px] font-mono italic"
          style={{ color: C.mutedDim }}
        >
          {messages[status]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

// Page
// In a real app you'd read the email from router state:
// const location = useLocation(); const email = location.state?.email ?? "user@shrtnr.dev";

export default function VerifyPage() {
  const location = useLocation();
  const email: string = location.state?.email ?? "";

  const { verify, isPending, error, reset } = useVerifyOtp();
  const [terminalStatus, setTerminalStatus] = useState<
    "waiting" | "verifying" | "success" | "error"
  >("waiting");
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<OTPForm>({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
  });

  const onSubmit = (data: OTPForm) => {
    reset();
    setTerminalStatus("verifying");
    verify(
      { email, otp: data.otp },
      {
        onSuccess: () => {
          setTerminalStatus("success");
          setTimeout(() => navigate("/"), 800);
        },
        onError: (err) => {
          setTerminalStatus("error");
          if (err instanceof RateLimitError) {
            setResendCooldown(err.retryAfter as any);
            setError("otp", {
              message: `Too many attempts. Try again in ${err.retryAfter}.`,
            });
          } else {
            setError("otp", { message: err.message });
          }
        },
      },
    );
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    setTerminalStatus("waiting");
    // await resendOtp({ email }); — wire up when you add that endpoint
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between"
      style={{ background: C.bg }}
    >
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 w-full">
        <div className="w-full max-w-105">
          <AuthCard>
            {/* Mail icon badge */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex justify-center mb-6"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(189,157,255,0.1)",
                  border: `1px solid rgba(189,157,255,0.15)`,
                }}
              >
                <IconMail />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-center mb-6"
            >
              <h1 className="text-2xl font-bold text-white mb-3">
                Check your inbox
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                We've sent a 6-digit verification code to{" "}
                <span className="font-semibold" style={{ color: C.primary }}>
                  {email}
                </span>
                .<br />
                Enter it below to secure your account.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* OTP Input */}
              <motion.div
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                custom={2}
                className="flex justify-center mb-6"
              >
                <Controller
                  name="otp"
                  control={control}
                  render={({ field }) => (
                    <OtpInput
                      value={field.value}
                      onChange={field.onChange}
                      numInputs={6}
                      renderSeparator={<span className="w-2" />}
                      shouldAutoFocus
                      renderInput={(props) => (
                        <input
                          {...props}
                          className="text-xl font-mono font-bold text-center rounded-xl outline-none transition-all duration-150"
                          style={{
                            width: "46px",
                            height: "54px",
                            background: C.surfaceHigh,
                            color: C.white,
                            border: `1px solid ${errors.otp ? "#EF4444" : C.border}`,
                            caretColor: C.primary,
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = C.primary;
                            e.currentTarget.style.boxShadow = `0 0 0 3px rgba(189,157,255,0.15)`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = errors.otp
                              ? "#EF4444"
                              : C.border;
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      )}
                    />
                  )}
                />
              </motion.div>

              {(errors.otp || error) && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[12px] mb-4"
                  style={{
                    color:
                      error instanceof RateLimitError ? "#F59E0B" : "#EF4444",
                  }}
                >
                  {errors.otp?.message ??
                    (error instanceof RateLimitError
                      ? `Too many attempts. Try again in ${error.retryAfter}.`
                      : error?.message)}
                </motion.p>
              )}

              {/* Submit */}
              <motion.div
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <PrimaryButton type="submit" loading={isPending}>
                  {!isPending && (
                    <span className="tracking-widest text-[13px] font-bold">
                      VERIFY EMAIL &nbsp;→
                    </span>
                  )}
                </PrimaryButton>
              </motion.div>
            </form>

            {/* Resend */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={4}
              className="text-center mt-7"
            >
              <p
                className="text-[11px] tracking-[0.12em] uppercase mb-3"
                style={{ color: C.mutedDim }}
              >
                Didn't receive a code?
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="flex items-center gap-2 mx-auto text-sm font-semibold transition-all duration-150 disabled:opacity-50"
                style={{ color: C.primary }}
              >
                <motion.span
                  animate={isPending ? { rotate: 360 } : { rotate: 0 }}
                  transition={{
                    duration: 0.8,
                    repeat: isPending ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <IconRefresh />
                </motion.span>
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend Code"}
              </button>
            </motion.div>
          </AuthCard>

          {/* Terminal log */}
          <TerminalLog status={terminalStatus} />
        </div>
      </main>
    </div>
  );
}
