import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Plane, Mail, Lock } from "lucide-react";
import { useAppStore } from "@/app/store/useAppStore";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});
type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAppStore();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "alex@traveloop.com", password: "password123" },
  });

  const onSubmit = async (_data: LoginForm) => {
    await new Promise(r => setTimeout(r, 800));
    login({ id: "1", name: "Alex Chen", email: _data.email, avatar: null });
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-background">
      {/* Left panel — animated art */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, #0F0F0F 0%, #1a0533 40%, #2d0b6b 70%, #0F0F0F 100%)"
        }} />
        {/* Animated orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: 200 + i * 80,
              height: 200 + i * 80,
              background: i % 2 === 0
                ? "radial-gradient(circle, #7C3AED, transparent)"
                : "radial-gradient(circle, #A855F7, transparent)",
              left: `${10 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-2xl">Traveloop</span>
          </div>
          <h2 className="text-white text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            The world is<br />waiting for you.
          </h2>
          <p className="text-white/50 text-base leading-relaxed max-w-sm">
            Plan extraordinary journeys. Build cinematic itineraries. Travel with intention.
          </p>

          <div className="flex gap-3 mt-8">
            {["🗼 Tokyo", "🌊 Amalfi", "🌌 Iceland", "⛩️ Kyoto"].map((dest) => (
              <span
                key={dest}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-white/70"
                style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}
              >
                {dest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg text-white">Traveloop</span>
          </div>

          <h1 className="text-white text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-white/50 text-sm mb-8">Sign in to continue your journey</p>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[{ label: "Google", emoji: "G" }, { label: "Apple", emoji: "" }].map(({ label, emoji }) => (
              <motion.button
                key={label}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                whileHover={{ background: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.97 }}
                data-testid={`button-social-${label.toLowerCase()}`}
              >
                <span className="font-bold text-base">{emoji}</span>
                <span>Continue with {label}</span>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <span className="text-white/30 text-xs">or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-white/60 text-xs font-medium block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: errors.email ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.1)",
                  }}
                  placeholder="you@example.com"
                  data-testid="input-email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-white/60 text-xs font-medium block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: errors.password ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.1)",
                  }}
                  placeholder="••••••••"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-end">
              <button type="button" className="text-purple-400 text-xs hover:text-purple-300 transition-colors" data-testid="link-forgot-password">
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white gradient-purple transition-all disabled:opacity-60"
              whileHover={{ scale: 1.01, boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-login"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </motion.button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            No account?{" "}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors" data-testid="link-signup">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
