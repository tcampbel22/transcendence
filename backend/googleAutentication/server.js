const express = require('express');
const passport = require('passport');
const session = require('express-session'); // Importa express-session
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Importa la estrategia de Google OAuth

const app = express();

// Configura express-session
app.use(session({
  secret: 'mi_secreto', // Puedes usar cualquier string como secreto
  resave: false, // No guarda sesión en cada solicitud si no hay cambios
  saveUninitialized: true // Guarda sesiones nuevas, incluso si están vacías
}));

// Inicializa Passport
app.use(passport.initialize());
app.use(passport.session()); // Habilita soporte de sesiones en Passport

// Configura Google OAuth
passport.use(new GoogleStrategy({
  clientID: '626578837925-680bd28nejok4m6v9m5qrfqaolf1tnll.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  console.log("Perfil de usuario:", profile);
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Ruta para iniciar sesión con Google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));


// Ruta de callback después de autenticar con Google
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('https://localhost:4433')
  }
);

// Inicia el servidor
app.listen(3000, () => console.log('Servidor ejecutándose en http://localhost:3000'));