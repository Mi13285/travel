import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [name, setName] = useState("Миша");
  return (
    <div>
      <span>{name}</span>
      <button onClick={() => setName("Саша")}> button</button>
    </div>
  );
}

export default App;
