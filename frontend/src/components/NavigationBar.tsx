import { NavLink } from "react-router-dom";
import { Home, Calendar, User } from "lucide-react";
// --- Dayron's original import (commented out by the design pass) ---
// import { Link } from "react-router-dom";  // NavLink gives us active-tab styling
// ------------------------------------------------------------------

const ITEMS = [
  { to: "/views/Dashboard", label: "Home",     Icon: Home },
  { to: "/views/Calendar",  label: "Calendar", Icon: Calendar },
  { to: "/views/Account",   label: "Account",  Icon: User },
];

function NavBar() {
  /* --- Dayron's original markup (kept for reference) ---
  return (
    <div>
      <nav>
        <Link to="/views/Dashboard">Home</Link>
        {" | "}
        <Link to="/views/Account">Account</Link>
        {" | "}
        <Link to="/views/Calendar">Calendar</Link>
      </nav>
    </div>
  );
  --- end original --- */

  // --- Styled bottom navigation (UI-2) ---
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200 bg-white/90 backdrop-blur">
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {ITEMS.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                [
                  "flex flex-col items-center gap-1 py-2.5 text-xs font-semibold transition-colors",
                  isActive ? "text-brand-600" : "text-stone-400 hover:text-stone-700",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
