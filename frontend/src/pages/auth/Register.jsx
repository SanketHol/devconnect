import { Link } from "react-router-dom";

function Register() {

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-950">

            <div className="bg-slate-900 p-8 rounded-2xl w-[400px] shadow-xl border border-slate-800">

                <h1 className="text-3xl font-bold text-center text-cyan-400 mb-8">

                    Register

                </h1>

                <p className="text-gray-400 text-center">

                    Registration page coming next...

                </p>

                <div className="text-center mt-6">

                    <Link
                        to="/login"
                        className="text-cyan-400"
                    >
                        Back to Login
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;