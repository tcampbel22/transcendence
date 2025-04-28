import axios from 'axios';

export const googleCallback = async (req, reply) => {
    const profile = req.user;
    try {
        const payload = {
            username: profile.displayName,
            email: profile.emails[0].value,
            password: profile.id,
        };
        const response = await axios.post(`http://user_service:3002/api/register`, payload);
        console.log('Respuesta del servicio de usuario:', response.data.userId);
        const userData = encodeURIComponent(JSON.stringify({ userId: response.data.userId }));
        reply.redirect(`/auth/google/callback.html?user=${userData}`);
    } 
    catch (error) {
        if (error.response.status === 409) {
            const userData = encodeURIComponent(JSON.stringify({userId: error.response.data.userId}));
            reply.redirect(`/auth/google/callback.html?user=${userData}`);
        } else {
            const userData = encodeURIComponent(JSON.stringify({statusCode: error.response.status}));
            reply.redirect(`/auth/google/callback.html?user=${userData}`);
        }        
    }
};
