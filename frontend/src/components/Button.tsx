interface ButtonProps{
    size?:"sm"|"md"|"lg",
    text:string,
    onClick?:()=>void
}

const ButtonSize = {
    sm:" w-28",
    md:" w-64",
    lg:" w-96"
}

export const Button = ({text,onClick,size}:ButtonProps)=>{
    return <button onClick={onClick} className={`p-4 bg-slate-200 ${size?ButtonSize[size]:ButtonSize["lg"]} rounded-lg `} >{text}</button>
}