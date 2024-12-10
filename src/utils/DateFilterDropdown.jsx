import { useState, useCallback } from "react";

const DateFilterDropdown = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = useCallback(
    (event) => {
      const value = event.target.value;
      setSelectedFilter(value);
      let dateFilter = "";

      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      switch (value) {
        case "today":
          dateFilter = `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
          break;
        case "currentMonth":
          dateFilter = `${year}-${month.toString().padStart(2, "0")}`;
          break;
        case "previousMonth":
          const previousMonth = month === 1 ? 12 : month - 1;
          const previousMonthYear = month === 1 ? year - 1 : year;
          dateFilter = `${previousMonthYear}-${previousMonth
            .toString()
            .padStart(2, "0")}`;
          break;
        default:
          dateFilter = "";
      }

      onFilterChange(dateFilter);
    },
    [onFilterChange]
  );

  return (
    <div className="input-box-dashboard">
      <div className={`select-container ${selectedFilter ? "has-value" : ""}`}>
        <select
          style={{
            color: selectedFilter
              ? "#000"
              : "#555",
            cursor: "pointer",
          }}
          className="input-field-dashboard select"
          onChange={handleFilterChange}
          value={selectedFilter}
        >
          <option value="">Filtrar rápido por fechas</option>
          <option value="today">Hoy</option>
          <option value="currentMonth">Mes actual</option>
          <option value="previousMonth">Mes anterior</option>
        </select>
        <div
          className="floating-label"
          
        >
          Filtrar por
        </div>
      </div>
    </div>
  );
};

export default DateFilterDropdown;
