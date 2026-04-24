import { useState } from "react";
import { depositAmount, withdrawAmount } from "../api/accountApi";
import { ArrowDownToLine, ArrowUpFromLine, AlertCircle, CheckCircle2 } from "lucide-react";

export default function DepositWithdraw() {
  const [activeTab, setActiveTab] = useState("deposit");
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      if (activeTab === "deposit") {
        await depositAmount(accountId, amount);
        setStatus({ type: "success", message: `Successfully deposited ₹${amount}` });
      } else {
        await withdrawAmount(accountId, amount);
        setStatus({ type: "success", message: `Successfully withdrew ₹${amount}` });
      }
      setAmount("");
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Transaction failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => { setActiveTab("deposit"); setStatus({ type: "", message: "" }); }}
            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === "deposit"
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <ArrowDownToLine className="w-5 h-5" />
            Deposit
          </button>
          <button
            onClick={() => { setActiveTab("withdraw"); setStatus({ type: "", message: "" }); }}
            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === "withdraw"
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <ArrowUpFromLine className="w-5 h-5" />
            Withdraw
          </button>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              {activeTab === "deposit" ? "Make a Deposit" : "Withdraw Funds"}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {activeTab === "deposit" 
                ? "Add funds securely to your account." 
                : "Withdraw funds from your account balance."}
            </p>
          </div>

          {status.message && (
            <div className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${
              status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              )}
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Account ID
              </label>
              <input
                required
                type="number"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                placeholder="e.g. 1001"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500">₹</span>
                <input
                  required
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              ) : activeTab === "deposit" ? (
                <>
                  <ArrowDownToLine className="w-5 h-5" />
                  Deposit Funds
                </>
              ) : (
                <>
                  <ArrowUpFromLine className="w-5 h-5" />
                  Withdraw Funds
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
