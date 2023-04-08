import React, { useContext, useState, useEffect } from "react";
import MyContext from "./context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import FileInput from "./FileInput";

const CustomTableDay = () => {
  const { book, header, formatDate, setBook } = useContext(MyContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [filteredBook, setFilteredBook] = useState(book);
  const [originalBook, setOriginalBook] = useState(book); // initialize originalBook with book

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
  const formatCellValueIII = (value, index) =>
    typeof value === "number" && value >= 0 && (index === 3 || index === 5)
      ? formatDate(value, {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        })
      : value;

  function resetFilter() {
    setBook(originalBook); // set book to originalBook
    setFilteredBook(originalBook); // reset filteredBook
    setSelectedDate(null); // reset selected date
    setIsButtonPressed(false); // reset button state
  }

  function filterArrayDate() {
    const filteredArray = book.filter((arr) => {
      const dateValue = arr[5];
      if (typeof dateValue !== "number") {
        return false; // отбрасываем массивы, у которых под индексом 5 нет числового значения
      }
      const date = new Date((dateValue - 25569) * 86400 * 1000); // преобразуем числовое значение в дату
      return date >= selectedDate; // отбираем массивы с датой, равной или больше выбранной даты
    });
    setFilteredBook(filteredArray);
    setOriginalBook(book); // update originalBook with current book array
    setBook(filteredArray);
  }

  return (
    <div>
      <FileInput />
      <div>
        <label htmlFor="DatePicker">Выберите дату:</label>
        <DatePicker
          id="DatePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy"
        />
        <div className="filters">
          <button onClick={handleButtonClick}>Фильтр 'место'</button>
          <button onClick={filterArrayDate}>Только оплаченые</button>
          <button onClick={resetFilter}>Сбросить фильтр</button>
        </div>
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
                    (colIndex === 1 || colIndex === 2) &&
                    isValueRepeatedInColumn(colIndex)
                      ? "repeated-value"
                      : ""
                  }
                >
                  {val === "null" ? "пусто" : formatCellValueIII(val, colIndex)}
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
