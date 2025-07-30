import React, { useState } from "react";
import api from "../../lib/api";
import { AxiosError } from "axios";

type EditValueProps = {
	onClose: () => void;
	onSave: () => void;
	userId: number;
	endpoint: string;
	valueName: string;
}

export const ProfilePopUp:React.FC<EditValueProps> = ({ userId, onClose, onSave, endpoint,valueName }) => {
	const [newValue, setNewValue] = useState('');
    const API_URL = import.meta.env.VITE_API_USER;
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const payload  = {
                newValue: newValue,
            };

            const res = await api.put(`${API_URL}/${userId}${endpoint}`, payload, {withCredentials: true});
            setMessage(`${valueName} changed succesfully!`);
            setMessageType('success')
            onSave();
			setTimeout(() => {
				onClose();
			}, 1000);
        } catch (err: any) {
            const error = err as AxiosError;
            setMessageType('error');
			if (error.status === 400)
				setMessage(`${valueName} is empty or invalid`)
			else if (error.status === 409)
				setMessage(`${valueName} cannot be the same as previous`)
			else
				setMessage(`Failed to change ${valueName}, please try again!`);
			setTimeout(() => {
				setMessage('');
			}, 2000);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-1 flex justify-center bg-gray-900 opacity-95 items-center text-lg z-50">
            <div className="p-6 border rounded w-96">
                <h2 className="text-center text-xl font-bold pb-4">Enter New Password</h2>
                <input
					type={valueName}
					placeholder={`new ${valueName}...`}
					value={newValue}
					onChange={(e) => setNewValue(e.target.value)}
					className="border p-2 w-full rounded mb-4"
				/>
				{message && <p className={`text-sm text-center mb-2 ${
							messageType === 'success' ? 'text-green-400' : 'text-red-400'}`}>
							{message}
						</p>
				}
				<div className="flex justify-center gap-2">
					<button
						onClick={handleSave}
						disabled={loading}
						className="px-2 py-1 border rounded hover:bg-amber-200 hover:text-gray-900">
							Save
					</button>
					<button
						onClick={onClose}
						className="px-2 py-1 border rounded hover:bg-amber-200 hover:text-gray-900"
						>
							Cancel
					</button>
				</div>
            </div>
        </div>
    )
}