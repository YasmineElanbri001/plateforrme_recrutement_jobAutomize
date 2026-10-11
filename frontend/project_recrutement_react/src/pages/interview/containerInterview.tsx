import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Entretien,  } from "../../interfaceFrontend";
import { getCandidats, getEntretiens } from "../../services/api";
import EntretienCard from "./entretienCon";


function EntretiensContainer() {

  const [entretiens, setEntretiens] = useState<Entretien[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [candidats, setCandidatId] = useState<number | null>(null);
  const [date_entretien, setDate_entretien] = useState<Date | null>(null)


  useEffect(() => {
    const chargerCandidat = async () => {
      try {
        const candidats = await getCandidats();

        if (candidats.length > 0) {
          setCandidatId(candidats[0].id);
        }
      } catch (error) {
        console.error("Erreur récupération candidat :", error);
      }
    };

    chargerCandidat();
  }, []);
    useEffect(() => {

    const chargerEntretiens = async () => {

      try {

        const data = await getEntretiens();

        setEntretiens(data);

      } catch (error) {

        console.error(
          "Erreur chargement Entretiens :",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    chargerEntretiens();

  }, []);


//   const handlePlanifier = async (EtretienId: number) => {
//   try {
//     if (date_entretien === null) {
//       alert("la date ne correspond pas date .");
//       return;
//     }
//     const result = await planifier(EtretienId, date_entretien);

//     if (result.compatible) {
//       alert("candidat disponible imediatement");
//     } else {
//       alert("Candidature enregistrée, mais la date ne correspond pas.");
//     }

//   } catch (error: any) {
//     console.error("Erreur de passer un entretien :", error);

//     const message = error.response?.data?.error;

//     };

// }

  const interviewFiltrees = entretiens.filter((entretien) => {

    const texte = `
      ${entretien.id}
      ${entretien.date_entretien}
      ${entretien.statut}
      ${entretien.duree}
      ${entretien.candidat}
      ${entretien.recruteur}
      ${entretien.postulation}
      ${entretien.offre}
    `.toLowerCase();

    return texte.includes(
      search.toLowerCase()
    );

  });
  return (

    <div className="offres-cards-page">

      {/* HEADER */}

      <div className="cards-page-header">

        <div>

          <span className="page-label">
            Intrview
          </span>

          <h1>
            Planification d'au interview
          </h1>

          <p>
            Découvrez les opportunités disponibles
            et trouvez votre prochain Entretiens.
          </p>

        </div>

        {/* <Link
          to="/offre/nouveau"
          className="new-offer-button"
        >
          + Publier une offre
        </Link> */}


      </div>


      {/* RECHERCHE */}

      <div className="search-container">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Rechercher par entreprise, poste ou ville..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* LOADING */}

      {loading && (

        <div className="loading-container">

          <div className="loader"></div>

          <p>
            Chargement des offres...
          </p>

        </div>

      )}


      {/* AUCUNE OFFRE */}

      {!loading &&
       interviewFiltrees.length === 0 && (

          <div className="empty-offres">

            <div className="empty-icon">
              📋
            </div>

            <h2>
              Aucune offre trouvée
            </h2>

            <p>
              Aucune offre ne correspond à votre recherche.
            </p>

            <Link
              to="/offre/nouveau"
              className="new-offer-button"
            >
              + Publier une offre
            </Link>

          </div>

        )}


      {/* CARDS */}

      {/* {!loading &&
        interviewFiltrees.length > 0 && (

          <div className="offres-grid">

            {interviewFiltrees.map((entretien) => (

              <EntretienCard
                key={entretien.id}
                entretien={entretien}
                onPlanifier={handlePlanifier}
              />

            ))}

          </div>

        )} */}

      {!loading &&
        interviewFiltrees.length > 0 && (

          <div className="offres-grid">

            {interviewFiltrees.map((entretien) => (

              <EntretienCard
                key={entretien.id}
                entretien={entretien}
                onPlanifier={(id) => {
                  console.log("Entretien sélectionné :", id);
                }}
              />

            ))}

          </div>

)}
    </div>
  );
}

export default EntretiensContainer;