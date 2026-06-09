import { useState, useEffect } from "react";
import { Bell, Globe, Shield, ChevronRight } from "lucide-react";
import getUserInfo from "../managers/UserManager";
import type { User } from "../utils/DataBaseTypes";
import { AuthService } from "../services/AuthService";
import { TimeZoneService } from "../services/TimeZoneService";

type AccountProps = { userID: string; }
type Channel = "browser" | "email" | "none";

// Dayron's action stubs — TODO: wire to ApiClient
function handleUpdateAccount() { console.log("Update account"); }
function handleChangePassword() { console.log("Change password"); }
function handleDeleteAccount() {
  // FR-06-B: hard delete — must confirm first (Threat Model R-2)
  if (window.confirm("This permanently deletes your account and ALL your data. This cannot be undone.")) {
    console.log("TODO: ApiClient.deleteAccount() then redirect");
  }
}

export default function Account({ userID }: AccountProps) {
  const [user,    setUser]    = useState<User>({ userID: 0, email: "" });
  const [channel, setChannel] = useState<Channel>("browser"); // FR-07-B

  useEffect(() => {
    async function fetchUserInfo() {
      const userInfo = await getUserInfo(userID);
      setUser(userInfo);
    }
    fetchUserInfo();
  }, [userID]);

  /* --- Dayron's original return (kept for reference) ---
  return (
    <section>
      <div className="account-container">
        <h2 id="header-acc">Account</h2>
        <p>Welcome to thy account page.</p>
        <img src="/path/to/image.jpg" alt="Account" />
      </div>
      <div className="account-info">
        <h3>Account Information</h3>
        <p>User ID: {user.userID}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className="account-actions">
        <button id="update-account-btn" onClick={handleUpdateAccount}>Update Account Information</button>
        <button id="change-password-btn" onClick={handleChangePassword}>Change Password</button>
        <button id="delete-account-btn" onClick={handleDeleteAccount}>Delete Account</button>
        <button id="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </section>
  );
  --- end original --- */

  const initials = user.email ? user.email.charAt(0).toUpperCase() : "?";
  const channels: Array<{ id: Channel; label: string }> = [
    { id: "browser", label: "Push" },
    { id: "email",   label: "Email" },
    { id: "none",    label: "Off" },
  ];

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <h1 className="text-2xl font-bold tracking-tight text-stone-900 mb-5">Account</h1>

      {/* Profile card */}
      <div className="flex items-center gap-4 bg-white rounded-2xl border border-stone-200 shadow-sm p-4 mb-4">
        <div className="h-14 w-14 rounded-full bg-brand-50 flex items-center justify-center text-xl font-bold text-brand-700 shrink-0">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-stone-900 truncate">{user.email || "Loading…"}</p>
          <p className="text-xs text-stone-400 mt-0.5">User #{user.userID}</p>
        </div>
        <button
          onClick={handleUpdateAccount}
          className="shrink-0 text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg hover:bg-brand-100 transition-colors"
        >
          Edit
        </button>
      </div>

      {/* Notifications — FR-07-B */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm mb-4">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-100">
          <Bell size={17} className="text-stone-400 shrink-0" />
          <span className="font-semibold text-sm text-stone-800 flex-1">Notifications</span>
        </div>
        <div className="px-4 py-3 flex gap-2">
          {channels.map(c => (
            <button
              key={c.id}
              onClick={() => setChannel(c.id)}
              className={[
                "flex-1 py-2 rounded-lg text-sm font-semibold transition-colors",
                channel === c.id
                  ? "bg-brand-600 text-white"
                  : "bg-stone-100 text-stone-500 hover:bg-stone-200",
              ].join(" ")}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Settings rows */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm mb-4 overflow-hidden">
        <button
          onClick={handleChangePassword}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-stone-50 transition-colors"
        >
          <Shield size={17} className="text-stone-400 shrink-0" />
          <span className="font-semibold text-sm text-stone-800 flex-1 text-left">Security</span>
          <ChevronRight size={16} className="text-stone-300" />
        </button>
        <div className="border-t border-stone-100" />
        <div className="flex items-center gap-3 px-4 py-3.5">
          <Globe size={17} className="text-stone-400 shrink-0" />
          <span className="font-semibold text-sm text-stone-800 flex-1">Time Zone</span>
          <span className="text-xs text-stone-400 max-w-[140px] truncate text-right">
            {TimeZoneService.zone()}
          </span>
        </div>
      </div>

      {/* Danger zone — FR-06-B */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm mb-4">
        <button
          onClick={handleDeleteAccount}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-red-50 transition-colors rounded-2xl"
        >
          <span className="font-semibold text-sm text-red-600 flex-1 text-left">Delete Account</span>
          <ChevronRight size={16} className="text-red-300" />
        </button>
      </div>

      {/* Sign out */}
      <button
        onClick={() => AuthService.logout()}
        className="w-full py-3.5 rounded-2xl bg-stone-100 text-stone-700 font-bold text-sm hover:bg-stone-200 transition-colors"
      >
        Sign Out
      </button>

      <div className="h-4" />
    </main>
  );
}
