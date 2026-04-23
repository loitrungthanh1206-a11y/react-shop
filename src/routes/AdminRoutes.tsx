import { Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/dashboard/DashboardList";
import ProductList from "../pages/admin/products/ProductList";

export default function AdminRoutes() {
  return (
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="products" element={<ProductList />} />
    </Route>
  );
}