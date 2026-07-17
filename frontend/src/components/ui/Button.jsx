function Button({

children,

variant="primary",

size="md",

loading=false,

icon:Icon,

...props

}){

const variants={

primary:
"bg-cyan-500 hover:bg-cyan-600 text-white",

secondary:
"bg-slate-800 hover:bg-slate-700",

outline:
"border border-slate-700 hover:bg-slate-800",

danger:
"bg-red-500 hover:bg-red-600"

};

const sizes={

sm:"px-3 py-2 text-sm",

md:"px-5 py-2",

lg:"px-7 py-3 text-lg"

};

return(

<button

className={`
rounded-xl
font-semibold
transition
flex
items-center
justify-center
gap-2
${variants[variant]}
${sizes[size]}
`}

{...props}

>

{loading?

<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>

:

<>

{Icon && <Icon size={18}/>}

{children}

</>

}

</button>

);

}

export default Button;