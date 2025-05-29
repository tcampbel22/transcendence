/*This file handles the callback after Google authentication. It retrieves the authenticated user's profile data,
 formats it into a payload, and sends a request to register the user_service module (add to database).
 If the registration succeeds, it redirects to a frontend page with userID(/hub). If the user is already registered (409 error) just redirect to frontend with userId(/hub),
 For other errors, it returns the error status code in the redirect URL.*/

 import axios from 'axios';
 import https from 'https';
 
 export const googleCallback = async (req, reply) => {
     const profile = req.user;
     const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

     try 
     {
        const payload = {
            username: profile.displayName,
            email: profile.emails[0].value,
            password: profile.id,
        };
		if (process.env.NODE_ENV === "production") {
         const response = await axios.post(
             `https://nginx:4433/users/register`,
             payload,
             { httpsAgent }
         );
        } 
        else {
         response = await axios.post("http://localhost:3002/api/register", payload);
        }
         const userData = encodeURIComponent(JSON.stringify({ userId: response.data.userId, redirectURL }));
         reply.redirect(`/auth/google/callback.html?user=${userData}`);
     } 
     catch (error) { 
         if (error.response && error.response.status === 409) {
            
            const loginInput = {
                username: profile.displayName,
                password: profile.id,
            };
            const response = await axios.post(
                `https://nginx:4433/users/login`,
                loginInput,
                { httpsAgent }
            );
            const userData = encodeURIComponent(JSON.stringify({ userId: response.data.userId }));
            reply.redirect(`/auth/google/callback.html?user=${userData}`);
         } else {
             const statusCode = error.response ? error.response.status : 500;
             const userData = encodeURIComponent(JSON.stringify({ statusCode }));
             reply.redirect(`/auth/google/callback.html?user=${userData}`);
         }        
     }
 };