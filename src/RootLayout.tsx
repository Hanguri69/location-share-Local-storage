import { Link, Outlet } from "react-router-dom";
import { getCurrentUser, logoutUser } from "./utils/auth";

export default function RootLayout() {
  const currentUser = getCurrentUser();

  function handleLogout() {
    logoutUser();
    window.location.reload();
  }

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="w-full border-b flex justify-center">
        <nav className="max-w-7xl w-full flex items-center justify-between p-2">
          <div>
            <Link to="/" className="text-2xl font-bold">
              Location Social
            </Link>
          </div>
          {!currentUser ? (
            <div className="flex items-center gap-4">
              <Link to="/login" className="border rounded-lg p-2 hover:bg-slate-300">
                Login
              </Link>
              <Link to="/signup" className="border rounded-lg p-2 hover:bg-slate-300">
                Signup
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <p>{currentUser.email}</p>
              <Link
                to="/places/new"
                className="border rounded-lg p-2 bg-slate-300 hover:bg-slate-600 hover:text-white"
              >
                Create place
              </Link>
              <button onClick={handleLogout} className="border rounded-lg p-2 hover:bg-red-300">
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
      <main className="max-w-7xl w-full mt-16 p-2 flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
