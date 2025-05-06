

type Id = {
    userId: number;
};

const AddFriendButton = ({userId} : Id) => {


const handleClick = () => {

}

    return (
        <div className="relative z-50 inline-block px-3">
            <button title="Add Friend" className={`transition-all duration-200 ease-in-out 
          ${'w-12 rounded bg-beige'} 
          bg-beige text-white py-2 shadow text-2xl flex items-center justify-center`} onClick={handleClick}>
                🗣️
        </button>
        </div>
    )
};

export default AddFriendButton;