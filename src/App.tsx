import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminRoutes } from "./routes/AdminRoutes";
import { UserRoutes } from "./routes/UserRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <UserRoutes />  {/* gọi như component */}
        <AdminRoutes /> {/* gọi như component */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;