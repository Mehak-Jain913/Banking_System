import { Link } from "react-router-dom";
import { Building2, Globe, MessageCircle, Rss, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                NexusBank
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Experience the next generation of digital banking. Secure, fast, and built for your modern financial needs.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-700 transition-colors">
                <Rss className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-blue-600 transition-colors">Open Account</Link>
              </li>
              <li>
                <Link to="/transfer" className="hover:text-blue-600 transition-colors">Transfer Money</Link>
              </li>
              <li>
                <Link to="/transaction" className="hover:text-blue-600 transition-colors">Deposit / Withdraw</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              </li>
              <li className="flex items-center gap-2 mt-4 text-slate-600">
                <Mail className="w-4 h-4" /> support@nexusbank.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} NexusBank. All rights reserved.</p>
          <p>Designed with <span className="text-red-500">♥</span> for modern finance.</p>
        </div>
      </div>
    </footer>
  );
}