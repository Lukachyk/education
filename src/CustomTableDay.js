import React, { useContext, useState } from "react";
import MyContext from "./context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const CustomTableDay = () => {
  const { book, header, formatCellValue, formatCellValueII } =
    useContext(MyContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function handleButtonClick() {
    setIsButtonPressed(true);
  }

  function isValueRepeatedInColumn(columnIndex) {
    if (!isButtonPressed) {
      // не окрашиваем при нажатии кнопки
      return false;
    }
    const columnValues = book.map((arr) => arr[columnIndex]);
    const uniqueValues = new Set(columnValues);
    return uniqueValues.size < columnValues.length;
  }

  return (
    <div>
      <div>
        <label htmlFor="DatePicker">Выберите дату:</label>
        <DatePicker
          id="DatePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy"
        />
        <button onClick={handleButtonClick}>Фильтр 'место'</button>
      </div>
      <table>
        <thead>
          <tr style={{ border: "1px solid black" }}>
            {header.map((arr, index) => (
              <th key={index} style={{ border: "1px solid black" }}>
                {arr}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {book.map((arr, rowIndex) => (
            <tr key={rowIndex}>
              {arr.map((val, colIndex) => (
                <td
                  key={colIndex}
                  style={{ border: "1px solid black" }}
                  className={
                    colIndex === 1 && isValueRepeatedInColumn(colIndex)
                      ? "repeated-value"
                      : ""
                  }
                >
                  {val === "null" ? "пусто" : val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTableDay;
