import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Form from "../../Components/Form/Form";
import "./UserDashboardPage.scss";
import { useLocation } from "react-router-dom";

export default function UserDashboard() {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/dashboard":
        return <Dashboard />;
      case "/dashboard/create-list":
        return <Form />;
      case "/dashboard/trips/:id":
        return <TripPage />;
      case "/dashboard/trips":
        return <AllTrips />;
      case "/dashboard/trips/public":
        return <ExplorePublicLists />;
      case "/dashboard/destination-insights":
        return <DestinationInsights />;
      default:
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
