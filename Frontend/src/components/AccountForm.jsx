import { useState } from "react";
import { User, Wallet, Hash, Phone, Mail, Building2, ChevronRight } from "lucide-react";

export default function AccountForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    accountNumber: "",
    accountHolderName: "",
    balance: "",
    accountType: "SAVINGS",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.accountNumber) newErrors.accountNumber = "Account number is required";
    if (!form.accountHolderName) newErrors.accountHolderName = "Holder name is required";
    if (!form.balance || Number(form.balance) < 0) newErrors.balance = "Valid initial balance is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Details Section */}
        <div className="space-y-6 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Account Number *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  placeholder="e.g. 10002938"
                  className={`pl-10 w-full px-4 py-3 rounded-xl border ${errors.accountNumber ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'} focus:ring-2 focus:border-transparent outline-none transition-all`}
                />
              </div>
              {errors.accountNumber && <p className="mt-1 text-sm text-red-500">{errors.accountNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Account Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  name="accountType"
                  value={form.accountType}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                >
                  <option value="SAVINGS">Savings Account</option>
                  <option value="CURRENT">Current Account</option>
                  <option value="SALARY">Salary Account</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronRight className="h-5 w-5 text-slate-400 rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="space-y-6 md:col-span-2">
          <hr className="border-slate-200" />
          <h3 className="text-lg font-semibold text-slate-800">Personal Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  name="accountHolderName"
                  value={form.accountHolderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`pl-10 w-full px-4 py-3 rounded-xl border ${errors.accountHolderName ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'} focus:ring-2 focus:border-transparent outline-none transition-all`}
                />
              </div>
              {errors.accountHolderName && <p className="mt-1 text-sm text-red-500">{errors.accountHolderName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Initial Deposit (₹) *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Wallet className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  name="balance"
                  type="number"
                  value={form.balance}
                  onChange={handleChange}
                  placeholder="5000"
                  className={`pl-10 w-full px-4 py-3 rounded-xl border ${errors.balance ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'} focus:ring-2 focus:border-transparent outline-none transition-all`}
                />
              </div>
              {errors.balance && <p className="mt-1 text-sm text-red-500">{errors.balance}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="pl-10 w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="pl-10 w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
          }`}
        >
          {loading ? (
            <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          ) : (
            'Create Account'
          )}
        </button>
      </div>
    </form>
  );
}