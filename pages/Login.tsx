import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import { signIn } from '../services/supabaseService';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { data, error: signInError } = await signIn(email, password);
    
    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
    } else if (data.user) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/20 backdrop-blur-md border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">GigCredit</span>
          </Link>
          <Link to="/" className="text-slate-300 hover:text-white transition-colors">Back</Link>
        </div>
      </nav>

      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">
          {/* Left: Hero Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                Access Your <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                  Financial Dashboard
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Monitor your credit score, track cash flow, and get personalized recommendations powered by AI.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: <Shield className="text-blue-400" size={24} />, title: 'Secure Authentication', desc: 'Bank-level security for your data' },
                { icon: <TrendingUp className="text-cyan-400" size={24} />, title: 'Real-time Metrics', desc: 'Live updates on your financial profile' },
                { icon: <Users className="text-blue-400" size={24} />, title: 'AI-Powered Insights', desc: 'Smart recommendations tailored for you' },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-blue-500/20">
              <div>
                <p className="text-2xl font-bold text-blue-400">10K+</p>
                <p className="text-sm text-slate-400">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-cyan-400">₹50Cr+</p>
                <p className="text-sm text-slate-400">Loans Processed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">94%</p>
                <p className="text-sm text-slate-400">Approval Rate</p>
              </div>
            </div>
          </div>

          {/* Right: Login Form */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-black">Welcome Back</h2>
                <p className="text-slate-400 mt-2">Sign in to your account to continue</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-white">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-slate-700/50 border border-blue-500/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-white">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-700/50 border border-blue-500/30 rounded-xl pl-12 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-300 text-sm">
                    {error}
                  </div>
                )}

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                    <input type="checkbox" className="w-4 h-4 bg-slate-700 border border-blue-500/30 rounded" />
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300">Forgot password?</Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/30"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                  {!isLoading && <ArrowRight size={20} />}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-600"></div>
                <p className="text-slate-500 text-sm">OR</p>
                <div className="flex-1 h-px bg-slate-600"></div>
              </div>

              {/* SSO Options */}
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-slate-700/50 border border-slate-600 hover:border-slate-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/></svg>
                  Google
                </button>
                <button className="bg-slate-700/50 border border-slate-600 hover:border-slate-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white"><path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0z"/></svg>
                  GitHub
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-slate-400">
                Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-bold">Sign up here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
