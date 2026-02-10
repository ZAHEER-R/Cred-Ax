
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  employment: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  ipAddress?: string;
  requestedAmount: number;
  loanPurpose: string;
}

export interface CreditMetrics {
  trustScore: number;
  repaymentProbability: number;
  estimatedIncome: number;
  debtToIncome: number;
}

export interface RiskFactor {
  label: string;
  score: number;
}

export interface Transaction {
  id: string;
  date: string;
  category: string;
  amount: number;
  status: 'Verified' | 'Pending' | 'Recurring';
  source: string;
}

export interface AppSettings {
  notifications: boolean;
  latestUpdates: boolean;
}
