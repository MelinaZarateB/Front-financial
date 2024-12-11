import "./Dashboard.css";
import SideBar from "../../components/SideBar/SideBar";
import React, { useState, Suspense } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import Spinner from "@/utils/Spinner/Spinner";

const Transactions = React.lazy(() => import("../../components/Transactions/Transactions"));
const CashRegisterOpen = React.lazy(() => import("../../components/CashRegisterOpen/CashRegisterOpen"));
const CashRegisterClose = React.lazy(() => import("../../components/CashRegisterClose/CashRegisterClose"));
const Income = React.lazy(() => import("../../components/Income/Income"));
const Expense = React.lazy(() => import("../../components/Expense/Expense"));
const Movements = React.lazy(() => import("../../components/Movements/Movements"));
const Offices = React.lazy(() => import("../../components/Offices/Offices"));
const Users = React.lazy(() => import("../../components/Users/Users"));
const Clients = React.lazy(() => import("../../components/Clients/Clients"));


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
    transactions: Transactions,
    opening: CashRegisterOpen,
    close: CashRegisterClose,
    incomes: Income,
    expenses: Expense,
   // balance: Balance,
    movements: Movements,
    clients: Clients,
    offices: Offices,
    users: Users,
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
        <Suspense fallback={<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Spinner /></div>}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {pestañasAbiertas.map((nombreComponente) => {
              const ComponenteActual = componentes[nombreComponente];
              return (
                <div
                  key={nombreComponente}
                  style={{
                    display: pestañaActiva === nombreComponente ? 'block' : 'none'
                  }}
                >
                  <ComponenteActual />
                </div>
              );
            })}
          </LocalizationProvider>
          </Suspense>
        </main>
      </div>
    </section>
  );
};
export default Dashboard;