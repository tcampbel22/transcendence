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
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
		    <div className="bg-beige p-6 rounded shadow-lg w-96">
                <h2 className="text-xl text-center font-bold mb-4">Are You Sure?</h2>
                    {message && <p className={`text-sm text-center mb-2 ${
                        messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {message}
                            </p>
                    }
		            <div className="flex justify-center gap-2">
                        <button
                        onClick={onClose}
                        className="text-amber-200hover:underline border-2 border-amber-200 rounded px-2 font-bold bg-beige hover:bg-green-500"
                        disabled={loading}
                        >
                        No
                        </button>
                        <button
                        onClick={handleDelete}
                        className="shadow-md bg-beige text-amber-200 border-2 border-amber-200 px-2 py-1 font-bold rounded hover:bg-red-500 hover:text-beige"
                        >
                        Yes
                        </button>
		        </div>
		    </div>
	  </div>
	)
}

export default DeleteProfile;