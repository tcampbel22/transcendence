type FriendItemProps = {
	friend: { id: number; username: string; status: boolean };
	onDelete: () => void;
  };
  
  
  const FriendItem = ({ friend, onDelete }: FriendItemProps) => {
	
	return (
	<div className="flex items-center justify-between px-4 py-2 hover:bg-gray-200">
	  <div className="flex items-center space-x-2">
		<span>{friend.username}</span>
		<span
		  className={`w-2 h-2 rounded-full ${
			friend.status === true ? 'bg-green-500' : 'bg-red-400'
		  }`}
		  title={friend.status === true ? "online" : "offline"}
		/>
	  </div>
	  <button
		aria-label={`Remove ${friend.username}`}
		className="text-sm opacity-50 hover:opacity-100"
		onClick={onDelete}
	  >
		🗑️
	  </button>
	</div>
	);
  }

  export default FriendItem;