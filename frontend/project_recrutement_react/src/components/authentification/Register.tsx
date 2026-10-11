import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Register.css"
import type { CompteUtilisateur } from "../../interfaceFrontend";
import { register } from "../../services/api";
const Registration = () => {

const [data, setData] = useState<CompteUtilisateur>({
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
  const [message, setMessage] = useState("");



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    setData({ ...data, [id]: value });
    setMessage("");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
) => {

    event.preventDefault();

    if (data.password !== data.repassword) {
        setMessage("Les mots de passe ne correspondent pas.");
        return;
    }

    try {

        const response = await register(data);

        console.log("DJANGO :", response);

        setMessage("Compte créé avec succès.");

    } catch (error) {

        console.error(error);

        setMessage("Erreur lors de l'inscription.");

    }
};

  return (
    <div className="register-page">
      <div className="register-container">

        {/* Partie gauche */}
        <div className="register-info">
          <h1>Bienvenue !</h1>

          <p>
            Créez votre compte et commencez à utiliser notre
            plateforme de recrutement.
          </p>

          <div className="register-decoration">
            <span>✓</span>
            <p>Gérez votre profil</p>

            <span>✓</span>
            <p>Découvrez les offres</p>

            <span>✓</span>
            <p>Postulez facilement</p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="register-form-container">

          <div className="register-header">
            <h2>Créer un compte</h2>
            <p>Remplissez les informations ci-dessous</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input
                  id="nom"
                  type="text"
                  placeholder="Votre nom"
                  value={data.nom}
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input
                  id="prenom"
                  type="text"
                  placeholder="Votre prénom"
                  value={data.prenom}
                  required
                  onChange={handleInputChange}
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                value={data.email}
                required
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="telephone">Téléphone</label>
                <input
                  id="telephone"
                  type="tel"
                  placeholder="06 00 00 00 00"
                  value={data.telephone}
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Rôle</label>

                  <select
                    id="role"
                    value={data.role}
                    required
                    onChange={handleInputChange}
                  >
                    <option value="">Choisir un rôle</option>
                    <option value="CANDIDAT">Candidat</option>
                    <option value="RECRUTEUR">Recruteur</option>
                    <option value="ADMINISTRATEUR">Administrateur</option>
                  </select>
              </div>

            </div>

            <div className="form-row">

              {data.role === "CANDIDAT" && (
                <div className="form-group">
                  <label htmlFor="cin">CIN</label>

                  <input
                    id="cin"
                    type="text"
                    placeholder="Votre CIN"
                    value={data.cin}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {data.role === "CANDIDAT" && (
                <div className="form-group">
                  <label htmlFor="specialite">Spécialite</label>

                  <input
                    id="specialite"
                    type="text"
                    placeholder="Votre Specialite"
                    value={data.specialite}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              )}
              
            </div>

            {data.role === "RECRUTEUR" && (
              <div className="form-group">
                <label htmlFor="reference_recruteur">
                  Référence recruteur
                </label>

                <input
                  id="reference_recruteur"
                  type="text"
                  placeholder="Votre référence recruteur"
                  value={data.reference_recruteur}
                  required
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <input
                id="adresse"
                type="text"
                placeholder="Votre adresse"
                value={data.adresse}
                required
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="repassword">
                  Confirmer le mot de passe
                </label>
                <input
                  id="repassword"
                  type="password"
                  placeholder="••••••••"
                  value={data.repassword}
                  required
                  onChange={handleInputChange}
                />
              </div>

            </div>

            <button type="submit" className="register-button">
              Créer mon compte
            </button>

          </form>

          <div className="login-link">
            <span>Vous avez déjà un compte ? </span>
            <Link to="/login">Se connecter</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Registration;