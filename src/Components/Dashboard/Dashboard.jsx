import "./Dashboard.scss";
import UserLists from "../UserLists/UserLists";

const Dashboard = () => {
  const userLists = [
    {
      id: 1,
      title: "Adventure in Japan",
      destination: "Tokyo, Japan",
      activities: ["Sightseeing", "Camping", "Winter sports"],
      items: 15,
    },
    {
      id: 2,
      title: "Camping trip to Yosemite ",
      destination: "Yosemite, USA",
      items: 10,
    },
    {
      id: 3,
      title: "Adventure in Japan",
      destination: "Tokyo, Japan",
      activities: ["Sightseeing", "Camping", "Winter sports"],
      items: 15,
    },
    {
      id: 4,
      title: "Camping trip to Yosemite ",
      destination: "Yosemite, USA",
      items: 10,
    },
  ];

  const savedLists = [
    {
      id: 1,
      title: "Adventure in Japan",
      destination: "Tokyo, Japan",
      items: 15,
    },
    {
      id: 2,
      title: "Camping trip to Yosemite ",
      destination: "Yosemite, USA",
      items: 10,
    },
  ];

  return (
    <>
      <section className="dashboard">
        <div className="dashboard__greeting">
          <h1>
            Ready for your next trip, Julia? <br /> Let's pack your bags!
          </h1>
        </div>
        <UserLists />
      </section>
    </>
  );
};

export default Dashboard;
