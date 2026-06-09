import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavigationBar";
// import HabitCard from "./components/HabitCard"; // removed: unused here, HabitCard is a named export (no default) — was breaking build
import Dashboard from "./views/Dashboard";
import Account from "./views/Account";
import Calendar from "./views/Calendar";
import DaySummary from "./views/DaySummary";
import HabitSummary from "./views/HabitSummary";
import HabitCreation from "./views/HabitCreation";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/views/Dashboard" replace />} />
        <Route path="/views/Dashboard" element={<Dashboard />} />
        <Route path="/views/Account" element={<Account userID="1" />} />
        <Route path="/views/Calendar" element={<Calendar />} />
        <Route path="/views/DaySummary/:date" element={<DaySummary />} />
        <Route path="/views/HabitSummary/:habitId" element={<HabitSummary />} />
        <Route path="/views/HabitCreation" element={<HabitCreation />} />
      </Routes>
    </>
  );
}
