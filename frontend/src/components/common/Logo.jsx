import logo from "../../assets/logo.svg";

function Logo() {

    return (

        <div className="flex items-center gap-4">

            <img
                src={logo}
                alt="DevConnect"
                className="w-14 h-14"
            />

            <div>

                <h1 className="text-4xl font-extrabold tracking-tight">
                    DevConnect
                </h1>

                <p className="text-cyan-100 text-sm">
                    Social Network for Developers
                </p>

            </div>

        </div>

    );

}

export default Logo;