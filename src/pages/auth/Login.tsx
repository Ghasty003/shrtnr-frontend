import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  AuthCard,
  AuthFooter,
  FieldLabel,
  PrimaryButton,
  TextInput,
  C,
  fadeUp,
} from "@/components/auth/AuthShared";
import { useLogin } from "@/hooks/useLogin";
import { RateLimitError } from "@/lib/axios";
import Logo from "@/components/ui/Logo";

const schema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Access key is required."),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof schema>;

const IconAt = () => (
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
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);

const IconLock = ({ open }: { open: boolean }) =>
  open ? (
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  ) : (
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

function TerminalCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-3 group w-full text-left"
    >
      <div
        className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all duration-150"
        style={{
          background: checked ? "rgba(189,157,255,0.15)" : C.surfaceHigh,
          border: `1px solid ${checked ? C.primary : C.border}`,
        }}
      >
        {checked && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.primary}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        )}
      </div>
      <span
        className="text-[11px] font-semibold tracking-widest transition-colors duration-150"
        style={{ color: checked ? C.text : C.muted }}
      >
        {label}
      </span>
    </button>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login, isPending, error, reset } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data: LoginForm) => {
    reset();
    const deviceId = localStorage.getItem("deviceId") ?? undefined;
    login(
      { email: data.email, password: data.password, deviceId },
      {
        onSuccess: (res) => {
          if (res.data.requiresTwoFactor) {
            navigate("/auth/2fa", {
              state: { sessionKey: res.data.sessionKey, email: data.email },
            });
          } else {
            navigate("/dashboard");
          }
        },
      },
    );
  };

  const errorMessage = error
    ? error instanceof RateLimitError
      ? `Too many attempts. Try again in ${error.retryAfter}.`
      : error.message
    : null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.bg }}>
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-4 sm:px-10 py-5"
      >
        <Logo variant="full" size="md" />
      </motion.nav>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <h1
            className="font-mono font-black leading-[0.95] tracking-[-0.02em] uppercase"
            style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}
          >
            <span className="block text-white">Identity</span>
            <span className="block" style={{ color: C.primary }}>
              Verification
            </span>
          </h1>
          <p
            className="mt-4 text-[11px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: C.muted }}
          >
            Access the precision engine
          </p>
        </motion.div>

        {/* Card */}
        <div className="w-full max-w-sm sm:max-w-97.5">
          <AuthCard className="px-5 py-7 sm:px-7 sm:py-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
              noValidate
            >
              <motion.div
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <FieldLabel>UNIVERSAL IDENTIFIER</FieldLabel>
                <TextInput
                  type="email"
                  placeholder="name@domain.com"
                  {...register("email")}
                  error={errors.email?.message}
                  rightSlot={<IconAt />}
                />
              </motion.div>

              <motion.div
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <div className="flex items-center justify-between mb-2">
                  <FieldLabel>ACCESS KEY</FieldLabel>
                  <Link
                    to="#"
                    className="text-[11px] font-semibold tracking-widest transition-colors duration-150 hover:opacity-80"
                    style={{ color: C.primary }}
                  >
                    FORGOT KEY?
                  </Link>
                </div>
                <TextInput
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  error={errors.password?.message}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="transition-colors duration-150 hover:text-white"
                      tabIndex={-1}
                    >
                      <IconLock open={showPassword} />
                    </button>
                  }
                />
              </motion.div>

              <motion.div
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <TerminalCheckbox
                  label="PERSIST SESSION ON THIS TERMINAL"
                  checked={rememberMe}
                  onChange={() => setRememberMe((p) => !p)}
                />
              </motion.div>

              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[12px] text-center px-1"
                  style={{
                    color:
                      error instanceof RateLimitError ? "#F59E0B" : "#EF4444",
                  }}
                >
                  {errorMessage}
                </motion.p>
              )}

              <motion.div
                variants={fadeUp as any}
                initial="hidden"
                animate="visible"
                custom={3}
                className="mt-1"
              >
                <PrimaryButton type="submit" loading={isPending}>
                  {isPending ? "AUTHENTICATING..." : "ACCESS SYSTEM →"}
                </PrimaryButton>
              </motion.div>
            </form>
          </AuthCard>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-center mt-6 sm:mt-8"
          >
            <p
              className="text-[11px] tracking-[0.15em] uppercase mb-3"
              style={{ color: C.mutedDim }}
            >
              New to the precision grid?
            </p>
            <Link
              to="/auth/register"
              className="text-[12px] font-bold tracking-[0.15em] uppercase transition-colors duration-150 hover:opacity-80"
              style={{ color: C.white }}
            >
              Initialize new account
            </Link>
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
