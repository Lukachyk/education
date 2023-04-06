import React, { useContext } from "react";
import "./styles.css";
import MyContext from "../context";
import { Link, useLocation } from "react-router-dom";

const FilterModeNav = () => {
  const { fileSelection, setFileSelection } = useContext(MyContext);
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="mode-nav">
      {fileSelection === true ? (
        <nav>
          <ul>
            {pathname === "/24" ? (
              ""
            ) : (
              <li>
                <Link to="/24">
                  <button onClick={() => setFileSelection(false)}>
                    Суточники
                  </button>
                </Link>
              </li>
            )}
            {pathname === "/abon" ? (
              ""
            ) : (
              <li>
                <Link to="/abon">
                  <button onClick={() => setFileSelection(false)}>
                    Абонемент
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      ) : (
        ""
      )}
    </div>
  );
};

export default FilterModeNav;
