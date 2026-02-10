
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, HeartHandshake, ArrowRight } from 'lucide-react';
import { RGBBorder } from '../components/RGBBorder';

const Home = () => {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-bold text-sm animate-bounce">
          <ShieldCheck size={18} />
          <span>Tech for Good: Financial Inclusion Reimagined</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-tight">
          Credit for the <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Unsalaried & Gig
          </span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We use AI and alternative data signals to verify your creditworthiness. 
          No salary slips? No problem. Swiggy, Zomato, or Freelance—we've got you covered.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link to="/dashboard" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-500 transition-all shadow-xl hover:shadow-indigo-200 flex items-center justify-center gap-2 group">
            Get Started
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-800 rounded-2xl font-bold text-lg hover:border-indigo-600 hover:text-indigo-600 transition-all">
            How it Works
          </button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Zap className="text-yellow-500" size={32} />,
            title: "Alternative Data",
            desc: "Income consistency from Zomato, Swiggy, and utility bills."
          },
          {
            icon: <ShieldCheck className="text-emerald-500" size={32} />,
            title: "AI Trust Score",
            desc: "Beyond CIBIL. A transparent 0-1000 score based on cash flow."
          },
          {
            icon: <HeartHandshake className="text-rose-500" size={32} />,
            title: "Micro-Loans",
            desc: "Designed for small informal earners and neighborhood chefs."
          }
        ].map((feature, i) => (
          <div key={i} className="p-8 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all group perspective-1000">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Dashboard Preview */}
      <section className="relative">
        <div className="absolute inset-0 bg-indigo-600/5 blur-3xl rounded-full" />
        <RGBBorder className="max-w-5xl mx-auto overflow-hidden animate-in slide-up-on-scroll">
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-black">AI Assessment Preview</h2>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">LIVE METRIC</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Trust Score</span>
                <p className="text-3xl font-black text-indigo-600">745</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Repayment Prob.</span>
                <p className="text-3xl font-black text-slate-800">94.2%</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Income Est.</span>
                <p className="text-3xl font-black text-slate-800">₹42k</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Status</span>
                <p className="text-3xl font-black text-emerald-500">SAFE</p>
              </div>
            </div>
          </div>
        </RGBBorder>
      </section>
    </div>
  );
};

export default Home;
