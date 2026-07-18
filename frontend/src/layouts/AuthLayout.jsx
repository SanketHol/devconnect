import { Outlet } from "react-router-dom";
import Logo from "../components/common/Logo";

import {
  Rocket,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="hidden lg:flex relative overflow-hidden items-center justify-center bg-gradient-to-br from-cyan-500 via-sky-600 to-blue-800 text-white p-12">

        {/* Background Glow */}
        <div className="absolute w-96 h-96 rounded-full bg-white/10 blur-3xl -top-32 -left-32"></div>

        <div className="absolute w-80 h-80 rounded-full bg-cyan-300/10 blur-3xl bottom-0 -right-20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-md">

          <Logo />

          <p className="mt-8 text-lg leading-8 text-cyan-50">
            Join thousands of developers to share projects,
            collaborate on ideas, learn new technologies,
            and grow your professional network.
          </p>

          <div className="mt-14 space-y-8">

            <div className="flex items-start gap-4">

              <div className="bg-white/15 p-3 rounded-xl">
                <Rocket size={24} />
              </div>

              <div>

                <h3 className="font-semibold text-lg">
                  Share Projects
                </h3>

                <p className="text-cyan-100 mt-1">
                  Showcase your portfolio and technical projects.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="bg-white/15 p-3 rounded-xl">
                <Users size={24} />
              </div>

              <div>

                <h3 className="font-semibold text-lg">
                  Connect
                </h3>

                <p className="text-cyan-100 mt-1">
                  Follow developers and build your professional network.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="bg-white/15 p-3 rounded-xl">
                <BriefcaseBusiness size={24} />
              </div>

              <div>

                <h3 className="font-semibold text-lg">
                  Get Hired
                </h3>

                <p className="text-cyan-100 mt-1">
                  Build your profile and discover new opportunities.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-slate-950 p-8">

        <Outlet />

      </div>

    </div>
  );
}

export default AuthLayout;