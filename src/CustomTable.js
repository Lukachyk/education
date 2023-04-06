import React, { useContext } from "react";
import MyContext from "./context";

function CustomTable() {
  const {
    book,
    header,
    selectedMonth,
    setSelectedMonth,
    formatDate,
    unpaidSeats,
    retrunBtn,
    returnDataFile,
  } = useContext(MyContext);

  const formatCellValue = (value, index) =>
    typeof value === "number" && value >= 0 ? (
      <button
        className={selectedMonth === index ? "btn green" : "btn"}
        onClick={() => setSelectedMonth(index)}
      >
        {formatDate(value, { month: "long" })}
      </button>
    ) : (
      value
    );

  const formatCellValueII = (value, index) =>
    typeof value === "number" && value >= 0 && index > 4 && index % 2 === 1
      ? formatDate(value, {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        })
      : value;

  return (
    <div>
      <div className="menu">
        {selectedMonth !== null && (
          <div className="btn">
            <p>Найти неоплаченный абонент</p>
            <button onClick={unpaidSeats}>Поиск</button>
          </div>
        )}
        {retrunBtn && (
          <div className="btn">
            <p>Вернуть изначальную таблицу</p>
            <button onClick={returnDataFile}>Вернуть</button>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr style={{ border: "1px solid black" }}>
            {header.map((arr, index) => (
              <th key={index} style={{ border: "1px solid black" }}>
                {formatCellValue(arr, index)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {book.map((arr, rowIndex) => (
            <tr key={rowIndex}>
              {arr.map((val, colIndex) =>
                val === "null" ? (
                  <td key={colIndex} style={{ border: "1px solid black" }}>
                    пусто
                  </td>
                ) : (
                  <td
                    key={colIndex}
                    style={{
                      border: "1px solid black",
                      backgroundColor:
                        colIndex > 4 && colIndex % 2 === 0 && val === 0
                          ? "red"
                          : colIndex % 2 === 0 &&
                            val.toString().replace(/[^0-9]/g, "").length <= 5 &&
                            val > 600
                          ? "green"
                          : null,
                    }}
                  >
                    {formatCellValueII(val, colIndex)}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
