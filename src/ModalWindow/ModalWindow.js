import "./styles.css";
import open from "./nav-open.svg";
import MyContext from "./context";

const ModalWindow = () => {
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

  return (
    <div>
      <button id="nav-btn" class="nav-button">
        <img id="nav-btn-img" src={open} alt="Nav button" />
      </button>
    </div>
  );
};

export default ModalWindow;
