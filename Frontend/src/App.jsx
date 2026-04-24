import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import Transfer from "./pages/Transfer";
import DepositWithdraw from "./pages/DepositWithdraw";
import AccountDetails from "./pages/AccountDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
        <Navbar />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateAccount />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/transaction" element={<DepositWithdraw />} />
            <Route path="/account/:id" element={<AccountDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;