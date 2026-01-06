export function Input ({type, placeholder, onChange, id, required, value}){

    return(
        <input
        value={value}
            id={id}
            required={required}
              type={type}
              placeholder={placeholder}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:border-l-black focus:border-b-black focus:border-2"
              onChange={onChange}
            />
    )
}

export function Label ({lblFor, lblName}){

    return(
         <label htmlFor={lblFor}  className="block text-sm font-medium text-gray-700 mb-1">
              {lblName}
            </label>
    )
}
