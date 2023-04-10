import React, { useContext } from "react";
import "./styles.css";
import MyContext from "../context";
import { NavLink, useLocation } from "react-router-dom";

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
                <NavLink to="/24">
                  <button onClick={() => setFileSelection(false)}>
                    Суточники
                  </button>
                </NavLink>
              </li>
            )}
            {pathname === "/abon" ? (
              ""
            ) : (
              <li>
                <NavLink to="/abon">
                  <button onClick={() => setFileSelection(false)}>
                    Абонемент
                  </button>
                </NavLink>
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
