import './Dashboard.css';
import SideBar from '../../components/SideBar/SideBar';
import NavBar from '../../components/NavBar/NavBar';
import { useState } from 'react';
import Transactions from '../../components/Transactions/Transactions';
import CashRegister from '../../components/CashRegister/CashRegister';
import Offices from '../../components/Offices/Offices';
import Users from '../../components/Users/Users';

const Dashboard = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('transactions');
  const handleNavItemChange = (navItem) => {
      setSelectedNavItem(navItem);
  };
    return(
      <section className='container-dashboard'>
        <div>
            <SideBar />
        </div>
        <div className='main'>
            <main>
            {selectedNavItem === 'transactions' && <Transactions />}
            {selectedNavItem === 'cash-register' && <CashRegister />}
            {selectedNavItem === 'offices' && <Offices />}
            {selectedNavItem === 'users' && <Users />}
            </main>
        </div>

      </section>
    )
}
export default Dashboard;
