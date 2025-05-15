import { useState } from "react";
import { AxiosError } from "axios";
import api from "../../lib/api";

type EditProfileProps = {
	onClose: () => void;
	onSave: () => void;
	userId: number;
}

const EditProfile = ({onClose, userId, onSave}: EditProfileProps) => {
 	const API_URL = import.meta.env.VITE_API_USER;
	const [newUsername, setNewUsername] = useState('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false);
	const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
	
	const handleSave = async () => {
		setLoading(true); 
		try {
			const payload = {
				newUsername: newUsername,
			};

			console.log(payload);
			//need to check with Tim that this is the correct place where to change the username
			const res = await api.put(`${API_URL}/${userId}`, {newUsername: newUsername}, {withCredentials: true}); //product version
			console.log(res);
			setMessage("Username changed succesfully");
			setMessageType('success')
			onSave();
			setTimeout(() => {
				onClose();
			}, 1000);
			setLoading(true);
		} catch (err) {
			const error = err as AxiosError
			setMessage(error.message || "Something wen't wrong");
			setMessageType('error')
		} finally {
			setLoading(false);
		}
	}
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
		<div className="bg-beige p-6 rounded shadow-lg w-96">
		  <h2 className="text-xl font-bold mb-4">Edit Username</h2>
  
		  <input
			type="text"
			placeholder="New username"
			value={newUsername}
			onChange={(e) => setNewUsername(e.target.value)}
			className="border p-2 w-full rounded mb-4"
		  />
		  {message && <p className={`text-sm text-center mb-2 ${
     					 messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
						{message}
					</p>
			}
		  <div className="flex justify-end gap-2">
			<button
			  onClick={onClose}
			  className="text-gray-500 hover:underline"
			  disabled={loading}
			>
			  Cancel
			</button>
			<button
			  onClick={handleSave}
			  className="shadow-md bg-beige text-black border border-black px-2 py-1 rounded hover:bg-black hover:text-beige"
			  disabled={loading || !newUsername}
			>
			  {loading ? 'Saving...' : 'Save'}
			</button>
		  </div>
		</div>
	  </div>
	)
}

export default EditProfile;