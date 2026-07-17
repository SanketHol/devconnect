function Input({

label,

error,

icon:Icon,

...props

}){

return(

<div className="space-y-2">

{label &&

<label className="text-sm text-slate-300">

{label}

</label>

}

<div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-4">

{Icon &&

<Icon
className="mr-3 text-slate-500"
size={18}
/>

}

<input

className="
bg-transparent
w-full
py-3
outline-none
"

{...props}

/>

</div>

{error &&

<p className="text-red-400 text-sm">

{error}

</p>

}

</div>

);

}

export default Input;