import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Outlet />
    </div>
  );
}
