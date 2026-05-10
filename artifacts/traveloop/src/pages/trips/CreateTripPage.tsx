import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Check, Plane } from "lucide-react";
import { useAppStore } from "@/app/store/useAppStore";
import type { Trip } from "@/types";

const gradients = [
  { label: "Sakura", value: "from-rose-500 to-orange-400" },
  { label: "Ocean", value: "from-blue-500 to-cyan-400" },
  { label: "Jungle", value: "from-emerald-500 to-teal-400" },
  { label: "Desert", value: "from-amber-500 to-yellow-400" },
  { label: "Aurora", value: "from-violet-500 to-purple-400" },
  { label: "Sunset", value: "from-pink-500 to-rose-600" },
  { label: "Glacier", value: "from-sky-400 to-indigo-500" },
  { label: "Savanna", value: "from-orange-400 to-red-500" },
];

const emojiOptions = ["🗼", "🏖️", "🏔️", "🌴", "🕌", "⛩️", "🏛️", "🌌", "🌺", "🐪", "🦁", "🐧"];

const step1Schema = z.object({
  title: z.string().min(3, "Trip name is required"),
  destination: z.string().min(2, "Destination is required"),
});
const step2Schema = z.object({
  startDate: z.string().min(1, "Start date required"),
  endDate: z.string().min(1, "End date required"),
  budget: z.coerce.number().min(1, "Budget must be > 0"),
});
type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;

