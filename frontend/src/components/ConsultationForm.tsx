"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Globe,
  Smartphone,
  Bot,
  Workflow,
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Loader2,
  DollarSign,
  Clock,
  Users,
  Target,
} from "lucide-react";

/* ── Types ── */

type ProjectType = "web_app" | "mobile_app" | "automation" | "ai_agents" | "";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: ProjectType;
  projectName: string;
  projectDescription: string;
  targetAudience: string;
  keyFeatures: string;
  existingSolution: string;
  budget: string;
  timeline: string;
  teamSize: string;
  additionalNotes: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  projectType: "",
  projectName: "",
  projectDescription: "",
  targetAudience: "",
  keyFeatures: "",
  existingSolution: "",
  budget: "",
  timeline: "",
  teamSize: "",
  additionalNotes: "",
};

const projectTypes = [
  {
    value: "web_app" as ProjectType,
    label: "Web Application",
    icon: Globe,
    description: "Websites, dashboards, SaaS platforms, portals",
    gradient: "from-cyan-500 to-blue-600",
    accent: "#06b6d4",
  },
  {
    value: "mobile_app" as ProjectType,
    label: "Mobile App",
    icon: Smartphone,
    description: "iOS, Android, or cross-platform mobile apps",
    gradient: "from-violet-500 to-purple-600",
    accent: "#8b5cf6",
  },
  {
    value: "automation" as ProjectType,
    label: "Automation",
    icon: Workflow,
    description: "Workflow automation, API integrations, process optimization",
    gradient: "from-orange-500 to-red-600",
    accent: "#f97316",
  },
  {
    value: "ai_agents" as ProjectType,
    label: "AI & Agents",
    icon: Bot,
    description: "AI chatbots, LLM integration, intelligent agents",
    gradient: "from-emerald-500 to-teal-600",
    accent: "#10b981",
  },
];

const budgetOptions = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
  "Not sure yet",
];

const timelineOptions = [
  "Less than 1 month",
  "1 - 3 months",
  "3 - 6 months",
  "6 - 12 months",
  "12+ months",
  "Flexible",
];

const teamSizeOptions = [
  "Just me",
  "2 - 5 people",
  "6 - 20 people",
  "21 - 100 people",
  "100+ people",
];

/* ── Component ── */

