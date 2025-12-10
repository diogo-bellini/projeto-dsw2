import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Home />} />
        <Route path="/restaurant" element={<Home />} />
        <Route path="/restaurant/:id" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
