function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/70
        backdrop-blur-xl
        shadow-2xl
        p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;