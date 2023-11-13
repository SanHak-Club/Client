import "./App.css";
import Router from "./Router";
import { OutputContext } from "./contextAPI/OutputContext";
import { useState } from "react";

function App() {
  const [output, setOutput] = useState([]);
  return (
    <OutputContext.Provider value={{ output, setOutput }}>
      <Router />
    </OutputContext.Provider>
  );
}

export default App;
