
type InputProps = {
	type: string;
	placeholder: string;
	auto: string;
	value: string;
	setValue: (value: string) => void;
}

export const AuthInput:React.FC<InputProps> = ({ type, placeholder, auto, value, setValue }) => {
	return (
		<input 	
			type={type}
			// required
			placeholder={placeholder}
			autoComplete={auto}
			className='border border-amber-200 py-1 px-2 rounded w-auto focus:outline-none'
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	)

}