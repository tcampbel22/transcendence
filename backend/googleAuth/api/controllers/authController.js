/*This file handles the callback after Google authentication. It retrieves the authenticated user's profile data,
 formats it into a payload, and sends a request to register the user_service module (add to database).
 If the registration succeeds, it redirects to a frontend page with userID(/hub). If the user is already registered (409 error) just redirect to frontend with userId(/hub),
 For other errors, it returns the error status code in the redirect URL.*/


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
