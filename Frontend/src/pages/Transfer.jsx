import { useState } from "react";
import { transferMoney } from "../api/accountApi";
import { Send, ArrowRightLeft, CreditCard, Hash, CheckCircle2, AlertCircle } from "lucide-react";

export default function Transfer() {
  const [data, setData] = useState({
    from: "",
    to: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await transferMoney(data.from, data.to, data.amount);
      setStatus({ type: "success", message: `₹${data.amount} transferred successfully from Account ${data.from} to ${data.to}.` });
      setData({ from: "", to: "", amount: "" }); // Reset form
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Transfer failed. Please check account details and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <ArrowRightLeft className="w-32 h-32 transform translate-x-8 -translate-y-8" />
          </div>
          <h1 className="text-2xl font-bold relative z-10">Transfer Money</h1>
          <p className="text-blue-100 mt-2 relative z-10">Instant funds transfer between banking accounts.</p>
        </div>

        <div className="p-8">
          {status.message && (
            <div className={`p-4 rounded-xl mb-8 flex items-start gap-3 ${
              status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
              )}
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6 relative">
              {/* Transfer Connection Line */}
              <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-200 hidden md:block z-0"></div>

              <div className="relative z-10 bg-white">
                <label className="block text-sm font-medium text-slate-700 mb-2">From Account</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="text-xs font-bold mr-1">FR</span>
                    <Hash className="h-4 w-4" />
                  </div>
                  <input
                    required
                    type="number"
                    value={data.from}
                    onChange={(e) => setData({ ...data, from: e.target.value })}
                    placeholder="Sender Account ID"
                    className="pl-14 w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="relative z-10 bg-white">
                <label className="block text-sm font-medium text-slate-700 mb-2">To Account</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="text-xs font-bold mr-1">TO</span>
                    <Hash className="h-4 w-4" />
                  </div>
                  <input
                    required
                    type="number"
                    value={data.to}
                    onChange={(e) => setData({ ...data, to: e.target.value })}
                    placeholder="Recipient Account ID"
                    className="pl-14 w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Transfer Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-500 ml-2 font-medium">₹</span>
                </div>
                <input
                  required
                  type="number"
                  min="1"
                  value={data.amount}
                  onChange={(e) => setData({ ...data, amount: e.target.value })}
                  placeholder="0.00"
                  className="pl-14 w-full px-4 py-4 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-indigo-700 hover:shadow-lg active:scale-[0.99]"
              }`}
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Money Now
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}