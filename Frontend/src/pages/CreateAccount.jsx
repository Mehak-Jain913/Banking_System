import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../api/accountApi";
import AccountForm from "../components/AccountForm";
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await createAccount(formData);
      setStatus({ type: "success", message: "Account created successfully!" });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to create account. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-slate-800">Open New Account</h1>
          <p className="text-slate-500 mt-2">Fill in the details below to create a new banking account.</p>
        </div>

        <div className="p-8">
          {status.message && (
            <div className={`p-4 rounded-xl mb-8 flex items-start gap-3 ${
              status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
              )}
              <div>
                <p className="text-sm font-semibold">{status.type === 'success' ? 'Success!' : 'Error'}</p>
                <p className="text-sm mt-1">{status.message}</p>
                {status.type === 'success' && <p className="text-xs text-green-600 mt-2">Redirecting to dashboard...</p>}
              </div>
            </div>
          )}

          <AccountForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
}