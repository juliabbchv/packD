import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Form from "../../Components/Form/Form";
import TripDetails from "../../Components/TripDetails/TripDetails";
import PublicLists from "../../Components/PublicLists/PublicLists";
import "./UserDashboardPage.scss";
import { useLocation, useParams } from "react-router-dom";

export default function UserDashboard() {
  const location = useLocation();
  const { id } = useParams();

  const renderContent = () => {
    if (location.pathname === "/dashboard") {
      return <Dashboard />;
    } else if (location.pathname === "/dashboard/create-list") {
      return <Form />;
    } else if (id && location.pathname === `/dashboard/trips/${id}`) {
      return <TripDetails tripId={id} />;
    } else if (location.pathname === "/dashboard/public-trips") {
      return <PublicLists />;
    } else if (location.pathname === `/dashboard/public-trips/${id}`) {
      return <TripDetails />;
    } else {
      return <Dashboard />;
    }
  };

  return (
    <div className="dashboard-wrap">
      <DashboardSidebar />
      <main>{renderContent()}</main>
    </div>
  );
}
