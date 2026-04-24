import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAccounts } from "../api/accountApi";
import AccountCard from "../components/AccountCard";
import { Wallet, Users, PlusCircle, Activity } from "lucide-react";

export default function Home() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAccounts()
      .then((data) => {
        setAccounts(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Header & Summary Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Manage your accounts and track activities.</p>
        </div>
        <Link 
          to="/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors duration-200 flex items-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New Account
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pt-4 pr-4">
            <Wallet className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <p className="text-blue-100 font-medium mb-2">Total System Balance</p>
            <h2 className="text-4xl font-bold">₹{totalBalance.toLocaleString()}</h2>
            <p className="text-blue-200 text-sm mt-4">+2.4% from last month</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-6">
          <div className="bg-indigo-50 p-4 rounded-xl">
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <p className="text-slate-500 font-medium mb-1">Total Active Accounts</p>
            <h2 className="text-3xl font-bold text-slate-800">{accounts.length}</h2>
          </div>
        </div>
      </div>

      {/* Accounts List Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-slate-500" />
          <h2 className="text-xl font-bold text-slate-800">All Accounts</h2>
        </div>

        {accounts.length === 0 ? (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <Wallet className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No accounts found</h3>
            <p className="text-slate-500 mb-6">Start by creating a new account to see it here.</p>
            <Link 
              to="/create" 
              className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
            >
              <PlusCircle className="w-5 h-5" />
              Create First Account
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((acc) => (
              <AccountCard key={acc.id} account={acc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}