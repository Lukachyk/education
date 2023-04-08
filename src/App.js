import React, { useState, useEffect } from "react";
import { readXlsxFile } from "./readXlxFile/readXlxFile";
import "./style.css";
import FileInput from "./FileInput";
import CustomTable from "./CustomTable";
import MyContext from "./context";
import FilterModeNav from "./FilterModeNav/FilterModeNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomTableDay from "./CustomTableDay";

function App() {
  const [backupBook, setBackupBook] = useState([]);
  const [book, setBook] = useState([]);
  const [header, setHeader] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [retrunBtn, setReturnBtn] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileSelection, setFileSelection] = useState(true);

  useEffect(() => {
    // здесь происходит отрисовка таблицы
  }, [book]);

  // обработчик выбора файла
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const rows = await readXlsxFile(file);

      setHeader(rows[0]);
      setBook(rows.slice(1));
      setSelectedFile(file);
      console.log(rows);
      // Получаем имя файла
      const fileName = file.name;
      setFileName(fileName);
    }
  };
  // преобразование даты в нужный формат
  const formatDate = (value, options) => {
    const date = new Date((value - 25569) * 86400 * 1000);
    const formatter = new Intl.DateTimeFormat("ru-RU", options);
    return formatter.format(date);
  };

  const unpaidSeats = (index) => {
    setBackupBook([...book]);
    const filteredBook = book.filter((arr) => arr[selectedMonth] === 0);
    setSelectedMonth(index);
    setBook([...filteredBook]);
    setSelectedMonth(null);
    setReturnBtn(true);
  };

  const returnDataFile = () => {
    setBook([...backupBook]);
    setBackupBook([]);
    setReturnBtn(false);
  };

  // const formatCellValue = (value, index) =>
  //   typeof value === "number" && value >= 0 ? (
  //     <button
  //       className={selectedMonth === index ? "btn green" : "btn"}
  //       onClick={() => setSelectedMonth(index)}
  //     >
  //       {formatDate(value, { month: "long" })}
  //     </button>
  //   ) : (
  //     value
  //   );

  const contextValue = {
    backupBook,
    setBackupBook,
    book,
    setBook,
    header,
    setHeader,
    selectedMonth,
    setSelectedMonth,
    retrunBtn,
    setReturnBtn,
    selectedFile,
    setSelectedFile,
    fileName,
    setFileName,
    returnDataFile,
    unpaidSeats,
    formatDate,
    handleFileSelect,
    fileSelection,
    setFileSelection,
    formatDate,
  };

  return (
    <div>
      <MyContext.Provider value={contextValue}>
        <Router>
          {book.length === 0 ? "" : <FilterModeNav />}
          <Routes>
            <Route path="/" element={<FileInput />} />
            <Route path="/abon" element={<CustomTable />} />
            <Route path="/24" element={<CustomTableDay />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </div>
  );
}

export default App;
