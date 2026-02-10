
import React, { useState } from 'react';
import { Bell, RefreshCcw, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

const SettingsPage = () => {
  const [notifs, setNotifs] = useState(true);
  const [updates, setUpdates] = useState(true);

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black text-slate-900">Settings</h1>

      <div className="space-y-6">
        {/* App Settings */}
        <div className="bg-white rounded-3xl border shadow-sm divide-y overflow-hidden">
          <div className="p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">App Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Bell size={24} /></div>
                  <div>
                    <p className="font-bold">Push Notifications</p>
                    <p className="text-sm text-slate-500">Get alerted for score changes and payouts</p>
                  </div>
                </div>
                <button 
                  onClick={() => setNotifs(!notifs)}
                  className={`w-12 h-6 rounded-full transition-all relative ${notifs ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifs ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><RefreshCcw size={24} /></div>
                  <div>
                    <p className="font-bold">Auto-Sync Data</p>
                    <p className="text-sm text-slate-500">Keep gig data updated every 24 hours</p>
                  </div>
                </div>
                <button 
                  onClick={() => setUpdates(!updates)}
                  className={`w-12 h-6 rounded-full transition-all relative ${updates ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${updates ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Financial Safety</h3>
            <button className="w-full flex items-center justify-between py-2 group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><ShieldCheck size={24} /></div>
                <p className="font-bold">Data Privacy Center</p>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 bg-slate-50 rounded-3xl border border-dashed text-center">
          <p className="text-xs text-slate-400 font-medium">GigCredit AI v1.0.4-beta • Built for Financial Inclusion</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
