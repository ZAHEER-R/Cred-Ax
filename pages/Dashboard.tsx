
import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Download, 
  Share2, 
  UserCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  BrainCircuit,
  FileText,
  UserCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area
} from 'recharts';
import { RGBBorder } from '../components/RGBBorder';
import { Modal } from '../components/Modals';
import { 
  MOCK_USER, MOCK_METRICS, MOCK_RISK_FACTORS, MOCK_TRANSACTIONS, CASH_FLOW_DATA 
} from '../constants';
import { getCreditInsight } from '../services/geminiService';

const Dashboard = () => {
  const [showPrint, setShowPrint] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>("Analyzing data with Gemini AI...");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      const insight = await getCreditInsight(MOCK_USER, MOCK_METRICS, MOCK_TRANSACTIONS);
      setAiInsight(insight);
    };
    fetchInsight();
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Applicant Assessment</h1>
          <p className="text-slate-500">Reviewing eligibility for <span className="font-bold text-indigo-600">{MOCK_USER.name}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPrint(true)}
            className="p-2 md:px-4 md:py-2 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center gap-2 font-semibold"
          >
            <Printer size={20} />
            <span className="hidden md:inline">Print Report</span>
          </button>
          <button 
            onClick={() => setShowExport(true)}
            className="p-2 md:px-4 md:py-2 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center gap-2 font-semibold"
          >
            <Download size={20} />
            <span className="hidden md:inline">Export</span>
          </button>
          <button 
            onClick={handleShare}
            className={`p-2 md:px-4 md:py-2 rounded-xl transition-all flex items-center gap-2 font-semibold ${
              copied ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            <Share2 size={20} />
            <span className="hidden md:inline">{copied ? 'Copied Link' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Metrics & Profile */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Top Score Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <RGBBorder className="h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Trust Score</span>
                <BrainCircuit className="text-indigo-600" size={24} />
              </div>
              <div className="text-center py-4">
                <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-purple-600">
                  {MOCK_METRICS.trustScore}
                </span>
                <p className="text-slate-500 font-medium mt-2">Scale: 0 - 1000</p>
              </div>
              <div className="mt-4 bg-indigo-50 p-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
                  <UserCheck size={20} />
                </div>
                <p className="text-xs text-indigo-700 font-medium leading-tight">
                  Verification successful. AI estimates a high repayment potential based on consistent gig payouts.
                </p>
              </div>
            </RGBBorder>

            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/40 transition-all duration-700" />
              <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs font-bold tracking-widest">PROBABILITY</span>
                  <TrendingUp className="text-emerald-400" size={20} />
                </div>
                <div>
                  <h2 className="text-5xl font-black">{MOCK_METRICS.repaymentProbability}%</h2>
                  <p className="text-slate-400 mt-1">Estimated Repayment Confidence</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>RISK LEVEL: LOW</span>
                    <span>HEALTHY</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[92.4%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cash Flow Chart */}
          <div className="bg-white p-8 rounded-3xl border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Cash Flow Analysis</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <div className="w-3 h-3 rounded-full bg-indigo-600" />
                  <span>INCOME</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <span>SPENDING</span>
                </div>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CASH_FLOW_DATA}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Area type="monotone" dataKey="income" stroke="#4f46e5" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
                  <Area type="monotone" dataKey="spending" stroke="#cbd5e1" fillOpacity={0} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gemini AI Summary Section */}
          <div className="bg-indigo-600 rounded-3xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <BrainCircuit size={20} />
              </div>
              <h3 className="text-xl font-bold">AI Decision Insight</h3>
            </div>
            <p className="text-indigo-100 leading-relaxed italic">
              "{aiInsight}"
            </p>
          </div>
        </div>

        {/* Right Column: Breakdown & Profile Detail */}
        <div className="space-y-8">
          
          {/* Risk Factors */}
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <h3 className="text-lg font-bold mb-6">Risk Factor Breakdown</h3>
            <div className="space-y-6">
              {MOCK_RISK_FACTORS.map((factor, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-600 text-sm font-medium">{factor.label}</span>
                    <span className="text-slate-900 font-black">{factor.score}/10</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 delay-${i * 100}`}
                      style={{ 
                        width: `${factor.score * 10}%`,
                        backgroundColor: factor.score > 7 ? '#10b981' : factor.score > 5 ? '#f59e0b' : '#ef4444'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Fast Card */}
          <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border text-slate-400">
                {/* Fixed: UserCircle component was missing import */}
                <UserCircle size={40} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{MOCK_USER.name}</h4>
                <p className="text-xs text-slate-500">{MOCK_USER.employment}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm border">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Loan Amount</span>
                <span className="text-lg font-black text-slate-800">₹75,000</span>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm border">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">D/I Ratio</span>
                <span className="text-lg font-black text-slate-800">{MOCK_METRICS.debtToIncome}%</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-700">Identity Verified</span>
              {/* Fixed: ShieldCheck component was missing import */}
              <ShieldCheck className="text-emerald-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Print Preview Modal */}
      <Modal 
        isOpen={showPrint} 
        onClose={() => setShowPrint(false)} 
        title="Print Preview"
        height="max-h-[80vh]"
      >
        <div className="space-y-6 text-slate-800">
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h2 className="text-2xl font-black">Credit Report</h2>
              <p className="text-sm text-slate-500">ID: GIG-2024-SV-771</p>
            </div>
            {/* Fixed: Zap component was missing import */}
            <Zap className="text-indigo-600" size={32} />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400 uppercase font-bold text-[10px]">Applicant</p>
              <p className="font-bold">{MOCK_USER.name}</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase font-bold text-[10px]">Date</p>
              <p className="font-bold">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-400 uppercase font-bold text-[10px]">Trust Score</p>
              <p className="text-2xl font-black text-indigo-600">{MOCK_METRICS.trustScore}</p>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl text-sm border">
            <p className="font-bold mb-2">AI Summary</p>
            <p className="text-slate-600 italic">"{aiInsight.slice(0, 150)}..."</p>
          </div>
          <div className="pt-4 flex gap-3">
            <button className="flex-1 bg-slate-900 text-white py-2 rounded-lg font-bold">Confirm & Print</button>
            <button onClick={() => setShowPrint(false)} className="flex-1 border py-2 rounded-lg font-bold">Cancel</button>
          </div>
        </div>
      </Modal>

      {/* Export Modal */}
      <Modal isOpen={showExport} onClose={() => setShowExport(false)} title="Export Document">
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 text-rose-600 rounded-lg group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold">Adobe PDF (.pdf)</p>
                <p className="text-xs text-slate-500">Universal format for distribution</p>
              </div>
            </div>
            <Download size={18} className="text-slate-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold">Microsoft Word (.docx)</p>
                <p className="text-xs text-slate-500">Editable document format</p>
              </div>
            </div>
            <Download size={18} className="text-slate-400" />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
