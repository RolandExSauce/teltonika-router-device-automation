import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ProSidebar from "./components/Sidebar/ProSidebar";
import DeviceTable from "./components/Dashboard-Section/DeviceTable";
import SearchAndUpdate from "./components/Search-Update-Device/SearchAndUpdate";
import AppSettings from "./components/App-Settings/AppSettings";
import Login from "./pages/Login/Login";
import { useAppSelector } from "./auth/redux/hooks";
import ConfigBoard from "./components/Config-Section/Config-Div-Right/ConfigBoard";
import "./App.css";



//we will guard the dashboard for unauthorized access
const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

//App Component, Entry Component
const App = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  //for login page, sidebar will not be visible
  useEffect(() => {
    const pathname = window.location.pathname;
    if (["/login"].includes(pathname) || ["/not-found"].includes(pathname)) {
      setShowSidebar(false);
    } else if (
      !["/login"].includes(pathname) ||
      ["/not-found"].includes(pathname)
    ) {
      setShowSidebar(true);
    }
  }, [location, showSidebar]);

  //handle sidbar toggling and collapsing
  const handleCollapsedChange = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  const handleToggleSidebar = () => {
    setToggled((toggled) => !toggled);
  };

  return (
    <div className="app" id="app">
      {showSidebar && (
        <ProSidebar
          collapsed={collapsed}
          toggled={toggled}
          handleCollapsedChange={handleCollapsedChange}
          onBackdropClick={handleToggleSidebar}
        />
      )}
      <main>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route element={<ConfigBoard />} path="/config-board" />
            <Route element={<SearchAndUpdate />} path="/search-update" />
            <Route element={<AppSettings />} path="/app-settings" />
            <Route path="/dashboard" element={<DeviceTable />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
};
export default App;
