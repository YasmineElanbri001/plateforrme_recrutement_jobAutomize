import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteOffres, getOffres } from "../../services/api";
import type { Offre } from "../../interfaceFrontend";



const Offres = () => {

  const [offres, setOffres] = useState<Offre[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadOffres = async () => {

    try {

      const data = await getOffres();
      setOffres(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadOffres();
  }, []);

  const handleDelete = async (id?: number) => {

    if (!id) return;

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette offre ?"
    );

    if (!confirmed) return;

    try {

      await deleteOffres(id);

      setOffres(
        offres.filter(
          (offre) => offre.id !== id
        )
      );

    } catch (error) {

      console.error(error);
      alert("Erreur lors de la suppression.");

    }
  };

  const filteredOffres = offres.filter(
    (offre) =>
      `${offre.id} ${offre.nom_entreprise}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      offre.lieu
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      offre.specialite
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      offre.type_contrat
        .toLowerCase()
        .includes(search.toLowerCase()) ||          
      offre.type_contrat
        .toLowerCase()
        .includes(search.toLowerCase()) ||           
      offre.recruteur.toString()
        .toLowerCase()
        .includes(search.toLowerCase())         
  );

  return (
    <div>

      <div className="page-header">

        <div>
          <h2>Liste des offres</h2>
          <p>Gérez les offres de la plateforme.</p>
        </div>

        <Link
          to="/offre/nouveau"
          className="btn btn-primary"
        >
          + Publier une offre
        </Link>

      </div>

      <div className="toolbar">

        <input
          type="text"
          placeholder="Rechercher une offre..."
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
                <th>Nom Entreprise</th>
                <th>Lieu</th>
                <th>Specialite</th>
                <th>typeContrat</th>
                <th>Recruteur</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredOffres.map((offre) => (

                <tr key={offre.id}>

                  <td>{offre.id}</td>

                  <td>
                    <strong>
                      {offre.nom_entreprise}
                    </strong>
                  </td>

                  <td>{offre.lieu}</td>

                  <td>{offre.specialite}</td>

                  
                  <td>{offre.type_contrat}</td>

                  <td>{offre.recruteur}</td>

                  <td>

                    <div className="actions">

                      <Link
                        to={`/offres/${offre.id}`}
                        className="btn btn-small"
                      >
                        Voir
                      </Link>

                      <Link
                        to={`/offres/${offre.id}/modifier`}
                        className="btn btn-small btn-warning"
                      >
                        Modifier
                      </Link>

                      <button
                        className="btn btn-small btn-danger"
                        onClick={() =>
                          handleDelete(offre.id)
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

          {filteredOffres.length === 0 && (
            <div className="empty">
              Aucun offre trouvé.
            </div>
          )}

        </div>

      )}

    </div>
  );
};

export default Offres;