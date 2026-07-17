export function Heading({ children }) {
    return (
        <h1 className="text-3xl font-bold">
            {children}
        </h1>
    );
}

export function Title({ children }) {
    return (
        <h2 className="text-xl font-semibold">
            {children}
        </h2>
    );
}

export function Text({ children }) {
    return (
        <p className="text-slate-400">
            {children}
        </p>
    );
}