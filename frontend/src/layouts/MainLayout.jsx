import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import RightSidebar from "../components/layout/RightSidebar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="mx-auto flex max-w-7xl">

        <Sidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <RightSidebar />

      </div>

    </div>
  );
}

export default MainLayout;