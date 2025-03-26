import { CSSProperties } from 'react';

const flex = (text: any[]): CSSProperties => {
  return {
    display: "flex",
    alignItems: text[0],
    justifyContent: text[1],
    flexDirection: text[2] || "row",
  };
};

// const grid = (text: string[]): CSSProperties => {
//   return {
//     display: "grid",
//     gap: text[0],
//     gridTemplateColumns: `repeat(auto-fit, minmax(${text[1]}, 1fr))`
//   };
// };

export default { flex };