import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAccount } from "../api/accountApi";
import { ArrowLeft, User, Wallet, Phone, Mail, Hash, Activity } from "lucide-react";

export default function AccountDetails() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAccount(id)
      .then((data) => {
        setAccount(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !account) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-red-50 text-red-800 rounded-2xl flex flex-col items-center gap-4">
        <Activity className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-bold">Account Not Found</h2>
        <p>We couldn't fetch details for account #{id}</p>
        <Link to="/" className="mt-4 px-6 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium transition-colors">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white flex justify-between items-end">
          <div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm mb-4 inline-block uppercase tracking-wider">
              {account.accountType} Account
            </span>
            <h1 className="text-3xl font-bold">{account.accountHolderName}</h1>
            <p className="text-blue-100 mt-2 flex items-center gap-2">
              <Hash className="w-4 h-4" /> {account.accountNumber || account.id}
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm mb-1">Available Balance</p>
            <p className="text-4xl font-bold">₹{account.balance?.toLocaleString()}</p>
          </div>
        </div>

        {/* Details Grids */}
        <div className="p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" /> Account Owner Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="bg-blue-100 p-3 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Full Name</p>
                <p className="text-slate-800 font-semibold">{account.accountHolderName}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="bg-green-100 p-3 rounded-lg">
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Account Type</p>
                <p className="text-slate-800 font-semibold capitalize">{account.accountType?.toLowerCase()}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Email Address</p>
                <p className="text-slate-800 font-semibold">{account.email || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Phone className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Phone Number</p>
                <p className="text-slate-800 font-semibold">{account.phoneNumber || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Future Ready Placeholder for transactions */}
          <div className="mt-10 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" /> Recent Transactions
            </h3>
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
              <p className="text-slate-500">Transaction history will appear here once available.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
