import "./SideBar.css";
import { useState } from "react";

const SideBar = ({ onNavItemChange, selectedNavItem }) => {
  const [subMenus, setSubMenus] = useState({});
  const [rotated, setRotated] = useState(false);
  const [sideBarClose, setSideBarClose] = useState(false);
  const [closedSide, setClosedSide] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleSubMenu = (menuName) => {
    setSubMenus((prevSubMenus) => ({
      ...prevSubMenus,
      [menuName]: !prevSubMenus[menuName], // Cambia el estado solo del submenú específico
    }));
  };
  const toggleSideBar = () => {
    const toggleButton = document.getElementById("toggle-btn");
    const sideBar = document.getElementById("sidebar");
    // setSideBarClose(true)
    toggleSideBar2(sideBar, toggleButton);
  };
  const toggleSideBar2 = (sideBar, toggleButton) => {
    sideBar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
    Array.from(sideBar.getElementsByClassName("show")).forEach((ul) => {
      ul.classList.remove("show");
      setRotated(false);
      setSubMenus({});
    });
  };
  const handleOpenSide = () => {
    //setClosedSide(true)
    const sideBar = document.getElementById("sidebar");
    const toggleButton = document.getElementById("toggle-btn");
    if (sideBar.classList.contains("close")) {
      sideBar.classList.remove("close");
      toggleButton.classList.toggle("rotate");
    }
  };
  const isActiveLink = () => {
    if (!isActive) setIsActive(true);
  };
  return (
    <aside id="sidebar">
      <ul>
        <li>
          <span
            className="logo"
            style={{ color: "#F3F3F3", fontWeight: "600" }}
          >
            Servicios Financieros
          </span>
          <button id="toggle-btn" onClick={toggleSideBar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
            </svg>
          </button>
        </li>
        <li onClick={(e) => onNavItemChange(e, "transactions")}>
          <a href="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: selectedNavItem === 'transactions' ? 'white' : '' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 11L21 7L17 3"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 7H9"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 21L3 17L7 13"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 17H3"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className={selectedNavItem === 'transactions' ? 'spannn' : ''}>Transacciones</span>
          </a>
        </li>
        <li
          onClick={() => {
            handleOpenSide(); // Luego llama a handleOpenSide
            setRotated(!rotated); // Primero cambia el estado de rotated
          }}
        >
          <button
            onClick={() => toggleSubMenu("caja")}
            className="dropdown-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M280-640q-33 0-56.5-23.5T200-720v-80q0-33 23.5-56.5T280-880h400q33 0 56.5 23.5T760-800v80q0 33-23.5 56.5T680-640H280Zm0-80h400v-80H280v80ZM160-80q-33 0-56.5-23.5T80-160v-40h800v40q0 33-23.5 56.5T800-80H160ZM80-240l139-313q10-22 30-34.5t43-12.5h376q23 0 43 12.5t30 34.5l139 313H80Zm260-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Z" />
            </svg>
            <span>Caja</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
              className={` ${rotated ? "rotate" : ""}`}
            >
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          </button>
          <ul className={`sub-menu ${subMenus["caja"] ? "show" : ""}`}>
            <div>
              <li>
                <a href="">Inicio</a>
              </li>
              <li>
                <a href="">Cierre</a>
              </li>
              <li>
                <a href="">Dia anterior</a>
              </li>
            </div>
          </ul>
        </li>
        <li onClick={(e) => onNavItemChange(e, "incomes")}>
          <a href="">
          <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ fill: "none" }}
            >
              <path
                d="M20.5 15H14.5M14.5 15L17 12.5M14.5 15L17 17.5"
                stroke="white"
                stroke-opacity={selectedNavItem === 'incomes' ? '1' : '0.7'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.5 11V3C20.5 2.60218 20.342 2.22064 20.0607 1.93934C19.7794 1.65804 19.3978 1.5 19 1.5H3C2.60218 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60218 1.5 3V17C1.5 17.3978 1.65804 17.7794 1.93934 18.0607C2.22064 18.342 2.60218 18.5 3 18.5H13.235"
                stroke="white"
                stroke-opacity={selectedNavItem === 'incomes' ? '1' : '0.7'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 5V15"
                stroke="white"
                stroke-opacity={selectedNavItem === 'incomes' ? '1' : '0.7'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.5 6.5H7.75C7.28587 6.5 6.84075 6.68437 6.51256 7.01256C6.18437 7.34075 6 7.78587 6 8.25C6 8.71413 6.18437 9.15925 6.51256 9.48744C6.84075 9.81563 7.28587 10 7.75 10H10.25C10.7141 10 11.1592 10.1844 11.4874 10.5126C11.8156 10.8408 12 11.2859 12 11.75C12 12.2141 11.8156 12.6592 11.4874 12.9874C11.1592 13.3156 10.7141 13.5 10.25 13.5H6"
                stroke="white"
                stroke-opacity={selectedNavItem === 'incomes' ? '1' : '0.7'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>


            <span className={selectedNavItem === 'incomes' ? 'spannn' : ''}>Ingresos</span>
          </a>
        </li>
        <li onClick={(e) => onNavItemChange(e, "expenses")}>
          <a href="">
          <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ fill: "none" }}
            >
              <path
                d="M14.5 15H20.5M20.5 15L18 17.5M20.5 15L18 12.5"
                stroke="white"
                stroke-opacity={selectedNavItem === 'expenses' ? '1' : '0.7'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.5 11V3C20.5 2.60218 20.342 2.22064 20.0607 1.93934C19.7794 1.65804 19.3978 1.5 19 1.5H3C2.60218 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60218 1.5 3V17C1.5 17.3978 1.65804 17.7794 1.93934 18.0607C2.22064 18.342 2.60218 18.5 3 18.5H13.235"
                stroke="white"
                stroke-opacity={selectedNavItem === 'expenses' ? '1' : '0.7'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 5V15"
                stroke="white"
                stroke-opacity={selectedNavItem === 'expenses' ? '1' : '0.7'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.5 6.5H7.75C7.28587 6.5 6.84075 6.68437 6.51256 7.01256C6.18437 7.34075 6 7.78587 6 8.25C6 8.71413 6.18437 9.15925 6.51256 9.48744C6.84075 9.81563 7.28587 10 7.75 10H10.25C10.7141 10 11.1592 10.1844 11.4874 10.5126C11.8156 10.8408 12 11.2859 12 11.75C12 12.2141 11.8156 12.6592 11.4874 12.9874C11.1592 13.3156 10.7141 13.5 10.25 13.5H6"
                stroke="white"
                stroke-opacity={selectedNavItem === 'expenses' ? '1' : '0.7'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className={selectedNavItem === 'expenses' ? 'spannn' : ''}>Egresos</span>
          </a>
        </li>
        <li onClick={(e) => onNavItemChange(e, "balance")}>
          <a href="">
          <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ fill: "none" }}
            >
              <path
                d="M20 12V8H6C5.46957 8 4.96086 7.78929 4.58579 7.41421C4.21071 7.03914 4 6.53043 4 6C4 4.9 4.9 4 6 4H18V8"
                stroke="white"
                stroke-opacity={selectedNavItem === 'balance' ? '1' : '0.7'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 6V18C4 19.1 4.9 20 6 20H20V16"
                stroke="white"
                stroke-opacity={selectedNavItem === 'balance' ? '1' : '0.7'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 12C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 15.1 16.9 16 18 16H22V12H18Z"
                stroke="white"
                stroke-opacity={selectedNavItem === 'balance' ? '1' : '0.7'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className={selectedNavItem === 'balance' ? 'spannn' : ''}>Balance</span>
          </a>
        </li>
        <li onClick={(e) => onNavItemChange(e, "movements")}>
          <a href="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 25"
              style={{ fill: selectedNavItem === 'movements' ? 'white' : 'rgba(255, 255, 255, 0.7)' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 19.7447H5V3.74468C5 3.47946 4.89464 3.22511 4.7071 3.03757C4.51957 2.85003 4.26521 2.74468 4 2.74468C3.73478 2.74468 3.48043 2.85003 3.29289 3.03757C3.10535 3.22511 3 3.47946 3 3.74468V20.7447C3 21.0099 3.10535 21.2642 3.29289 21.4518C3.48043 21.6393 3.73478 21.7447 4 21.7447H21C21.2652 21.7447 21.5196 21.6393 21.7071 21.4518C21.8946 21.2642 22 21.0099 22 20.7447C22 20.4795 21.8946 20.2251 21.7071 20.0376C21.5196 19.85 21.2652 19.7447 21 19.7447Z"
                fill="rgba(255, 255, 255, 0.7);"
              />
              <path
                d="M7.00002 11.7447V16.7447C7.00002 17.0099 7.10538 17.2643 7.29292 17.4518C7.48045 17.6393 7.73481 17.7447 8.00002 17.7447C8.26524 17.7447 8.51959 17.6393 8.70713 17.4518C8.89467 17.2643 9.00002 17.0099 9.00002 16.7447V11.7447C9.00002 11.4795 8.89467 11.2251 8.70713 11.0376C8.51959 10.8501 8.26524 10.7447 8.00002 10.7447C7.73481 10.7447 7.48045 10.8501 7.29292 11.0376C7.10538 11.2251 7.00002 11.4795 7.00002 11.7447Z"
                fill="rgba(255, 255, 255, 0.7);"
              />
              <path
                d="M11 6.74468V16.7447C11 17.0099 11.1053 17.2642 11.2929 17.4518C11.4804 17.6393 11.7348 17.7447 12 17.7447C12.2652 17.7447 12.5195 17.6393 12.7071 17.4518C12.8946 17.2642 13 17.0099 13 16.7447V6.74468C13 6.47946 12.8946 6.22511 12.7071 6.03757C12.5195 5.85004 12.2652 5.74468 12 5.74468C11.7348 5.74468 11.4804 5.85004 11.2929 6.03757C11.1053 6.22511 11 6.47946 11 6.74468Z"
                fill="rgba(255, 255, 255, 0.7);"
              />
              <path
                d="M15 8.7447V16.7447C15 17.0099 15.1054 17.2643 15.2929 17.4518C15.4804 17.6393 15.7348 17.7447 16 17.7447C16.2652 17.7447 16.5196 17.6393 16.7071 17.4518C16.8946 17.2643 17 17.0099 17 16.7447V8.7447C17 8.47948 16.8946 8.22513 16.7071 8.03759C16.5196 7.85005 16.2652 7.7447 16 7.7447C15.7348 7.7447 15.4804 7.85005 15.2929 8.03759C15.1054 8.22513 15 8.47948 15 8.7447Z"
                fill="rgba(255, 255, 255, 0.7);"
              />
              <path
                d="M19 3.74468V16.7447C19 17.0099 19.1054 17.2642 19.2929 17.4518C19.4805 17.6393 19.7348 17.7447 20 17.7447C20.2652 17.7447 20.5196 17.6393 20.7071 17.4518C20.8947 17.2642 21 17.0099 21 16.7447V3.74468C21 3.47946 20.8947 3.22511 20.7071 3.03757C20.5196 2.85003 20.2652 2.74468 20 2.74468C19.7348 2.74468 19.4805 2.85003 19.2929 3.03757C19.1054 3.22511 19 3.47946 19 3.74468V3.74468Z"
                fill="rgba(255, 255, 255, 0.7);"
              />
            </svg>
            <span className={selectedNavItem === 'movements' ? 'spannn' : ''}>Movimientos</span>
          </a>
        </li>
        <li onClick={(e) => onNavItemChange(e, "clients")}>
          <a href="">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"    style={{ fill: selectedNavItem === 'clients' ? 'white' : 'rgba(255, 255, 255, 0.7)' }}><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Zm-160 80h-80v440h80v-440Zm400 440v-440H320v440h320Zm80-440v440h80v-440h-80ZM480-420Z"/></svg>
            <span className={selectedNavItem === 'clients' ? 'spannn' : ''}>Clientes</span>
          </a>
        </li>
        <li onClick={(e) => onNavItemChange(e, "offices")}>
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              style={{ fill: selectedNavItem === 'offices' ? 'white' : 'rgba(255, 255, 255, 0.7)' }}
            >
              <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
            </svg>
            <span className={selectedNavItem === 'offices' ? 'spannn' : ''}>Sucursales</span>
          </a>
        </li>
        <li onClick={(e) => onNavItemChange(e, "users")}>
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              style={{ fill: selectedNavItem === 'users' ? 'white' : 'rgba(255, 255, 255, 0.7)' }}
            >
              <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
            </svg>
            <span className={selectedNavItem === 'users' ? 'spannn' : ''}>Usuarios</span>
          </a>
        </li>
        <li style={{marginTop: '15px'}}>
          <a href="" className="exit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
            <span>Salir</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};
export default SideBar;
