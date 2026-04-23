import { BrowserRouter, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <UserRoutes />
        <AdminRoutes />
      </Routes>
    </BrowserRouter>
  );
}

export default App;