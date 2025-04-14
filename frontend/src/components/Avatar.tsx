
const Avatar = () => {
    return (
        <div	className="bg-black col-span-1 row-span-2 items-center flex flex-col h-screen py-8 text-white rounded">
			<h1 className=" font-bold text-2xl m-4">Timothy</h1>
			<div	className="bg-white w-80 h-80 rounded-full border-4  border-white flex flex-col items-center justify-center bg-cover bg-center"
					style={{
						backgroundImage: 'url(images/profile_tmp.png)'
					}}
			>
			</div>
			<br />
			<br />
			<p className="">email:</p>
			<p>Timothy@gmail.com</p>
			<button className="border border-white rounded p-1 hover:bg-white hover:text-black mt-auto">
				edit profile
			</button>
			<button className="border border-white rounded p-1 hover:bg-white hover:text-black mt-3">
				change password
			</button>
			<button className="border border-white rounded p-1 hover:bg-white hover:text-black mt-auto">
				commit seppuku
			</button>
        </div>
    )
}

export default Avatar;