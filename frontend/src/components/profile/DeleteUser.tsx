import React, { useState } from "react";
import { AxiosError } from "axios";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";

type DeleteProfileProps = {
	userId: number;
    onClose: () => void;
}


const DeleteProfile = ({userId, onClose}: DeleteProfileProps) => {
 	const API_URL = import.meta.env.VITE_API_USER;
    const navigate = useNavigate();
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false);
	const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
	
	const handleDelete = async () => {
		setLoading(true); 
		try {
			await api.delete(`${API_URL}/${userId}/delete-user`, {withCredentials: true});
            setMessageType('success');
            setMessage("gg my guy");
			setTimeout(() => {
				navigate("/");
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
		<div className="fixed inset-0 bg-gray-900 opacity-95 flex justify-center items-center text-lg">
		    <div className="p-6 rounded shadow-lg w-96 border">
                <h2 className="text-xl text-center font-bold mb-4">Are You Sure?</h2>
                    {message && <p className={`text-sm text-center mb-2 ${
                        messageType === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {message}
                            </p>
                    }
		            <div className="flex justify-center gap-2">
                        <button
                        onClick={onClose}
                        className="border-2 rounded px-4 font-bold hover:bg-amber-200 hover:text-gray-900"
                        disabled={loading}
                        >
                        No
                        </button>
                        <button
                        onClick={handleDelete}
                        className="border-2 px-4 py-1 font-bold rounded hover:bg-amber-200 hover:text-gray-900"
                        >
                        Yes
                        </button>
		        </div>
		    </div>
	  </div>
	)
}

export default DeleteProfile;