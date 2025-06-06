import { useState } from "react";
import api from "../../lib/api";
import { AxiosError } from "axios";

type EditPasswordProps = {
	onClose: () => void;
	onSave: () => void;
	userId: number;
}


const ChangePassword = ({onClose, userId, onSave}: EditPasswordProps) => {
    const [newPassword, setNewPassword] = useState('');
    const API_URL = import.meta.env.VITE_API_USER;
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const payload  = {
                newPassword: newPassword,
            };

            const res = await api.put(`${API_URL}/${userId}/reset-password`, payload);
            console.log(res);
            setMessage('Password changed succesfully!');
            setMessageType('success')
            onSave();
			setTimeout(() => {
				onClose();
			}, 1000);
        } catch (err) {
            const error = err as AxiosError;
            console.log(error);
            setMessageType('error');
            setMessage('Failed to change password, please try again!');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-beige p-6 rounded shadow-lg w-96">
                <h2>New Password</h2>
                <input
                type="password"
                placeholder="New username"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
			  className="shadow-md bg-beige text-black border border-black px-2 py-1 rounded hover:bg-black hover:text-beige">
                Save
			</button>
            </div>
                  </div>
        </div>
    )
};

export default ChangePassword;