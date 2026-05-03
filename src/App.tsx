import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// User pages
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import ProductDetail from "./pages/user/ProductDetail";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Shop from "./pages/user/Shop";

// Admin pages
import Dashboard from "./pages/admin/dashboard/DashboardList";
import ProductList from "./pages/admin/products/ProductList";
import AddProduct from "./pages/admin/products/ProductAdd";
import EditProduct from "./pages/admin/products/ProductEdit";
import UserAdmin from "./pages/admin/users/UserList";
import AddUser from "./pages/admin/users/AddUser";
import Categorylist from "./pages/admin/Category/CategoryList"
import OrderList from "./pages/admin/orders/OrderList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="users" element={<UserAdmin />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="categories" element={<Categorylist />} />
          <Route path="orders" element={<OrderList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;