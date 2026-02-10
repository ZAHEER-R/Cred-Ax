import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Replace with your actual Supabase credentials
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) console.error('Error fetching profile:', error);
  return data;
}

// Get user financial metrics
export async function getUserMetrics(userId: string) {
  const { data, error } = await supabase
    .from('financial_metrics')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) console.error('Error fetching metrics:', error);
  return data;
}

// Get user transaction history
export async function getUserTransactions(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit);
  
  if (error) console.error('Error fetching transactions:', error);
  return data || [];
}

// Get cash flow data
export async function getUserCashFlow(userId: string) {
  const { data, error } = await supabase
    .from('cash_flow')
    .select('*')
    .eq('user_id', userId)
    .order('month', { ascending: true });
  
  if (error) console.error('Error fetching cash flow:', error);
  return data || [];
}

// Get risk factors
export async function getUserRiskFactors(userId: string) {
  const { data, error } = await supabase
    .from('risk_factors')
    .select('*')
    .eq('user_id', userId);
  
  if (error) console.error('Error fetching risk factors:', error);
  return data || [];
}

// Update user profile
export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select();
  
  if (error) console.error('Error updating profile:', error);
  return data;
}

// Sign up user
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) console.error('Error signing up:', error);
  return { data, error };
}

// Sign in user
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) console.error('Error signing in:', error);
  return { data, error };
}

// Sign out user
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error);
  return { error };
}

// Get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) console.error('Error getting user:', error);
  return user;
}

// Listen to auth changes
export function onAuthStateChange(callback: (user: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
}
