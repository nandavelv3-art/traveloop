import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { Plane, User, Mail, Lock } from "lucide-react";
import { useAppStore } from "@/app/store/useAppStore";

const signupSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});
type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const { login } = useAppStore();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    await new Promise(r => setTimeout(r, 800));
    login({ id: "1", name: data.name, email: data.email, avatar: null });
    setLocation("/dashboard");
  };

  const fields = [
    { name: "name" as const, label: "Full Name", type: "text", placeholder: "Alex Chen", icon: User },
    { name: "email" as const, label: "Email", type: "email", placeholder: "you@example.com", icon: Mail },
    { name: "password" as const, label: "Password", type: "password", placeholder: "••••••••", icon: Lock },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Background orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10 pointer-events-none"
          style={{
            width: 300 + i * 100,
            height: 300 + i * 100,
            background: "radial-gradient(circle, #7C3AED, transparent)",
            left: `${i * 30}%`,
            top: `${i * 20}%`,
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity }}
        />
      ))}

      <motion.div
        className="w-full max-w-sm relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-9 h-9 rounded-xl gradient-purple flex items-center justify-center">
            <Plane className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl text-white">Traveloop</span>
        </div>

        <div
          className="p-8 rounded-3xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
        >
          <h1 className="text-white text-2xl font-bold mb-1 text-center">Create your account</h1>
          <p className="text-white/40 text-sm mb-7 text-center">Start planning extraordinary trips</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map(({ name, label, type, placeholder, icon: Icon }) => (
              <div key={name}>
                <label className="text-white/60 text-xs font-medium block mb-1.5">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    {...register(name)}
                    type={type}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: errors[name] ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.1)",
                    }}
                    placeholder={placeholder}
                    data-testid={`input-${name}`}
                  />
                </div>
                {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]?.message}</p>}
              </div>
            ))}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white gradient-purple mt-2 disabled:opacity-60"
              whileHover={{ scale: 1.01, boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-signup"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </motion.button>
          </form>

          <p className="text-center text-white/40 text-sm mt-5">
            Have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300" data-testid="link-login">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
