"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { ConsultationRequest, ContactMessage } from "@/lib/db";

type DetailData = ConsultationRequest | ContactMessage | null;

export default function DetailModal({
  data,
  type,
  onClose,
}: {
  data: DetailData;
  type: "consultation" | "contact";
  onClose: () => void;
}) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto glass-card p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-white mb-4">
          {type === "consultation" ? "Consultation Details" : "Contact Details"}
        </h2>

        <div className="space-y-4">
          {type === "consultation" && isConsultation(data) ? (
            <>
              <Field label="Name" value={data.name} />
              <Field label="Email" value={data.email} />
              <Field label="Company" value={data.company} />
              <Field label="Phone" value={data.phone} />
              <Field label="Project Type" value={data.project_type} />
              <Field label="Project Name" value={data.project_name} />
              <Field label="Project Description" value={data.project_description} />
              <Field label="Target Audience" value={data.target_audience} />
              <Field label="Key Features" value={data.key_features} />
              <Field label="Existing Solution" value={data.existing_solution} />
              <Field label="Budget" value={data.budget} />
              <Field label="Timeline" value={data.timeline} />
              <Field label="Team Size" value={data.team_size} />
              <Field label="Additional Notes" value={data.additional_notes} />
              <Field label="AI Suggestion" value={data.ai_suggestion} />
              <Field label="Status" value={data.status} />
              <Field label="Created" value={new Date(data.created_at).toLocaleString()} />
            </>
          ) : isContact(data) ? (
            <>
              <Field label="Name" value={data.name} />
              <Field label="Email" value={data.email} />
              <Field label="Subject" value={data.subject} />
              <Field label="Message" value={data.message} />
              <Field label="Status" value={data.status} />
              <Field label="Created" value={new Date(data.created_at).toLocaleString()} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-white whitespace-pre-wrap">{value}</p>
    </div>
  );
}

function isConsultation(data: DetailData): data is ConsultationRequest {
  return data !== null && "project_type" in data;
}

function isContact(data: DetailData): data is ContactMessage {
  return data !== null && "subject" in data;
}
