
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { OUTFLOW_CATEGORIES, CASH_FLOW_DATA } from '../constants';
import { Brain, Info } from 'lucide-react';

const Analysis = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Deep Financial Analysis</h1>
        <p className="text-slate-500">Behavioral insights and spending patterns</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Outflow Breakdown */}
        <div className="bg-white p-8 rounded-3xl border shadow-sm flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Outflow Categorization</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Info size={18} /></div>
          </div>
          <div className="h-80 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={OUTFLOW_CATEGORIES}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {OUTFLOW_CATEGORIES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest block">Primary</span>
              <span className="text-2xl font-black text-slate-800">Essentials</span>
            </div>
          </div>
        </div>

        {/* Savings Growth */}
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h3 className="text-xl font-bold mb-8">Monthly Savings Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CASH_FLOW_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="income" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="spending" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Behavioral Insights */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
            <Brain size={28} />
          </div>
          <h3 className="text-2xl font-black">AI Behavioral Fingerprint</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h4 className="font-bold text-indigo-300">Spending Discipline</h4>
            <p className="text-slate-400 text-sm">Maintains a consistent 20% savings buffer across seasonal fluctuations.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-indigo-300">Business Maturity</h4>
            <p className="text-slate-400 text-sm">Clear separation between household essentials and cloud-kitchen reinvestment.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-indigo-300">Income Reliability</h4>
            <p className="text-slate-400 text-sm">Diversified payout cycles (Daily + Weekly) reduce single-point failure risk.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
