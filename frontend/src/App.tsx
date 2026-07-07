import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Jobs from "./pages/Jobs";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./layouts/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>

          <Route path="/home" element={<Home />} />

          <Route path="/companies" element={<Companies />} />

          <Route path="/jobs" element={<Jobs />} />

          <Route path="/resume" element={<Resume />} />

        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;