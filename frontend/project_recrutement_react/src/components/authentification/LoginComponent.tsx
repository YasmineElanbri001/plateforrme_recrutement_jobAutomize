import React, { useState } from "react";
import { data, Link } from "react-router-dom";
import "../Login.css"
import { login } from "../../services/api";
import type { CompteUtilisateur } from "../../interfaceFrontend";
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const [data, setData]= useState<CompteUtilisateur>({
  id: 0,
  username: "",
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  adresse: "",
  role: "",
  cin: "",
  specialite: "",
  reference_recruteur: "",
  password: "",
  repassword: ""
});


  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
) => {

    event.preventDefault();

    try {

        const response = await login(
          username,
          password
        );
        navigation.navigate('/home');

        console.log("DJANGO :", response);

        setMessage("login passe avec succès.");

    } catch (error) {

        console.error(error);

        setMessage("Erreur lors de l'authentification.");

    }
};

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Partie gauche */}
        <div className="login-info">
          <h1>Job Automize</h1>

          <p>
            Bienvenue s'authentifier et utiliser notre
            plateforme de recrutement.
          </p>

          <div className="login-decoration">
            <span>✓</span>
            <p>Gérez votre profil</p>

            <span>✓</span>
            <p>Découvrez les offres</p>

            <span>✓</span>
            <p>Postulez facilement</p>
          </div>
        </div>
        

        {/* Formulaire */}
        <div className="login-form-container">

          <div className="login-header">
            <h2>Job Automize</h2>
            <p>Welcome To Our Place !! </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Votre Username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

            </div>



            <div className="form-row">

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

            </div>

            <button type="submit" className="login-button">
              Se Connecter
            </button>

          </form>

          <div className="login-link">
            <span>Vous n'avez pas un compte ? </span>
            <Link to="/register">Créer un Compte</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;