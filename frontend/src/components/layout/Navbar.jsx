function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">

            <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">

                <h1 className="text-2xl font-bold text-cyan-400">
                    DevConnect
                </h1>

                <div className="space-x-3">

                    <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg">
                        Login
                    </button>

                </div>

            </div>

        </header>
    );
}

export default Navbar;