export default function ConsultationForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const totalSteps = 4;

  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      case 1:
        return formData.projectType !== "";
      case 2:
        return (
          formData.projectDescription.trim() !== "" &&
          formData.keyFeatures.trim() !== ""
        );
      case 3:
        return formData.budget !== "" && formData.timeline !== "";
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (step < totalSteps - 1 && canProceed()) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const getAiSuggestion = async () => {
    if (!formData.projectDescription.trim()) return;
    setIsLoadingAi(true);
    setAiSuggestion("");

    try {
      const projectLabel =
        projectTypes.find((p) => p.value === formData.projectType)?.label ||
        formData.projectType;

      const res = await fetch("/api/ai-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType: projectLabel,
          projectDescription: formData.projectDescription,
          targetAudience: formData.targetAudience,
          keyFeatures: formData.keyFeatures,
          existingSolution: formData.existingSolution,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAiSuggestion(
          data.error || "Unable to generate suggestions right now. Don\u2019t worry \u2014 our team will review your project details and provide personalized recommendations."
        );
        return;
      }

      setAiSuggestion(data.suggestion);
    } catch {
      setAiSuggestion(
        "Unable to generate suggestions right now. Don\u2019t worry \u2014 our team will review your project details and provide personalized recommendations."
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          projectType: formData.projectType,
          projectName: formData.projectName,
          projectDescription: formData.projectDescription,
          targetAudience: formData.targetAudience,
          keyFeatures: formData.keyFeatures,
          existingSolution: formData.existingSolution,
          budget: formData.budget,
          timeline: formData.timeline,
          teamSize: formData.teamSize,
          additionalNotes: formData.additionalNotes,
          aiSuggestion: aiSuggestion || undefined,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles =
    "w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600";

  const selectedType = projectTypes.find((p) => p.value === formData.projectType);

  /* ── Step Renderers ── */

  const renderStep0 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-bold mb-2">Tell us about yourself</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Basic information so we can get back to you.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={inputStyles}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputStyles}
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Company / Organization</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
            className={inputStyles}
            placeholder="Acme Inc."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone / WhatsApp</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={inputStyles}
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-bold mb-2">What type of project?</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Select the category that best fits your project.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projectTypes.map((pt) => {
          const Icon = pt.icon;
          const isSelected = formData.projectType === pt.value;
          return (
            <button
              key={pt.value}
              type="button"
              onClick={() => updateField("projectType", pt.value)}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                isSelected
                  ? "border-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                  : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/[0.02]"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <CheckCircle className="w-5 h-5 text-cyan-500" />
                </div>
              )}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${pt.gradient}`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-heading font-bold mb-1">{pt.label}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {pt.description}
              </p>
            </button>
          );
        })}
      </div>
      {formData.projectType && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Project Name <span className="text-slate-400">(optional)</span>
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => updateField("projectName", e.target.value)}
            className={inputStyles}
            placeholder="e.g. MyApp, Client Portal, Sales Bot"
          />
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-bold mb-2">Project Details</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Help us understand what you&apos;re looking to build.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Describe your project <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.projectDescription}
          onChange={(e) => updateField("projectDescription", e.target.value)}
          rows={4}
          className={`${inputStyles} resize-none`}
          placeholder="What problem does this project solve? What is the core idea? Describe the main purpose and goals..."
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          <Target className="w-4 h-4 text-cyan-500" />
          Target Audience
        </label>
        <input
          type="text"
          value={formData.targetAudience}
          onChange={(e) => updateField("targetAudience", e.target.value)}
          className={inputStyles}
          placeholder="e.g. Small businesses, healthcare professionals, students, general consumers..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Key Features & Functionalities <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.keyFeatures}
          onChange={(e) => updateField("keyFeatures", e.target.value)}
          rows={4}
          className={`${inputStyles} resize-none`}
          placeholder="List the must-have features, e.g.&#10;- User authentication & roles&#10;- Dashboard with analytics&#10;- Payment integration&#10;- Real-time notifications"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Do you have an existing solution?
        </label>
        <input
          type="text"
          value={formData.existingSolution}
          onChange={(e) => updateField("existingSolution", e.target.value)}
          className={inputStyles}
          placeholder="e.g. We currently use spreadsheets, an old website, a competitor's tool, nothing yet..."
        />
      </div>

      {/* AI Suggestion — always visible */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/[0.05] to-cyan-500/[0.05] border border-violet-500/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-heading font-bold">AI Project Insights</span>
          </div>
          <button
            type="button"
            onClick={getAiSuggestion}
            disabled={isLoadingAi || formData.projectDescription.trim().length < 10}
            className="text-xs px-3 py-1.5 rounded-full bg-violet-500/10 hover:bg-violet-500/20 text-violet-600 dark:text-violet-400 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingAi ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="w-3 h-3 animate-spin" />
                Analyzing...
              </span>
            ) : aiSuggestion ? (
              "Regenerate"
            ) : (
              "Get Suggestions"
            )}
          </button>
        </div>
        {aiSuggestion ? (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {aiSuggestion}
          </p>
        ) : (
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Describe your project above, then click &ldquo;Get Suggestions&rdquo; for AI-powered recommendations on tech stack, key considerations, and features you might not have thought of.
          </p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-bold mb-2">Budget & Timeline</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          This helps us scope the project and assign the right team.
        </p>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-3">
          <DollarSign className="w-4 h-4 text-cyan-500" />
          Estimated Budget <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {budgetOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField("budget", option)}
              className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                formData.budget === option
                  ? "border-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-600 dark:text-slate-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-3">
          <Clock className="w-4 h-4 text-cyan-500" />
          Expected Timeline <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {timelineOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField("timeline", option)}
              className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                formData.timeline === option
                  ? "border-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-600 dark:text-slate-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-3">
          <Users className="w-4 h-4 text-cyan-500" />
          Your Team Size
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {teamSizeOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField("teamSize", option)}
              className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                formData.teamSize === option
                  ? "border-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-600 dark:text-slate-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Anything else we should know?
        </label>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => updateField("additionalNotes", e.target.value)}
          rows={3}
          className={`${inputStyles} resize-none`}
          placeholder="Any specific technologies, design preferences, integrations, compliance requirements, references, or other details..."
        />
      </div>
    </div>
  );

  const stepRenderers = [renderStep0, renderStep1, renderStep2, renderStep3];

  /* ── Success Screen ── */
  if (submitStatus === "success") {
    return (
      <>
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] to-transparent" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <div className="p-12 rounded-3xl bg-white dark:bg-slate-900/30 border border-slate-200/60 dark:border-white/[0.06] shadow-xl shadow-black/[0.03] dark:shadow-none">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Request Submitted!
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Thank you, {formData.name}! We&apos;ve received your consultation
                  request for your{" "}
                  <span className="font-medium text-cyan-500">
                    {selectedType?.label}
                  </span>{" "}
                  project. Our team will review the details and get back to you
                  within 24 hours.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Back to Home
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] to-transparent" />
        <div
          className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-label">Start a Project</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Tell Us About
              <br />
              <span className="text-cyan-500">Your Vision</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Fill out the form below so we can understand your project and give
              you the best possible consultation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/30 border border-slate-200/60 dark:border-white/[0.06] shadow-xl shadow-black/[0.03] dark:shadow-none">
              {/* Progress bar */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-3">
                  {["About You", "Project Type", "Details", "Budget & Timeline"].map(
                    (label, i) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          // Only allow going back to previous steps
                          if (i < step) setStep(i);
                        }}
                        className={`text-xs font-medium transition-colors ${
                          i <= step
                            ? "text-cyan-500 cursor-pointer"
                            : "text-slate-400 dark:text-slate-600 cursor-default"
                        }`}
                      >
                        {label}
                      </button>
                    )
                  )}
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    initial={false}
                    animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Step content */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (step === totalSteps - 1) handleSubmit();
                  else nextStep();
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stepRenderers[step]()}
                  </motion.div>
                </AnimatePresence>

                {/* Error message */}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-red-600 dark:text-red-400 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 mt-6"
                  >
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    Something went wrong. Please try again or email us directly.
                  </motion.div>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200/60 dark:border-white/[0.06]">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                      step === 0
                        ? "opacity-0 pointer-events-none"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  {step < totalSteps - 1 ? (
                    <button
                      type="submit"
                      disabled={!canProceed()}
                      className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canProceed() || isSubmitting}
                      className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
