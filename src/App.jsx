import Main from "./pages/Main";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardDetails from "./pages/CardDetails";

function App() {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/card/:id" element={<CardDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;