export default function CreateTripPage() {
  const [, setLocation] = useLocation();
  const { trips, setTrips } = useAppStore();
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1 | null>(null);
  const [step2Data, setStep2Data] = useState<Step2 | null>(null);
  const [selectedGradient, setSelectedGradient] = useState(gradients[0].value);
  const [selectedEmoji, setSelectedEmoji] = useState(emojiOptions[0]);

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema) });
  const form2 = useForm<Step2>({ resolver: zodResolver(step2Schema) });

  const handleStep1 = (data: Step1) => { setStep1Data(data); setStep(2); };
  const handleStep2 = (data: Step2) => { setStep2Data(data); setStep(3); };

  const handleFinish = () => {
    if (!step1Data || !step2Data) return;
    const newTrip: Trip = {
      id: `t${Date.now()}`,
      title: step1Data.title,
      destination: step1Data.destination,
      coverGradient: selectedGradient,
      coverEmoji: selectedEmoji,
      startDate: step2Data.startDate,
      endDate: step2Data.endDate,
      status: "planning",
      budget: { total: step2Data.budget, spent: 0, currency: "USD" },
    };
    setTrips([newTrip, ...trips]);
    setLocation("/trips");
  };

  const steps = ["Basic Info", "Dates & Budget", "Cover"];

  return (
    <div className="min-h-full p-6 md:p-8 flex flex-col items-center max-w-xl mx-auto">
      {/* Step progress */}
      <div className="w-full mb-10">
        <div className="flex items-center gap-0">
          {steps.map((label, i) => {
            const idx = i + 1;
            const done = step > idx;
            const active = step === idx;
            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      background: done ? "#10B981" : active ? "#7C3AED" : "rgba(255,255,255,0.1)",
                      color: done || active ? "white" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {done ? <Check className="w-4 h-4" /> : idx}
                  </div>
                  <span className="text-xs mt-1" style={{ color: active ? "white" : "rgba(255,255,255,0.3)" }}>{label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px mx-2 mt-[-14px]" style={{ background: step > idx ? "#7C3AED" : "rgba(255,255,255,0.1)" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" className="w-full" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <h2 className="text-white text-2xl font-bold mb-1">Name your adventure</h2>
            <p className="text-white/40 text-sm mb-6">Every great journey starts with a name</p>
            <form onSubmit={form1.handleSubmit(handleStep1)} className="space-y-4">
              <div>
                <label className="text-white/60 text-xs font-medium block mb-1.5">Trip Name</label>
                <input {...form1.register("title")} placeholder="e.g. Summer in Santorini"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: form1.formState.errors.title ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.1)" }}
                  data-testid="input-trip-title" />
                {form1.formState.errors.title && <p className="text-red-400 text-xs mt-1">{form1.formState.errors.title.message}</p>}
              </div>
              <div>
                <label className="text-white/60 text-xs font-medium block mb-1.5">Destination</label>
                <input {...form1.register("destination")} placeholder="e.g. Greece"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: form1.formState.errors.destination ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.1)" }}
                  data-testid="input-trip-destination" />
                {form1.formState.errors.destination && <p className="text-red-400 text-xs mt-1">{form1.formState.errors.destination.message}</p>}
              </div>
              <motion.button type="submit" className="w-full py-3 rounded-xl gradient-purple text-white text-sm font-semibold flex items-center justify-center gap-2 mt-2"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} data-testid="button-step1-next">
                Continue <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" className="w-full" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <h2 className="text-white text-2xl font-bold mb-1">When and how much?</h2>
            <p className="text-white/40 text-sm mb-6">Set your travel dates and budget</p>
            <form onSubmit={form2.handleSubmit(handleStep2)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-xs font-medium block mb-1.5">Start Date</label>
                  <input {...form2.register("startDate")} type="date"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", colorScheme: "dark" }}
                    data-testid="input-start-date" />
                </div>
                <div>
                  <label className="text-white/60 text-xs font-medium block mb-1.5">End Date</label>
                  <input {...form2.register("endDate")} type="date"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", colorScheme: "dark" }}
                    data-testid="input-end-date" />
                </div>
              </div>
              <div>
                <label className="text-white/60 text-xs font-medium block mb-1.5">Total Budget (USD)</label>
                <input {...form2.register("budget")} type="number" placeholder="5000"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  data-testid="input-budget" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  data-testid="button-step2-back">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <motion.button type="submit" className="flex-1 py-3 rounded-xl gradient-purple text-white text-sm font-semibold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} data-testid="button-step2-next">
                  Continue <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" className="w-full" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <h2 className="text-white text-2xl font-bold mb-1">Pick a cover</h2>
            <p className="text-white/40 text-sm mb-6">Choose a gradient and emoji for your trip</p>

            {/* Preview */}
            <div className={`rounded-2xl h-32 mb-6 bg-gradient-to-br ${selectedGradient} flex items-end p-4 relative`}>
              <div className="absolute inset-0 bg-black/20 rounded-2xl" />
              <div className="relative z-10">
                <p className="text-white/60 text-xs">{step1Data?.destination}</p>
                <h3 className="text-white font-bold">{selectedEmoji} {step1Data?.title}</h3>
              </div>
            </div>

            {/* Gradients */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {gradients.map(g => (
                <button key={g.value} onClick={() => setSelectedGradient(g.value)}
                  className={`h-12 rounded-xl bg-gradient-to-br ${g.value} transition-all relative`}
                  style={{ outline: selectedGradient === g.value ? "2px solid #A855F7" : "none", outlineOffset: 2 }}
                  data-testid={`gradient-${g.label.toLowerCase()}`} />
              ))}
            </div>

            {/* Emojis */}
            <div className="grid grid-cols-6 gap-2 mb-6">
              {emojiOptions.map(e => (
                <button key={e} onClick={() => setSelectedEmoji(e)}
                  className="h-10 rounded-xl text-xl flex items-center justify-center transition-all"
                  style={{
                    background: selectedEmoji === e ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
                    border: selectedEmoji === e ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  }}
                  data-testid={`emoji-${e}`}>{e}</button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                data-testid="button-step3-back">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <motion.button onClick={handleFinish}
                className="flex-1 py-3 rounded-xl gradient-purple text-white text-sm font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} data-testid="button-create-trip">
                <Plane className="w-4 h-4" /> Create Trip
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
