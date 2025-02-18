import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import UserDashboard from "./Pages/UserDashboardPage/UserDashboard.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/dashboard" element={<UserDashboard />}></Route>
          <Route
            path="/dashboard/create-list"
            element={<UserDashboard />}
          ></Route>
          <Route
            path="/dashboard/trips/:id"
            element={<UserDashboard />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
