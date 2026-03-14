import { createClient } from "@supabase/supabase-js";

export function getServiceSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

const supabase = getServiceSupabase();

// ── Service Charges ──

export interface ServiceCharge {
  id: number;
  projectId: number;
  amount: number;
  description: string | null;
  chargeDate: string;
  createdAt: string;
  updatedAt: string;
}

export async function createServiceCharge(data: {
  projectId: number;
  amount: number;
  description?: string;
  chargeDate?: string;
}): Promise<ServiceCharge> {
  const { data: row, error } = await supabase
    .from("service_charges")
    .insert({
      project_id: data.projectId,
      amount: data.amount,
      description: data.description || null,
      charge_date: data.chargeDate || new Date().toISOString().split("T")[0],
    })
    .select()
    .single();
  if (error) throw error;
  return {
    id: row.id,
    projectId: row.project_id,
    amount: row.amount,
    description: row.description,
    chargeDate: row.charge_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listServiceCharges(params: {
  projectId?: number;
  page?: number;
  limit?: number;
}): Promise<{ data: ServiceCharge[]; total: number; page: number; totalPages: number }> {
  const page = params.page || 1;
  const limit = params.limit || 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("service_charges")
    .select("*", { count: "exact" });

  if (params.projectId) query = query.eq("project_id", params.projectId);

  query = query.order("charge_date", { ascending: false }).range(from, to);

  const { data, count, error } = await query;
  if (error) throw error;

  const total = count || 0;
  return {
    data: (data || []).map((row: any) => ({
      id: row.id,
      projectId: row.project_id,
      amount: row.amount,
      description: row.description,
      chargeDate: row.charge_date,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function updateServiceCharge(id: number, data: Partial<Omit<ServiceCharge, "id" | "createdAt" | "updatedAt">>): Promise<ServiceCharge | null> {
  const { data: row, error } = await supabase
    .from("service_charges")
    .update({
      ...("projectId" in data ? { project_id: data.projectId } : {}),
      ...("amount" in data ? { amount: data.amount } : {}),
      ...("description" in data ? { description: data.description } : {}),
      ...("chargeDate" in data ? { charge_date: data.chargeDate } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  if (error) return null;
  return {
    id: row.id,
    projectId: row.project_id,
    amount: row.amount,
    description: row.description,
    chargeDate: row.charge_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function deleteServiceCharge(id: number): Promise<boolean> {
  const { error } = await supabase.from("service_charges").delete().eq("id", id);
  return !error;
}

// ── Consultation Requests ──

export interface ConsultationRequest {
  id: number;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  project_type: string;
  project_name: string | null;
  project_description: string;
  target_audience: string | null;
  key_features: string;
  existing_solution: string | null;
  budget: string;
  timeline: string;
  team_size: string | null;
  additional_notes: string | null;
  ai_suggestion: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function createConsultation(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  projectName?: string;
  projectDescription: string;
  targetAudience?: string;
  keyFeatures: string;
  existingSolution?: string;
  budget: string;
  timeline: string;
  teamSize?: string;
  additionalNotes?: string;
  aiSuggestion?: string;
}): Promise<ConsultationRequest> {
  const { data: row, error } = await supabase
    .from("consultation_requests")
    .insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      phone: data.phone || null,
      project_type: data.projectType,
      project_name: data.projectName || null,
      project_description: data.projectDescription,
      target_audience: data.targetAudience || null,
      key_features: data.keyFeatures,
      existing_solution: data.existingSolution || null,
      budget: data.budget,
      timeline: data.timeline,
      team_size: data.teamSize || null,
      additional_notes: data.additionalNotes || null,
      ai_suggestion: data.aiSuggestion || null,
    })
    .select()
    .single();

  if (error) throw error;
  return row as ConsultationRequest;
}

export async function getConsultationById(id: number): Promise<ConsultationRequest | null> {
  const { data, error } = await supabase
    .from("consultation_requests")
    .select()
    .eq("id", id)
    .single();

  if (error) return null;
  return data as ConsultationRequest;
}

export async function listConsultations(params: {
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: ConsultationRequest[]; total: number; page: number; totalPages: number }> {
  const page = params.page || 1;
  const limit = params.limit || 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("consultation_requests")
    .select("*", { count: "exact" });

  if (params.status) {
    query = query.eq("status", params.status);
  }

  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data, count, error } = await query;
  if (error) throw error;

  const total = count || 0;
  return { data: (data || []) as ConsultationRequest[], total, page, totalPages: Math.ceil(total / limit) };
}

export async function updateConsultationStatus(id: number, status: string): Promise<ConsultationRequest | null> {
  const { data, error } = await supabase
    .from("consultation_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) return null;
  return data as ConsultationRequest;
}

// ── Contact Messages ──

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function createContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<ContactMessage> {
  const { data: row, error } = await supabase
    .from("contact_messages")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return row as ContactMessage;
}

export async function getContactById(id: number): Promise<ContactMessage | null> {
  const { data, error } = await supabase
    .from("contact_messages")
    .select()
    .eq("id", id)
    .single();

  if (error) return null;
  return data as ContactMessage;
}

export async function listContacts(params: {
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: ContactMessage[]; total: number; page: number; totalPages: number }> {
  const page = params.page || 1;
  const limit = params.limit || 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("contact_messages")
    .select("*", { count: "exact" });

  if (params.status) {
    query = query.eq("status", params.status);
  }

  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data, count, error } = await query;
  if (error) throw error;

  const total = count || 0;
  return { data: (data || []) as ContactMessage[], total, page, totalPages: Math.ceil(total / limit) };
}

export async function updateContactStatus(id: number, status: string): Promise<ContactMessage | null> {
  const { data, error } = await supabase
    .from("contact_messages")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) return null;
  return data as ContactMessage;
}

// ── Admin Users ──

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  const { data, error } = await supabase
    .from("admin_users")
    .select()
    .eq("username", username)
    .single();

  if (error) return null;
  return data as AdminUser;
}

export async function createAdminUser(username: string, passwordHash: string): Promise<AdminUser> {
  const existing = await getAdminByUsername(username);
  if (existing) {
    const { data, error } = await supabase
      .from("admin_users")
      .update({ password_hash: passwordHash })
      .eq("username", username)
      .select()
      .single();
    if (error) throw error;
    return data as AdminUser;
  }

  const { data, error } = await supabase
    .from("admin_users")
    .insert({ username, password_hash: passwordHash })
    .select()
    .single();
  if (error) throw error;
  return data as AdminUser;
}

// ── Stats ──

export async function getDashboardStats() {
  const [
    { count: totalConsultations },
    { count: pendingConsultations },
    { count: totalContacts },
    { count: unreadContacts },
  ] = await Promise.all([
    supabase.from("consultation_requests").select("*", { count: "exact", head: true }),
    supabase.from("consultation_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "unread"),
  ]);

  const [{ data: recentConsultations }, { data: recentContacts }] = await Promise.all([
    supabase.from("consultation_requests").select().order("created_at", { ascending: false }).limit(5),
    supabase.from("contact_messages").select().order("created_at", { ascending: false }).limit(5),
  ]);

  const [
    { count: totalProjects },
    { count: activeProjects },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "in_progress"),
  ]);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const [{ data: monthlyIncomeData }, { data: monthlyServiceCharges }, { data: monthlyExpenseData }] = await Promise.all([
    supabase.from("transactions").select("amount_bdt").eq("type", "income").gte("date", startOfMonth),
    supabase.from("service_charges").select("amount").gte("charge_date", startOfMonth),
    supabase.from("transactions").select("amount_bdt").eq("type", "expense").gte("date", startOfMonth),
  ]);

  const monthlyRevenue = (monthlyIncomeData || []).reduce(
    (sum: number, t: { amount_bdt: number }) => sum + Number(t.amount_bdt), 0
  ) + (monthlyServiceCharges || []).reduce(
    (sum: number, t: { amount: number }) => sum + Number(t.amount), 0
  );
  const monthlyExpense = (monthlyExpenseData || []).reduce(
    (sum: number, t: { amount_bdt: number }) => sum + Number(t.amount_bdt), 0
  );

  return {
    totalConsultations: totalConsultations || 0,
    pendingConsultations: pendingConsultations || 0,
    totalContacts: totalContacts || 0,
    unreadContacts: unreadContacts || 0,
    totalProjects: totalProjects || 0,
    activeProjects: activeProjects || 0,
    monthlyRevenue,
    monthlyExpense,
    monthlyProfit: monthlyRevenue - monthlyExpense,
    recentConsultations: (recentConsultations || []) as ConsultationRequest[],
    recentContacts: (recentContacts || []) as ContactMessage[],
  };
}

// ── Projects ──

export interface Project {
  id: number;
  name: string;
  client_name: string;
  client_email: string | null;
  description: string | null;
  project_type: string;
  status: string;
  budget_bdt: number;
  budget_usd: number;
  start_date: string | null;
  end_date: string | null;
  consultation_id: number | null;
  source: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export async function createProject(data: {
  name: string;
  client_name: string;
  client_email?: string;
  description?: string;
  project_type: string;
  status?: string;
  budget_bdt?: number;
  budget_usd?: number;
  start_date?: string;
  end_date?: string;
  consultation_id?: number;
  source?: string;
  notes?: string;
}): Promise<Project> {
  const { data: row, error } = await supabase
    .from("projects")
    .insert({
      name: data.name,
      client_name: data.client_name,
      client_email: data.client_email || null,
      description: data.description || null,
      project_type: data.project_type,
      status: data.status || "pending",
      budget_bdt: data.budget_bdt || 0,
      budget_usd: data.budget_usd || 0,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      consultation_id: data.consultation_id || null,
      source: data.source || "manual",
      notes: data.notes || null,
    })
    .select()
    .single();

  if (error) throw error;
  return row as Project;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Project;
}

export async function listProjects(params: {
  status?: string;
  source?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: Project[]; total: number; page: number; totalPages: number }> {
  const page = params.page || 1;
  const limit = params.limit || 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("projects")
    .select("*", { count: "exact" });

  if (params.status) query = query.eq("status", params.status);
  if (params.source) query = query.eq("source", params.source);

  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data, count, error } = await query;
  if (error) throw error;

  const total = count || 0;
  return { data: (data || []) as Project[], total, page, totalPages: Math.ceil(total / limit) };
}

export async function updateProject(id: number, data: Partial<Omit<Project, "id" | "created_at">>): Promise<Project | null> {
  const { data: row, error } = await supabase
    .from("projects")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) return null;
  return row as Project;
}

export async function updateProjectStatus(id: number, status: string): Promise<Project | null> {
  return updateProject(id, { status });
}

export async function getProjectStats() {
  const [
    { count: total },
    { count: pending },
    { count: inProgress },
    { count: completed },
    { count: cancelled },
    { data: allProjects },
    { data: serviceCharges },
    { data: projectTransactions },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "in_progress"),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "cancelled"),
    supabase.from("projects").select("id, name, budget_bdt, budget_usd, status, source"),
    supabase.from("service_charges").select("project_id, amount"),
    supabase.from("transactions").select("project_id, amount_bdt, amount_usd, type").not("project_id", "is", null),
  ]);

  const projects = allProjects || [];
  const charges = serviceCharges || [];

  const totalBudgetBdt = projects.reduce((s: number, p: any) => s + Number(p.budget_bdt || 0), 0);
  const totalBudgetUsd = projects.reduce((s: number, p: any) => s + Number(p.budget_usd || 0), 0);
  const totalServiceCharges = charges.reduce((s: number, c: any) => s + Number(c.amount || 0), 0);

  const manualCount = projects.filter((p: any) => p.source === "manual").length;
  const consultationCount = projects.filter((p: any) => p.source === "consultation").length;

  // Per-project service charge totals
  const chargesByProject: Record<number, number> = {};
  for (const c of charges) {
    chargesByProject[c.project_id] = (chargesByProject[c.project_id] || 0) + Number(c.amount || 0);
  }

  // Per-project transaction income/expense totals
  const txByProject: Record<number, { incomeBdt: number; incomeUsd: number; expenseBdt: number; expenseUsd: number }> = {};
  for (const tx of (projectTransactions || [])) {
    if (!txByProject[tx.project_id]) txByProject[tx.project_id] = { incomeBdt: 0, incomeUsd: 0, expenseBdt: 0, expenseUsd: 0 };
    if (tx.type === "income") {
      txByProject[tx.project_id].incomeBdt += Number(tx.amount_bdt || 0);
      txByProject[tx.project_id].incomeUsd += Number(tx.amount_usd || 0);
    } else {
      txByProject[tx.project_id].expenseBdt += Number(tx.amount_bdt || 0);
      txByProject[tx.project_id].expenseUsd += Number(tx.amount_usd || 0);
    }
  }

  // Total earned across all projects (transaction income + service charges)
  const totalEarnedBdt = Object.values(txByProject).reduce((s, t) => s + t.incomeBdt, 0) + totalServiceCharges;
  const totalEarnedUsd = Object.values(txByProject).reduce((s, t) => s + t.incomeUsd, 0);

  const projectBreakdown = projects.map((p: any) => ({
    id: p.id,
    name: p.name,
    status: p.status,
    source: p.source,
    budgetBdt: Number(p.budget_bdt || 0),
    budgetUsd: Number(p.budget_usd || 0),
    serviceCharges: chargesByProject[p.id] || 0,
    earnedBdt: (txByProject[p.id]?.incomeBdt || 0) + (chargesByProject[p.id] || 0),
    earnedUsd: txByProject[p.id]?.incomeUsd || 0,
    spentBdt: txByProject[p.id]?.expenseBdt || 0,
    spentUsd: txByProject[p.id]?.expenseUsd || 0,
  }));

  return {
    total: total || 0,
    pending: pending || 0,
    inProgress: inProgress || 0,
    completed: completed || 0,
    cancelled: cancelled || 0,
    totalBudgetBdt,
    totalBudgetUsd,
    totalServiceCharges,
    totalEarnedBdt,
    totalEarnedUsd,
    manualCount,
    consultationCount,
    projectBreakdown,
  };
}

export async function convertConsultationToProject(consultationId: number): Promise<Project> {
  const consultation = await getConsultationById(consultationId);
  if (!consultation) throw new Error("Consultation not found");

  // Check if already converted
  const { data: existing } = await supabase
    .from("projects")
    .select("id")
    .eq("consultation_id", consultationId)
    .maybeSingle();
  if (existing) throw new Error("This consultation has already been converted to a project");

  const project = await createProject({
    name: consultation.project_name || `Project from ${consultation.name}`,
    client_name: consultation.name,
    client_email: consultation.email,
    description: consultation.project_description,
    project_type: consultation.project_type,
    budget_bdt: 0,
    budget_usd: 0,
    consultation_id: consultationId,
    source: "consultation",
    notes: consultation.budget ? `Client budget range: ${consultation.budget}` : undefined,
  });

  // Update consultation status to completed
  await supabase
    .from("consultation_requests")
    .update({ status: "completed", updated_at: new Date().toISOString() })
    .eq("id", consultationId);

  return project;
}

// Get linked project for a consultation
export async function getLinkedProject(consultationId: number): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("consultation_id", consultationId)
    .maybeSingle();
  if (error || !data) return null;
  return data as Project;
}

// Get all consultation IDs that have been converted to projects
export async function getConvertedConsultationIds(): Promise<Set<number>> {
  const { data } = await supabase
    .from("projects")
    .select("consultation_id")
    .not("consultation_id", "is", null);
  return new Set((data || []).map((r: any) => r.consultation_id));
}

export async function deleteProject(id: number): Promise<boolean> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  return !error;
}

// ── Transactions ──

export interface Transaction {
  id: number;
  type: string;
  category: string;
  description: string | null;
  amount_bdt: number;
  amount_usd: number;
  project_id: number | null;
  date: string;
  payment_method: string | null;
  reference: string | null;
  notes: string | null;
  created_at: string;
}

export async function createTransaction(data: {
  type: string;
  category: string;
  description?: string;
  amount_bdt: number;
  amount_usd: number;
  project_id?: number;
  date?: string;
  payment_method?: string;
  reference?: string;
  notes?: string;
}): Promise<Transaction> {
  const { data: row, error } = await supabase
    .from("transactions")
    .insert({
      type: data.type,
      category: data.category,
      description: data.description || null,
      amount_bdt: data.amount_bdt,
      amount_usd: data.amount_usd,
      project_id: data.project_id || null,
      date: data.date || new Date().toISOString().split("T")[0],
      payment_method: data.payment_method || null,
      reference: data.reference || null,
      notes: data.notes || null,
    })
    .select()
    .single();

  if (error) throw error;
  return row as Transaction;
}

export async function getTransactionById(id: number): Promise<Transaction | null> {
  const { data, error } = await supabase
    .from("transactions")
    .select()
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Transaction;
}

export async function listTransactions(params: {
  type?: string;
  category?: string;
  project_id?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: Transaction[]; total: number; page: number; totalPages: number }> {
  const page = params.page || 1;
  const limit = params.limit || 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("transactions")
    .select("*", { count: "exact" });

  if (params.type) query = query.eq("type", params.type);
  if (params.category) query = query.eq("category", params.category);
  if (params.project_id) query = query.eq("project_id", params.project_id);
  if (params.startDate) query = query.gte("date", params.startDate);
  if (params.endDate) query = query.lte("date", params.endDate);

  query = query.order("date", { ascending: false }).range(from, to);

  const { data, count, error } = await query;
  if (error) throw error;

  const total = count || 0;
  return { data: (data || []) as Transaction[], total, page, totalPages: Math.ceil(total / limit) };
}

export async function updateTransaction(id: number, data: Partial<Omit<Transaction, "id" | "created_at">>): Promise<Transaction | null> {
  const { data: row, error } = await supabase
    .from("transactions")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) return null;
  return row as Transaction;
}

export async function deleteTransaction(id: number): Promise<boolean> {
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  return !error;
}

// ── Finance Summary ──

export async function getFinanceSummary(params?: { startDate?: string; endDate?: string }) {
  let incomeQuery = supabase.from("transactions").select("amount_bdt, amount_usd").eq("type", "income");
  let expenseQuery = supabase.from("transactions").select("amount_bdt, amount_usd").eq("type", "expense");
  let serviceChargeQuery = supabase.from("service_charges").select("amount, charge_date");

  if (params?.startDate) {
    incomeQuery = incomeQuery.gte("date", params.startDate);
    expenseQuery = expenseQuery.gte("date", params.startDate);
    serviceChargeQuery = serviceChargeQuery.gte("charge_date", params.startDate);
  }
  if (params?.endDate) {
    incomeQuery = incomeQuery.lte("date", params.endDate);
    expenseQuery = expenseQuery.lte("date", params.endDate);
    serviceChargeQuery = serviceChargeQuery.lte("charge_date", params.endDate);
  }

  const [{ data: incomeData }, { data: expenseData }, { data: serviceChargeData }] = await Promise.all([
    incomeQuery,
    expenseQuery,
    serviceChargeQuery,
  ]);

  const serviceChargeTotalBdt = (serviceChargeData || []).reduce((s: number, t: { amount: number }) => s + Number(t.amount), 0);

  const totalIncomeBdt = (incomeData || []).reduce((s: number, t: { amount_bdt: number }) => s + Number(t.amount_bdt), 0) + serviceChargeTotalBdt;
  const totalIncomeUsd = (incomeData || []).reduce((s: number, t: { amount_usd: number }) => s + Number(t.amount_usd), 0);
  const totalExpenseBdt = (expenseData || []).reduce((s: number, t: { amount_bdt: number }) => s + Number(t.amount_bdt), 0);
  const totalExpenseUsd = (expenseData || []).reduce((s: number, t: { amount_usd: number }) => s + Number(t.amount_usd), 0);

  return {
    totalIncomeBdt,
    totalIncomeUsd,
    totalExpenseBdt,
    totalExpenseUsd,
    profitBdt: totalIncomeBdt - totalExpenseBdt,
    profitUsd: totalIncomeUsd - totalExpenseUsd,
    serviceChargeTotalBdt,
  };
}

export async function getMonthlyFinanceData(year: number) {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const [{ data: txData }, { data: scData }] = await Promise.all([
    supabase
      .from("transactions")
      .select("type, amount_bdt, amount_usd, date")
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true }),
    supabase
      .from("service_charges")
      .select("amount, charge_date")
      .gte("charge_date", startDate)
      .lte("charge_date", endDate)
      .order("charge_date", { ascending: true }),
  ]);

  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    label: new Date(year, i).toLocaleString("default", { month: "short" }),
    incomeBdt: 0,
    incomeUsd: 0,
    expenseBdt: 0,
    expenseUsd: 0,
    serviceChargesBdt: 0,
  }));

  for (const row of txData || []) {
    const monthIdx = new Date(row.date).getMonth();
    if (row.type === "income") {
      months[monthIdx].incomeBdt += Number(row.amount_bdt);
      months[monthIdx].incomeUsd += Number(row.amount_usd);
    } else {
      months[monthIdx].expenseBdt += Number(row.amount_bdt);
      months[monthIdx].expenseUsd += Number(row.amount_usd);
    }
  }

  for (const row of scData || []) {
    const monthIdx = new Date(row.charge_date).getMonth();
    months[monthIdx].serviceChargesBdt += Number(row.amount);
    months[monthIdx].incomeBdt += Number(row.amount);
  }

  return months;
}

