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

// Validation Schema
const schema = z
  .object({
    fullName: z.string().optional(),
    email: z.string().email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof schema>;

// Password Strength
function getStrength(password: string): {
  score: number; // 0–3
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const clampedScore = Math.min(score, 3) as 0 | 1 | 2 | 3;
  const map: Record<0 | 1 | 2 | 3, { label: string; color: string }> = {
    0: { label: "", color: "transparent" },
    1: { label: "WEAK SIGNAL", color: "#EF4444" },
    2: { label: "MODERATE ENTROPY", color: "#F59E0B" },
    3: { label: "STRONG ENTROPY", color: C.primary },
  };
  return { score: clampedScore, ...map[clampedScore] };
}

interface StrengthMeterProps {
  password: string;
}

function StrengthMeter({ password }: StrengthMeterProps) {
  const { score, label, color } = getStrength(password);
  if (!password) return null;

  return (
    <div className="mt-2.5">
      {/* Segmented bar */}
      <div className="flex gap-1.5 mb-2">
        {[1, 2, 3].map((seg) => (
          <motion.div
            key={seg}
            className="h-0.5 flex-1 rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: score >= seg ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ background: score >= seg ? color : C.border }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-semibold tracking-widest"
          style={{ color }}
        >
          {label}
        </span>
        <span className="text-[11px]" style={{ color: C.muted }}>
          8+ characters
        </span>
      </div>
    </div>
  );
}

// Eye Icon
const IconEye = ({ open }: { open: boolean }) =>
  open ? (
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
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
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (_data: RegisterForm) => {
    setIsLoading(true);
    try {
      // TODO: call register API
      // await registerUser({ email: data.email, password: data.password, fullName: data.fullName });
      navigate("/auth/verify");
    } catch {
      // handle API error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between"
      style={{ background: C.bg }}
    >
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center px-6 sm:px-10 py-5 w-full"
      >
        <span
          className="font-mono font-bold text-lg tracking-[0.18em]"
          style={{ color: C.primary }}
        >
          SHRTNR
        </span>
      </motion.nav>

      {/* Card */}
      <div className="w-full max-w-105 px-4 pb-10">
        <AuthCard>
          {/* Heading */}
          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-8"
          >
            <h1 className="text-[1.9rem] font-bold text-white leading-tight mb-2">
              Create account
            </h1>
            <p className="text-sm" style={{ color: C.muted }}>
              Deploy your links into the precision void.
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            noValidate
          >
            {/* Full Name */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <FieldLabel>FULL NAME (OPTIONAL)</FieldLabel>
              <TextInput
                placeholder="John Doe"
                {...register("fullName")}
                error={errors.fullName?.message}
              />
            </motion.div>

            {/* Email */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <FieldLabel>EMAIL ADDRESS</FieldLabel>
              <TextInput
                type="email"
                placeholder="precision@shrtnr.io"
                {...register("email")}
                error={errors.email?.message}
              />
            </motion.div>

            {/* Password */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <FieldLabel>PASSWORD</FieldLabel>
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
                    <IconEye open={showPassword} />
                  </button>
                }
              />
              <StrengthMeter password={passwordValue} />
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <FieldLabel>CONFIRM PASSWORD</FieldLabel>
              <TextInput
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />
            </motion.div>

            {/* Submit */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              custom={5}
              className="mt-2"
            >
              <PrimaryButton type="submit" loading={isLoading}>
                {!isLoading && <>Initialize Account &nbsp;→</>}
                {isLoading && "Initializing..."}
              </PrimaryButton>
            </motion.div>
          </form>

          {/* Login link */}
          <motion.p
            variants={fadeUp as any}
            initial="hidden"
            animate="visible"
            custom={6}
            className="text-sm text-center mt-8"
            style={{ color: C.muted }}
          >
            Already operational?{" "}
            <Link
              to="/auth/login"
              className="font-semibold transition-colors duration-150 hover:opacity-80"
              style={{ color: C.primary }}
            >
              Login here
            </Link>
          </motion.p>
        </AuthCard>
      </div>

      <AuthFooter left="© 2024 SHRTNR PRECISION SYSTEMS" />
    </div>
  );
}
