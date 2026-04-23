import { Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/dashboard/DashboardList";
import ProductList from "../pages/admin/products/ProductList";
import AddProduct from "../pages/admin/products/ProductAdd";
export const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Navigate to="/admin/dashboard" />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="products" element={<ProductList />} />
    <Route path="products/add" element={<AddProduct />} />
  </Route>
);