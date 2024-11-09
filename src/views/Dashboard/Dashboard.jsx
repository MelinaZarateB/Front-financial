import "./Dashboard.css";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";
import Transactions from "../../components/Transactions/Transactions";
import Income from "../../components/Income/Income";
import Expense from "../../components/Expense/Expense";
import Balance from "../../components/Balance/Balance";
import Movements from "../../components/Movements/Movements";
import Clients from "../../components/Clients/Clients";
import Offices from "../../components/Offices/Offices";
import Users from "../../components/Users/Users";
import CashRegisterOpen from "../../components/CashRegisterOpen/CashRegisterOpen";
import CashRegisterClose from "../../components/CashRegisterClose/CashRegisterClose";
import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { X } from "lucide-react";

const Dashboard = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("transactions");
  const [pestañasAbiertas, setPestañasAbiertas] = useState(["transactions"]);
  const [pestañaActiva, setPestañaActiva] = useState("transactions");

  const nombresPestañas = {
    transactions: "Transacciones",
    opening: "Apertura",
    close: "Cierre",
    incomes: "Ingresos",
    expenses: "Egresos",
    balance: "Balance",
    movements: "Movimientos",
    clients: "Clientes",
    offices: "Oficinas",
    users: "Usuarios",
  };

  const componentes = {
    transactions: <Transactions />,
    opening: <CashRegisterOpen />,
    close: <CashRegisterClose />,
    incomes: <Income />,
    expenses: <Expense />,
    balance: <Balance />,
    movements: <Movements />,
    clients: <Clients />,
    offices: <Offices />,
    users: <Users />,
  };

  const abrirPestaña = (nombreComponente) => {
    if (!pestañasAbiertas.includes(nombreComponente)) {
      setPestañasAbiertas([...pestañasAbiertas, nombreComponente]);
    }
    setPestañaActiva(nombreComponente);
  };

  const cerrarPestaña = (e, nombreComponente) => {
    e.stopPropagation(); // Previene que se active la pestaña al cerrarla
    
    const index = pestañasAbiertas.indexOf(nombreComponente);
    const nuevasPestañas = pestañasAbiertas.filter(p => p !== nombreComponente);
    
    // Si no quedan pestañas, establecemos transactions como pestaña por defecto
    if (nuevasPestañas.length === 0) {
      setPestañasAbiertas(["transactions"]);
      setPestañaActiva("transactions");
      setSelectedNavItem("transactions");
      return;
    }

    setPestañasAbiertas(nuevasPestañas);
    
    // Si la pestaña que se cierra es la activa, activamos la siguiente pestaña disponible
    if (pestañaActiva === nombreComponente) {
      // Si hay una pestaña siguiente, la seleccionamos
      if (index < nuevasPestañas.length) {
        setPestañaActiva(nuevasPestañas[index]);
        setSelectedNavItem(nuevasPestañas[index]);
      } else {
        // Si no hay pestaña siguiente, seleccionamos la última disponible
        setPestañaActiva(nuevasPestañas[nuevasPestañas.length - 1]);
        setSelectedNavItem(nuevasPestañas[nuevasPestañas.length - 1]);
      }
    }
  };

  const handleNavItemChange = (e, navItem) => {
    e.preventDefault();
    abrirPestaña(navItem);
    setSelectedNavItem(navItem);
  };

  return (
    <section className="container-dashboard">
      <div>
        <SideBar
          onNavItemChange={handleNavItemChange}
          selectedNavItem={selectedNavItem}
        />
      </div>
      <div className="main">
        <div style={{backgroundColor: '#E5E5E5'}} >
        <Tabs value={pestañaActiva} onValueChange={setPestañaActiva} style={{paddingLeft: '2rem'}}>
          <TabsList className="tabs-container bg-neutral-200" >
            {pestañasAbiertas.map((nombreComponente) => (
              <TabsTrigger
                key={nombreComponente}
                value={nombreComponente}
                className={`tab flex items-center ${pestañaActiva === nombreComponente ? "active-tab" : ""}`}
              >
                {nombresPestañas[nombreComponente]}
                <Button
                style={{width: '100%'}}
                variant="ghost"
                size="ml"
                className="ml-3 p-0 w-full"
                
                  onClick={(e) => cerrarPestaña(e, nombreComponente)}
                >
                  <X size={14} />
                </Button>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        </div>

        <main>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {componentes[pestañaActiva]}
          </LocalizationProvider>
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
