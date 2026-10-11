import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getRecruteur, deleteRecruteur } from "../../services/api";

import type { Recruteur } from "../../interfaceFrontend";

const Recruteurs = () => {

  const [recruteurs, setRecruteurs] = useState<Recruteur[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadRecruteurs = async () => {

    try {

      const data = await getRecruteur();
      setRecruteurs(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadRecruteurs();
  }, []);

  const handleDelete = async (id?: number) => {

    if (!id) return;

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce recruteur ?"
    );

    if (!confirmed) return;

    try {

      await deleteRecruteur(id);

      setRecruteurs(
        recruteurs.filter(
          (recruteur) => recruteur.id !== id
        )
      );

    } catch (error) {

      console.error(error);
      alert("Erreur lors de la suppression.");

    }
  };

  const filteredRecruteurs = recruteurs.filter(
    (recruteur) =>
      `${recruteur.nom} ${recruteur.prenom}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      recruteur.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      recruteur.reference_recruteur
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="page-header">

        <div>
          <h2>Liste des recruteurs</h2>
          <p>Gérez les recruteurs de la plateforme.</p>
        </div>

        <Link
          to="/recruteur/nouveau"
          className="btn btn-primary"
        >
          + Nouveau recruteur
        </Link>

      </div>

      <div className="toolbar">

        <input
          type="text"
          placeholder="Rechercher un recruteur..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {loading ? (
        <div className="loading">
          Chargement...
        </div>
      ) : (

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Adresse</th>                
                <th>reference_recruteur</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredRecruteurs.map((recruteur) => (

                <tr key={recruteur.id}>

                  <td>{recruteur.id}</td>

                  <td>
                    <strong>
                      {recruteur.nom} {recruteur.prenom}
                    </strong>
                  </td>

                  <td>{recruteur.email}</td>

                  <td>{recruteur.telephone}</td>

                  <td>{recruteur.adresse}</td>

                  <td>
                    <span className="badge">
                      {recruteur.reference_recruteur || "—"}
                    </span>
                  </td>

                  <td>

                    <div className="actions">

                      <Link
                        to={`/recruteurs/${recruteur.id}`}
                        className="btn btn-small"
                      >
                        Voir
                      </Link>

                      <Link
                        to={`/recruteurs/${recruteur.id}/modifier`}
                        className="btn btn-small btn-warning"
                      >
                        Modifier
                      </Link>

                      <button
                        className="btn btn-small btn-danger"
                        onClick={() =>
                          handleDelete(recruteur.id)
                        }
                      >
                        Supprimer
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredRecruteurs.length === 0 && (
            <div className="empty">
              Aucun recruteur trouvé.
            </div>
          )}

        </div>

      )}

    </div>
  );
};

export default Recruteurs;