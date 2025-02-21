import "./Dashboard.scss";
import UserLists from "../UserLists/UserLists";
import SavedLists from "../SavedLists/SavedLists";

const Dashboard = () => {
  return (
    <>
      <section className="dashboard">
        <div className="dashboard__greeting">
          <h1>
            Ready for your next trip, Julia? <br /> Let's pack your bags!
          </h1>
        </div>
        <div className="divider-line"></div>
        <UserLists />
        <SavedLists />
      </section>
    </>
  );
};

export default Dashboard;
