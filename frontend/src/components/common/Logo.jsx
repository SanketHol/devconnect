import logo from "../../assets/logo.svg";

function Logo() {
  return (
    <div className="flex items-center gap-3">

      <img
        src={logo}
        alt="DevConnect"
        className="w-10 h-10"
      />

      <span className="text-2xl font-bold text-white">
        DevConnect
      </span>

    </div>
  );
}

export default Logo;