interface InputProps{
    size?:"sm"|"md"|"lg",
    refe?:any,
    placeholder:string
}

const InputSize = {
    sm:" w-28",
    md:" w-64",
    lg:" w-96"
}

export const Input = ({placeholder,refe,size}:InputProps)=>{
    return <input  className={`p-4 bg-gray-200 m-1 ${size?InputSize[size]:InputSize["lg"]} rounded-lg `} placeholder={placeholder} type="text" ref={refe}  />
}

