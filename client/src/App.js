/** @format */

import react from "react";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books/Books";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Books />} />
      </Routes>
    </>
  );
}

export default App;
