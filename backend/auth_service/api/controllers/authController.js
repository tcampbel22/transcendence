/*This file handles the callback after Google authentication. It retrieves the authenticated user's profile data,
 formats it into a payload, and sends a request to register the user_service module (add to database).
 If the registration succeeds, it redirects to a frontend page with userID(/hub). If the user is already registered (409 error) just redirect to frontend with userId(/hub),
 For other errors, it returns the error status code in the redirect URL.*/

 import axios from 'axios';
 import https from 'https';

 const redirectURL =
 process.env.NODE_ENV === "production"
     ? "https://localhost:4433"
     : "http://localhost:5173";
 
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
        let response;
        if (process.env.NODE_ENV === "production") {
        response = await axios.post(
             `https://nginx:4433/users/register`,
             payload,
             { httpsAgent }
         );
        } 
        else {
         response = await axios.post("http://localhost:3002/api/register", payload);
        }
         const userData = encodeURIComponent(JSON.stringify({ userId: response.data.userId, username: response.data.username, redirectURL }));
         reply.redirect(`/auth/google/callback.html?user=${userData}`);
     } 
     catch (error) { 
         if (error.response && error.response.status === 409) {
            
            const loginInput = {
                username: profile.displayName,
                password: profile.id,
            };
            let response;
            if (process.env.NODE_ENV === "production") {
                response = await axios.post(
                `https://nginx:4433/users/login`,
                loginInput,
                { httpsAgent }
            );
            }
            else {
            response = await axios.post("http://localhost:3002/api/login", loginInput);
            }
            console.log("authController.js: Google callback login response:", response.data);
            const userData = encodeURIComponent(JSON.stringify({ userId: response.data.userId, username: response.data.username, is2faEnabled: response.data.is2faEnabled, redirectURL }));
            reply.redirect(`/auth/google/callback.html?user=${userData}`);
         } else {
             const statusCode = error.response ? error.response.status : 500;
             const userData = encodeURIComponent(JSON.stringify({ statusCode }));
             reply.redirect(`/auth/google/callback.html?user=${userData}`);
         }        
     }
 };