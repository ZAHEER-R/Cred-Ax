
import React from 'react';
import { Search, Filter, ArrowUpCircle, ArrowDownCircle, CheckCircle2, Clock } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../constants';

const HistoryPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Alternative Data History</h1>
          <p className="text-slate-500">Verified cash flow and income signals</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-slate-100 rounded-lg"><Filter size={20} /></button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Source / Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {MOCK_TRANSACTIONS.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${t.amount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                      {t.amount > 0 ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{t.source}</p>
                      <p className="text-xs text-slate-400">{t.date}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600">{t.category}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`text-lg font-black ${t.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount).toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    t.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {t.status === 'Verified' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    {t.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
