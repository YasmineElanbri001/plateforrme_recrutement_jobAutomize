import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCandidats, deleteCandidat } from "../../services/api";

import type { Candidat } from "../../interfaceFrontend";

const Candidats = () => {

  const [candidats, setCandidats] = useState<Candidat[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadCandidats = async () => {
    try {
      const data = await getCandidats();

      console.log("Candidats reçus :", data);

      setCandidats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
};
  useEffect(() => {
    loadCandidats();
  }, []);

  const handleDelete = async (id?: number) => {

    if (!id) return;

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce candidat ?"
    );

    if (!confirmed) return;

    try {

      await deleteCandidat(id);

      setCandidats(
        candidats.filter(
          (candidat) => candidat.id !== id
        )
      );

    } catch (error) {

      console.error(error);
      alert("Erreur lors de la suppression.");

    }
  };

  const filteredCandidats = candidats.filter(
    (candidat) =>
      `${candidat.nom} ${candidat.prenom}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      candidat.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      candidat.cin
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="page-header">

        <div>
          <h2>Liste des candidats</h2>
          <p>Gérez les candidats de la plateforme.</p>
        </div>

        <Link
          to="/candidats/nouveau"
          className="btn btn-primary"
        >
          + Nouveau candidat
        </Link>

      </div>

      <div className="toolbar">

        <input
          type="text"
          placeholder="Rechercher un candidat..."
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
                <th>CIN</th>
                <th>Spécialité</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredCandidats.map((candidat) => (

                <tr key={candidat.id}>

                  <td>{candidat.id}</td>

                  <td>
                    <strong>
                      {candidat.nom} {candidat.prenom}
                    </strong>
                  </td>

                  <td>{candidat.email}</td>

                  <td>{candidat.telephone}</td>

                  <td>{candidat.cin}</td>

                  <td>
                    <span className="badge">
                      {candidat.specialite || "—"}
                    </span>
                  </td>

                  <td>

                    <div className="actions">

                      <Link
                        to={`/candidats/${candidat.id}`}
                        className="btn btn-small"
                      >
                        Voir
                      </Link>

                      <Link
                        to={`/candidats/${candidat.id}/modifier`}
                        className="btn btn-small btn-warning"
                      >
                        Modifier
                      </Link>

                      <button
                        className="btn btn-small btn-danger"
                        onClick={() =>
                          handleDelete(candidat.id)
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

          {filteredCandidats.length === 0 && (
            <div className="empty">
              Aucun candidat trouvé.
            </div>
          )}

        </div>

      )}

    </div>
  );
};

export default Candidats;