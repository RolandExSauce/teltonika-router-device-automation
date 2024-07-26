import { Navigate, Route, Routes, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "./auth/authContext";
import { LegacyRef, useContext, useEffect, useRef, useState } from "react";
import ProSidebar from "./components/Sidebar/ProSidebar";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import SearchAndUpdate from "./components/Router-Info/SearchAndUpdate";
// import ConfigRouter from "./components/Config-Router/ConfigRouter";
// import AppSettings from "./components/App-Settings/AppSettings";
import DeviceTable from "./components/RouterTable/deviceTable";
import BetterLogin from "./pages/Login/BetterLogin";


const App = () => {
  const location = useLocation();

  //auth then to dashboard
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoutes = () => {
    return !currentUser ? <Navigate to={"/login"} /> : <Outlet />;
  };

  //toggle sidebar, collapse sidebar
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  //show sidebar only for "/" route and others, not /login
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    const pathname = window.location.pathname;
    if (["/login"].includes(pathname) || ["/not-found"].includes(pathname)) {
      setShowSidebar(false);
    } else if (
      !["/login"].includes(pathname) ||
      ["/not-found"].includes(pathname) //if on login page or if on not found page
    ) {
      setShowSidebar(true);
    }
  }, [location, showSidebar]);

  //collapse sidebar
  const handleCollapsedChange = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  //toggle sidebar
  const handleToggleSidebar = () => {
    setToggled((toggled) => !toggled);
  };

  return (
    <div className="app">
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
          <Route element={<ProtectedRoutes />}>
            <Route element={<DeviceTable />} path="/" />
            {/* <Route element={<SearchAndUpdate />} path="/search-update" />
            <Route element={<ConfigRouter />} path="/config-router" />
            <Route element={<AppSettings />} path="/app-settings" /> */}
          </Route>
          <Route path="/login" element={<BetterLogin />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};
export default App;
