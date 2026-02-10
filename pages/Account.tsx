
import React, { useState, useEffect } from 'react';
import { UserCircle, MapPin, Globe, Shield, Calendar, Mail, Phone, Briefcase, User } from 'lucide-react';
import { MOCK_USER } from '../constants';

const Account = () => {
  const [locationData, setLocationData] = useState<string>("Detecting location...");
  const [ipAddress, setIpAddress] = useState<string>("Fetching IP...");

  useEffect(() => {
    // Mock IP fetching
    setIpAddress(`${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.1.12`);

    // GPS Handling
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationData(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        () => setLocationData("Access Denied / Not Found")
      );
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Sidebar */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white p-8 rounded-3xl border shadow-sm text-center">
            <div className="w-32 h-32 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-300 relative">
              <UserCircle size={100} />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full" />
            </div>
            <h2 className="text-2xl font-black">{MOCK_USER.name}</h2>
            <p className="text-slate-500 font-medium">Verified Applicant</p>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="text-indigo-400" size={20} />
              <span className="font-bold">Security Token</span>
            </div>
            <div className="space-y-3 opacity-80 text-sm">
              <div className="flex justify-between">
                <span>IP Address</span>
                <span className="font-mono">{ipAddress}</span>
              </div>
              <div className="flex justify-between">
                <span>GPS Coordinates</span>
                <span className="font-mono text-[10px]">{locationData}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="flex-1 bg-white p-8 rounded-3xl border shadow-sm space-y-8">
          <h3 className="text-xl font-bold border-b pb-4">Personal Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <InfoItem icon={<User size={18} />} label="Gender" value={MOCK_USER.gender} />
            <InfoItem icon={<Calendar size={18} />} label="Date of Birth" value={MOCK_USER.dob} />
            <InfoItem icon={<MapPin size={18} />} label="Current Location" value={MOCK_USER.location} />
            <InfoItem icon={<Briefcase size={18} />} label="Employment Type" value={MOCK_USER.employment} />
            <InfoItem icon={<Mail size={18} />} label="Email Address" value="sunita.v@example.com" />
            <InfoItem icon={<Phone size={18} />} label="Phone Number" value="+91 98XXX XXX54" />
          </div>

          <div className="pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">Verification Status</h3>
            <div className="space-y-4">
              <StatusCheck label="Aadhaar KYC" status="Success" />
              <StatusCheck label="PAN Verification" status="Success" />
              <StatusCheck label="Bank Statement Aggregator" status="In Progress" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
    <div className="text-indigo-600">{icon}</div>
    <div>
      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{label}</span>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  </div>
);

const StatusCheck = ({ label, status }: { label: string, status: 'Success' | 'In Progress' | 'Failed' }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
    <span className="font-medium text-slate-700">{label}</span>
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
      status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
    }`}>
      {status}
    </span>
  </div>
);

export default Account;
