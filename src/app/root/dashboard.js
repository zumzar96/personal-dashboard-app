import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  Routes,
} from "react-router-dom";
import AppDrawerBar from "../root/components/common/appDrawerBar";
import Materials from "../materials/materials";
import Dashboarda from "../dashboard/dashboard";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "./components/common/errorBoundary";
import Facilities from "../facilities/facilities";

const Dashboard = () => {
  const { pathname } = useLocation();
  const nonExistingRoute = pathname.replace("/dashboard/", "");//TODO 

  return (
    <>
      <AppDrawerBar>
        <Routes>
          <Route path="stats" element={<Dashboarda />} />
          <Route path="materials" element={<Materials />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path={`${nonExistingRoute}`} element={<ErrorBoundary />} />
        </Routes>
      </AppDrawerBar>
    </>
  );
};

export default Dashboard;
