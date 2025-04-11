import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const googleAuth = async (fastify, options) => {
  // Configurar la estrategia de autenticación con Google
  passport.use(
    new GoogleStrategy(
      {
        clientID: '626578837925-680bd28nejok4m6v9m5qrfqaolf1tnll.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );

  // Ruta para iniciar autenticación con Google (redirige a la página de Google)
  fastify.get("/auth/google", async (req, res) => {
    return passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res
    );
  });

  // Ruta de callback para obtener los datos del usuario
  fastify.get("/auth/google/callback", async (req, res) => {
    passport.authenticate("google", (err, user) => {
      if (err || !user) {
        return res.status(401).send("Error de autenticación");
      }
      res.redirect("/"); // Redirigir a la página de inicio después de la autenticación exitosa
      //return res.status(200).send("Error de autenticación");
      // Enviar los datos del usuario sin guardar sesión
      /*res.send({
        id: user.id,
        nombre: user.displayName,
        email: user.emails[0].value,
        avatar: user.photos[0].value,
      });*/
    })(req, res);
  });
};

export default googleAuth;
