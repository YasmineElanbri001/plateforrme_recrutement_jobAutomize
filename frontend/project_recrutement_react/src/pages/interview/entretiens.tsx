import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Entretien } from "../../interfaceFrontend";
import { getEntretiens, annulerEntretien } from "../../services/api";



const Entretiens = () => {

  const [entretiens, setEntretiens] = useState<Entretien[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadEntretiens = async () => {

    try {

      const data = await getEntretiens();
      setEntretiens(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadEntretiens();
  }, []);

  const handleDelete = async (id?: number) => {

    if (!id) return;

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce entretien ?"
    );

    if (!confirmed) return;

    try {

      await annulerEntretien(id);

      setEntretiens(
        entretiens.filter(
          (entretien) => entretien.id !== id
        )
      );

    } catch (error) {

      console.error(error);
      alert("Erreur lors de la suppression.");

    }
  };

    const filteredEntretiens = entretiens.filter(
    (entretien) =>
        String(entretien.id)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        // entretien.date_entretien
        // .toLocaleDateString("fr-FR")
        // .toLowerCase()
        // .includes(search.toLowerCase()) ||
        entretien.date_entretien
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        String(entretien.duree)
        .toLowerCase()
        .includes(search.toLowerCase()) ||

        String(entretien.offre)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        String(entretien.postulation)
        .toLowerCase()
        .includes(search.toLowerCase()) ||

        String(entretien.recruteur)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        entretien.statut
        .toLowerCase()
        .includes(search.toLowerCase())        
    );

  return (
    <div>

      <div className="page-header">

        <div>
          <h2>Liste des entretien</h2>
          <p>Gérez les entretien de la plateforme.</p>
        </div>

        <Link
          to="/entretiens/nouveau"
          className="btn btn-primary"
        >
          + Nouveau entretien
        </Link>

      </div>

      <div className="toolbar">

        <input
          type="text"
          placeholder="Rechercher un entretien..."
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
                <th>date_entretien</th>
                <th>duree</th>
                <th>candidat</th>
                <th>recruteur</th>
                <th>offre</th>
                <th>postulation</th>
                <th>statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredEntretiens.map((entretien) => (

                <tr key={entretien.id}>

                  <td>{entretien.id}</td>

                  <td>
                    <strong>
                      {entretien.date_entretien}
                    </strong>
                  </td>

                  <td>{entretien.duree}</td>

                  <td>{entretien.candidat}</td>

                  <td>{entretien.offre}</td>

                  <td>
                    <span className="badge">
                      {entretien.recruteur || "—"}
                    </span>
                  </td>
                  <td>{entretien.postulation}</td>
                  <td>{entretien.statut}</td>

                  <td>

                    <div className="actions">

                      <Link
                        to={`/entretiens/${entretien.id}`}
                        className="btn btn-small"
                      >
                        Voir
                      </Link>

                      <Link
                        to={`/entretiens/${entretien.id}/modifier`}
                        className="btn btn-small btn-warning"
                      >
                        Modifier
                      </Link>

                      <button
                        className="btn btn-small btn-danger"
                        onClick={() =>
                          handleDelete(entretien.id)
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

          {filteredEntretiens.length === 0 && (
            <div className="empty">
              Aucun candidat trouvé.
            </div>
          )}

        </div>

      )}

    </div>
  );
};

export default Entretiens;