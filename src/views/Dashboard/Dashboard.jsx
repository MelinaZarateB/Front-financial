import "./Dashboard.css";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";
import Transactions from "../../components/Transactions/Transactions";
import CashRegister from "../../components/CashRegister/CashRegister";
import Income from "../../components/Income/Income";
import Expense from "../../components/Expense/Expense";
import Balance from "../../components/Balance/Balance";
import Movements from "../../components/Movements/Movements";
import Clients from "../../components/Clients/Clients";
import Offices from "../../components/Offices/Offices";
import Users from "../../components/Users/Users";
import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const Dashboard = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("transactions");
  const handleNavItemChange = (e, navItem) => {
    e.preventDefault();
    setSelectedNavItem(navItem);
  };
  useEffect(() => {

  },[selectedNavItem])

  return (
    <section className="container-dashboard">
      <div>
        <SideBar onNavItemChange={handleNavItemChange} selectedNavItem={selectedNavItem} />
      </div>
      <div className="main">
        <main>
          {selectedNavItem === "transactions" && <LocalizationProvider dateAdapter={AdapterDayjs}><Transactions /></LocalizationProvider>}
          {selectedNavItem === "cash-register" && <CashRegister />}
          {selectedNavItem === "incomes" &&  <LocalizationProvider dateAdapter={AdapterDayjs}><Income /> </LocalizationProvider>}
          {selectedNavItem === "expenses" && <LocalizationProvider dateAdapter={AdapterDayjs}><Expense />  </LocalizationProvider>}
          {selectedNavItem === "balance" && <Balance />}
          {selectedNavItem === 'movements' && <Movements />}
          {selectedNavItem === 'clients' && <Clients />}
          {selectedNavItem === "offices" && <Offices />}
          {selectedNavItem === "users" && <Users />}
        </main>
      </div>
    </section>
  );
};
export default Dashboard;
