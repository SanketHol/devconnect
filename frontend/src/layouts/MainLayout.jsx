import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import RightSidebar from "../components/layout/RightSidebar";

function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <div className="max-w-7xl mx-auto flex">

                <Sidebar />

                <main className="flex-1 p-6">
                    {children}
                </main>

                <RightSidebar />

            </div>

        </div>
    );
}

export default MainLayout;