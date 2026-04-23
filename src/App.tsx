import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./admin/dashboard/DashboardList";
import ProductList from "./admin/products/ProductList";
function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;