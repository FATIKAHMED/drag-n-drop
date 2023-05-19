import React, { useState } from "react";
import "./file.css";
import { useRef } from "react";
import { useDrop } from "react-dnd";

function Drop() {
  const [drops, setDrops] = useState([
    { id: "1", content: "itm1" },
    { id: "2", content: "itm2" },
    { id: "3", content: "itm3" },
    { id: "4", content: "itm4" },
  ]);

  return (
    <>
      <div className="drop">{drops}</div>
    </>
  );
}

export default Drop;
