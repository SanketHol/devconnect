function Avatar({

src,

size=50

}){

return(

<img

src={

src ||

"https://i.pravatar.cc/150"

}

style={{

width:size,

height:size

}}

className="
rounded-full
object-cover
border
border-slate-700
"

/>

);

}

export default Avatar;