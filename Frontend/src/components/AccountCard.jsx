import { Link } from "react-router-dom";
import { User, Wallet, ArrowRight, TrendingUp } from "lucide-react";

export default function AccountCard({ account }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-50 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {account.accountType}
          </span>
        </div>
        
        <h2 className="text-xl font-bold text-slate-800 mb-1">{account.accountHolderName}</h2>
        <p className="text-sm text-slate-500 flex items-center gap-1">
          Account ID: {account.accountNumber || account.id}
        </p>

        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500 font-medium mb-1 flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-slate-400" /> Current Balance
          </p>
          <p className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            ₹{account.balance?.toLocaleString() || "0"}
            <TrendingUp className="w-4 h-4 text-green-500" />
          </p>
        </div>
      </div>
      
      <Link 
        to={`/account/${account.id}`}
        className="bg-slate-50 px-6 py-4 border-t border-slate-100 text-sm font-semibold text-blue-600 flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors duration-300"
      >
        View Full Details
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}