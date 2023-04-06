import React, { useContext } from "react";
import MyContext from "./context";
import { Link } from "react-router-dom";

function FileInput() {
  const { handleFileSelect, selectedFile, fileName, book, setFileSelection } =
    useContext(MyContext);
  const choyseNewFile = () => {
    document.getElementById("file-input").click();
    setFileSelection(true);
  };
  return (
    <div className="input">
      <label
        htmlFor="file-input"
        style={{ display: "block", cursor: "pointer" }}
      >
        {selectedFile === null ? (
          <span>Выберите файл</span>
        ) : (
          <span>{fileName}</span>
        )}
        <input
          id="file-input"
          type="file"
          accept=".xlsx"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </label>
      {book.length === 0 ? (
        ""
      ) : (
        <Link to="http://localhost:3000">
          <button onClick={choyseNewFile}>Загрузить новый файл</button>
        </Link>
      )}
    </div>
  );
}

export default FileInput;
