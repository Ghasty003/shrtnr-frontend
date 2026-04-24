import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { motion, AnimatePresence } from "motion/react";
import {
  AuthCard,
  AuthFooter,
  PrimaryButton,
  C,
  fadeUp,
} from "@/components/auth/AuthShared";
import { useVerify2FA } from "@/hooks/useTwoFactor";
import {
  IconArrowLeft,
  IconClock,
  IconQuestion,
  IconShieldLock,
} from "@/utils/icons";

const PENDING_TTL = 60 * 5;

const schema = z.object({
  token: z.string().min(6, "Enter all 6 digits."),
});

type TwoFAForm = z.infer<typeof schema>;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function TwoFAVerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionKey: string = location.state?.sessionKey ?? "";

  const [timeLeft, setTimeLeft] = useState(PENDING_TTL);
  const [expired, setExpired] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);

  // useVerify2FA onSuccess now handles all storage — saveUser, localStorage, axios header
  const { mutate: verify2FA, isPending, error, reset } = useVerify2FA();

  useEffect(() => {
    if (!sessionKey) navigate("/auth/login", { replace: true });
  }, [sessionKey]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<TwoFAForm>({
    resolver: zodResolver(schema),
    defaultValues: { token: "" },
  });

  const onSubmit = (data: TwoFAForm) => {
    if (expired) return;
    reset();
    verify2FA(
      { sessionKey, token: data.token },
      {
        onSuccess: () => {
          // Storage is handled in useVerify2FA.onSuccess — just navigate
          navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
          setError("token", { message: err.message });
        },
      },
    );
  };

  const isExpiredOrError = expired || !!errors.token || !!error;

  // OTP input cell size — smaller on mobile
  const cellSize = {
    width: "clamp(38px, 11vw, 48px)",
    height: "clamp(44px, 13vw, 56px)",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.bg }}>
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-4 sm:px-10 py-5"
      >
        <span
          className="font-mono font-bold text-lg tracking-[0.18em]"
          style={{ color: C.primary }}
        >
          SHRTNR
        </span>
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#"
            className="text-[13px] font-medium transition-opacity hover:opacity-70"
            style={{ color: C.muted }}
          >
            Support
          </a>
          <a
            href="#"
            className="text-[13px] font-medium transition-opacity hover:opacity-70"
            style={{ color: C.muted }}
          >
            Docs
          </a>
        </div>
      </motion.nav>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-10">
        <div className="w-full max-w-sm sm:max-w-md flex flex-col gap-4">
          <AuthCard className="px-5 py-8 sm:px-8 sm:py-10">
            {/* Icon */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex justify-center mb-6"
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(189,157,255,0.1)",
                  border: "1px solid rgba(189,157,255,0.15)",
                }}
              >
                <IconShieldLock />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-center mb-6 sm:mb-7"
            >
              <h1 className="text-[24px] sm:text-[28px] font-black text-white mb-2 tracking-tight">
                Verification
              </h1>
              <p
                className="text-[13px] sm:text-[13.5px] leading-relaxed"
                style={{ color: C.muted }}
              >
                {showRecovery
                  ? "Enter one of your backup recovery codes."
                  : "Enter the code from your authenticator app"}
              </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* OTP input */}
              <motion.div
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                custom={2}
                className="flex justify-center mb-5"
              >
                <Controller
                  name="token"
                  control={control}
                  render={({ field }) => (
                    <OtpInput
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        reset();
                      }}
                      numInputs={6}
                      renderSeparator={<span className="w-1.5 sm:w-2" />}
                      shouldAutoFocus
                      renderInput={(props) => (
                        <input
                          {...props}
                          className="text-lg sm:text-xl font-mono font-bold text-center rounded-xl outline-none transition-all duration-150"
                          style={{
                            ...cellSize,
                            background: C.surfaceHigh,
                            color: isExpiredOrError ? "#EF4444" : C.white,
                            border: `1px solid ${isExpiredOrError ? "#EF4444" : C.border}`,
                            caretColor: C.primary,
                          }}
                          onFocus={(e) => {
                            if (isExpiredOrError) return;
                            e.currentTarget.style.borderColor = C.primary;
                            e.currentTarget.style.boxShadow =
                              "0 0 0 3px rgba(189,157,255,0.15)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = isExpiredOrError
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

              {/* Error / expired */}
              <div className="min-h-5 mb-4 text-center">
                <AnimatePresence mode="wait">
                  {expired ? (
                    <motion.p
                      key="expired"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[12px]"
                      style={{ color: "#F59E0B" }}
                    >
                      Session expired. Please log in again.
                    </motion.p>
                  ) : errors.token || error ? (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[12px]"
                      style={{ color: "#EF4444" }}
                    >
                      {errors.token?.message ?? error?.message}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Countdown */}
              {!expired && (
                <motion.div
                  variants={fadeUp as any}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  className="flex items-center justify-center gap-1.5 mb-5 sm:mb-6"
                  style={{ color: C.mutedDim }}
                >
                  <IconClock />
                  <span className="text-[11px] font-semibold tracking-[0.12em] uppercase">
                    Code expires in{" "}
                    <span
                      className="font-mono"
                      style={{ color: timeLeft < 60 ? "#F59E0B" : C.mutedDim }}
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </span>
                </motion.div>
              )}

              {/* Submit */}
              <motion.div
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                custom={4}
                className="mb-5"
              >
                <PrimaryButton
                  type="submit"
                  loading={isPending}
                  disabled={expired}
                >
                  {isPending ? "VERIFYING..." : "Verify Identity"}
                </PrimaryButton>
              </motion.div>
            </form>

            {/* Toggle recovery */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={5}
              className="text-center mb-4"
            >
              <button
                type="button"
                onClick={() => {
                  setShowRecovery((p) => !p);
                  reset();
                }}
                className="text-[11px] font-semibold tracking-[0.12em] uppercase transition-opacity hover:opacity-70"
                style={{ color: C.mutedDim }}
              >
                {showRecovery
                  ? "Use authenticator app instead"
                  : "Request a new code"}
              </button>
            </motion.div>

            {/* Back to login */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={6}
              className="text-center"
            >
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase transition-opacity hover:opacity-70"
                style={{ color: C.mutedDim }}
              >
                <IconArrowLeft />
                Back to login
              </Link>
            </motion.div>
          </AuthCard>

          {/* Lost device hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl px-4 py-4 sm:px-5 flex items-start gap-3 sm:gap-4"
            style={{
              background: C.surfaceHigh,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "rgba(189,157,255,0.1)" }}
            >
              <IconQuestion />
            </div>
            <div>
              <p className="text-[13px] font-bold text-white mb-1">
                Lost access to your device?
              </p>
              <p
                className="text-[12px] leading-relaxed"
                style={{ color: C.muted }}
              >
                Use your backup recovery codes or contact our precision support
                systems for immediate account restoration.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <AuthFooter
        left="© 2024 SHRTNR PRECISION SYSTEMS"
        // links={[
        //   { label: "STATUS", href: "#" },
        //   { label: "PRIVACY", href: "#" },
        //   { label: "TERMS", href: "#" },
        //   { label: "API", href: "#" },
        // ]}
      />
    </div>
  );
}
