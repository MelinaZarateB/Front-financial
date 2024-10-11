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
        <li
          className="active"
          onClick={() => {
            handleOpenSide();
            isActiveLink();
          }}
        >
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M480-40q-112 0-206-51T120-227v107H40v-240h240v80h-99q48 72 126.5 116T480-120q75 0 140.5-28.5t114-77q48.5-48.5 77-114T840-480h80q0 91-34.5 171T791-169q-60 60-140 94.5T480-40Zm-36-160v-52q-47-11-76.5-40.5T324-370l66-26q12 41 37.5 61.5T486-314q33 0 56.5-15.5T566-378q0-29-24.5-47T454-466q-59-21-86.5-50T340-592q0-41 28.5-74.5T446-710v-50h70v50q36 3 65.5 29t40.5 61l-64 26q-8-23-26-38.5T482-648q-35 0-53.5 15T410-592q0 26 23 41t83 35q72 26 96 61t24 77q0 29-10 51t-26.5 37.5Q583-274 561-264.5T514-250v50h-70ZM40-480q0-91 34.5-171T169-791q60-60 140-94.5T480-920q112 0 206 51t154 136v-107h80v240H680v-80h99q-48-72-126.5-116T480-840q-75 0-140.5 28.5t-114 77q-48.5 48.5-77 114T120-480H40Z" />
            </svg>
            <span>Transacciones</span>
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
        <li
          className="active"
          onClick={() => {
            handleOpenSide();
            isActiveLink();
          }}
        >
          <a href="">
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{fill: 'none'}}
            >
              <path
                d="M20.5 15H14.5M14.5 15L17 12.5M14.5 15L17 17.5"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.5 11V3C20.5 2.60218 20.342 2.22064 20.0607 1.93934C19.7794 1.65804 19.3978 1.5 19 1.5H3C2.60218 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60218 1.5 3V17C1.5 17.3978 1.65804 17.7794 1.93934 18.0607C2.22064 18.342 2.60218 18.5 3 18.5H13.235"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 5V15"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.5 6.5H7.75C7.28587 6.5 6.84075 6.68437 6.51256 7.01256C6.18437 7.34075 6 7.78587 6 8.25C6 8.71413 6.18437 9.15925 6.51256 9.48744C6.84075 9.81563 7.28587 10 7.75 10H10.25C10.7141 10 11.1592 10.1844 11.4874 10.5126C11.8156 10.8408 12 11.2859 12 11.75C12 12.2141 11.8156 12.6592 11.4874 12.9874C11.1592 13.3156 10.7141 13.5 10.25 13.5H6"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span>Ingresos</span>
          </a>
        </li>
        <li
          className="active"
          onClick={() => {
            handleOpenSide();
            isActiveLink();
          }}
        >
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
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.5 11V3C20.5 2.60218 20.342 2.22064 20.0607 1.93934C19.7794 1.65804 19.3978 1.5 19 1.5H3C2.60218 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60218 1.5 3V17C1.5 17.3978 1.65804 17.7794 1.93934 18.0607C2.22064 18.342 2.60218 18.5 3 18.5H13.235"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 5V15"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.5 6.5H7.75C7.28587 6.5 6.84075 6.68437 6.51256 7.01256C6.18437 7.34075 6 7.78587 6 8.25C6 8.71413 6.18437 9.15925 6.51256 9.48744C6.84075 9.81563 7.28587 10 7.75 10H10.25C10.7141 10 11.1592 10.1844 11.4874 10.5126C11.8156 10.8408 12 11.2859 12 11.75C12 12.2141 11.8156 12.6592 11.4874 12.9874C11.1592 13.3156 10.7141 13.5 10.25 13.5H6"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span>Egresos</span>
          </a>
        </li>
        <li
          className="active"
          onClick={() => {
            handleOpenSide();
            isActiveLink();
          }}
        >
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
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 6V18C4 19.1 4.9 20 6 20H20V16"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 12C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 15.1 16.9 16 18 16H22V12H18Z"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Balance</span>
          </a>
        </li>
        <li onClick={(e) => onNavItemChange(e, "offices")}>
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
            </svg>
            <span>Sucursales</span>
          </a>
        </li>
        <li onClick={(e) => onNavItemChange(e, "users")}>
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
            </svg>
            <span>Usuarios</span>
          </a>
        </li>
        <li>
          <a href="">
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
