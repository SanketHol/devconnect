import { forwardRef } from "react";

const Input = forwardRef(
  ({ label, error, icon: Icon, ...props }, ref) => {
    return (
      <div className="space-y-2">

        {label && (
          <label className="text-sm text-slate-300">
            {label}
          </label>
        )}

        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-4">

          {Icon && (
            <Icon
              className="mr-3 text-slate-500"
              size={18}
            />
          )}

          <input
            ref={ref}
            className="bg-transparent w-full py-3 outline-none text-white placeholder:text-slate-500"
            {...props}
          />

        </div>

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;