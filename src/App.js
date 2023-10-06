import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DataTable from "./components/DataTable";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DataTable />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
