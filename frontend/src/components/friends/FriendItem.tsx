type FriendItemProps = {
	friend: { id: number; username: string; status: 'online' | 'offline' };
	onDelete: () => void;
  };
  
  const FriendItem = ({ friend, onDelete }: FriendItemProps) => (
	<div className="flex items-center justify-between px-4 py-2 hover:bg-gray-200">
	  <div className="flex items-center space-x-2">
		<span>{friend.username}</span>
		<span
		  className={`w-2 h-2 rounded-full ${
			friend.status === 'online' ? 'bg-green-500' : 'bg-red-400'
		  }`}
		  title={friend.status}
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

  export default FriendItem;