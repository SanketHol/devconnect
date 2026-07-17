import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/authApi";
import toast, { Toaster } from "react-hot-toast";

function Login() {

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {

        try {

            const response = await loginUser(data);

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            toast.success("Login Successful!");

            console.log(response.data);

        } catch (err) {

            toast.error(
                err.response?.data?.detail || "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-950">

            <Toaster position="top-right"/>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-slate-900 p-8 rounded-2xl w-[400px] shadow-xl border border-slate-800"
            >

                <h1 className="text-3xl font-bold text-center text-cyan-400 mb-8">
                    DevConnect
                </h1>

                <input
                    {...register("email")}
                    placeholder="Email"
                    className="w-full p-3 rounded-xl bg-slate-800 mb-4 outline-none"
                />

                <input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className="w-full p-3 rounded-xl bg-slate-800 mb-6 outline-none"
                />

                <button
                    className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold"
                >
                    Login
                </button>

                <p className="mt-6 text-center text-gray-400">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-cyan-400 ml-2"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;