// ── Analytics ──

export async function getConsultationStats() {
  const [
    { count: total },
    { count: pending },
    { count: reviewed },
    { count: completed },
    { count: cancelled },
  ] = await Promise.all([
    supabase.from("consultation_requests").select("*", { count: "exact", head: true }),
    supabase.from("consultation_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("consultation_requests").select("*", { count: "exact", head: true }).eq("status", "reviewed"),
    supabase.from("consultation_requests").select("*", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("consultation_requests").select("*", { count: "exact", head: true }).eq("status", "cancelled"),
  ]);

  const { count: convertedCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .not("consultation_id", "is", null);

  const totalVal = total || 0;
  const converted = convertedCount || 0;
  const conversionRate = totalVal > 0 ? Math.round((converted / totalVal) * 100) : 0;

  return {
    total: totalVal,
    pending: pending || 0,
    reviewed: reviewed || 0,
    completed: completed || 0,
    cancelled: cancelled || 0,
    converted,
    conversionRate,
  };
}

export async function getAnalyticsData() {
  const [projectStats, financeSummary, monthlyData, consultationStats] = await Promise.all([
    getProjectStats(),
    getFinanceSummary(),
    getMonthlyFinanceData(new Date().getFullYear()),
    getConsultationStats(),
  ]);

  return { projectStats, financeSummary, monthlyData, consultationStats };
}

export async function createProjectWithServiceRole(data: any) {
  const serviceSupabase = getServiceSupabase();
  const { data: row, error } = await serviceSupabase
    .from('projects')
    .insert({
      name: data.name,
      client_name: data.client_name,
      client_email: data.client_email || null,
      description: data.description || null,
      project_type: data.project_type,
      status: data.status || 'pending',
      budget_bdt: data.budget_bdt || 0,
      budget_usd: data.budget_usd || 0,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      consultation_id: data.consultation_id || null,
      source: data.source || 'manual',
      notes: data.notes || null,
    })
    .select()
    .single();
  if (error) throw error;
  return row;
}
