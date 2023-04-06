// import React, { useContext } from "react";
// import MyContext from "./context";

// const CustomTableDay = () => {
//   const { book } = useContext(MyContext);

//   return (
//     <div className="menu">
//       <table>
//         <thead>
//           <tr style={{ border: "1px solid black" }}>
//             {header.map((arr, index) => (
//               <th key={index} style={{ border: "1px solid black" }}>
//                 {formatCellValue(arr, index)}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {book.map((arr, rowIndex) => (
//             <tr key={rowIndex}>
//               {arr.map((val, colIndex) =>
//                 val === "null" ? (
//                   <td key={colIndex} style={{ border: "1px solid black" }}>
//                     пусто
//                   </td>
//                 ) : (
//                   <td
//                     key={colIndex}
//                     style={{
//                       border: "1px solid black",
//                       backgroundColor:
//                         colIndex > 4 && colIndex % 2 === 0 && val === 0
//                           ? "red"
//                           : colIndex % 2 === 0 &&
//                             val.toString().replace(/[^0-9]/g, "").length <= 5 &&
//                             val > 600
//                           ? "green"
//                           : null,
//                     }}
//                   >
//                     {formatCellValueII(val, colIndex)}
//                   </td>
//                 )
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CustomTableDay;
