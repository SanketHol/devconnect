import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import AuthCard from "../../components/common/AuthCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { loginUser } from "../../api/authApi";
import { saveToken } from "../../lib/auth";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await loginUser(data);

    //   console.log("LOGIN RESPONSE:", response.data);

      if (!response.data.access_token) {
        throw new Error("Access token not received");
      }

      saveToken(response.data.access_token);

      login();

      toast.success("Login Successful!");

      navigate("/");
    } catch (err) {
    //   console.error("LOGIN ERROR:", err);

      toast.error(
        err.response?.data?.detail ||
          err.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Welcome Back">
      <p className="text-slate-400 text-center mb-8">
        Login to continue to DevConnect
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="Email"
          icon={Mail}
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
          })}
        />

        <div className="relative">
          <Input
            label="Password"
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[42px] text-slate-400 hover:text-white"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        <Button
          type="submit"
          loading={loading}
        >
          Login
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}

export default Login;