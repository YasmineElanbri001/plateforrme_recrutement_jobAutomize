import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Offre } from "../../interfaceFrontend";
import { getOffres, postuler, getCandidats } from "../../services/api";


import OffreCard from "./offreCard";
function OffresCards() {

  const [offres, setOffres] = useState<Offre[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [candidatId, setCandidatId] = useState<number | null>(null);

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

    const chargerOffres = async () => {

      try {

        const data = await getOffres();

        setOffres(data);

      } catch (error) {

        console.error(
          "Erreur chargement offres :",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    chargerOffres();

  }, []);


  // const handlePostuler = (id: number) => {

  //   alert(
  //     `Vous avez sélectionné l'offre ${id}`
  //   );

  // };

  // const handlePostuler = async (offreId: number) => {
  //   try {
  //     if (candidatId === null) {
  //       alert("Aucun candidat trouvé.");
  //       return;
  //     }

  //     const result = await postuler(offreId, candidatId);

  //     if (result.compatible) {
  //       alert(
  //         "Candidature envoyée. Le recruteur a reçu une notification."
  //       );
  //     } else {
  //       alert(
  //         "Candidature enregistrée, mais la spécialité ne correspond pas."
  //       );
  //     }

  //   } catch (error) {
  //     console.error("Erreur candidature :", error);
  //     alert("Erreur lors de la candidature.");
  //   }
  // };
  // const handlePostuler = async (offreId: number) => {
  //   try {
  //     if (candidatId === null) {
  //       alert("Aucun candidat trouvé.");
  //       return;
  //     }

  //     const result = await postuler(offreId, candidatId);

  //     if (result.compatible) {
  //       alert(
  //         "Candidature envoyée. Le recruteur a reçu une notification."
  //       );
  //     } else {
  //       alert(
  //         "Candidature enregistrée, mais la spécialité ne correspond pas."
  //       );
  //     }

  //   } catch (error: any) {
  //     console.error("Erreur candidature :", error);

  //     console.error(
  //       "Réponse Django :",
  //       error.response?.data
  //     );

  //     alert(
  //       error.response?.data?.error ||
  //       "Erreur lors de la candidature."
  //     );
  //   }
  // };

  const handlePostuler = async (offreId: number) => {
  try {
    if (candidatId === null) {
      alert("Aucun candidat trouvé.");
      return;
    }

    const result = await postuler(offreId, candidatId);

    if (result.compatible) {
      alert("Candidature envoyée. Le recruteur a reçu une notification.");
    } else {
      alert("Candidature enregistrée, mais la spécialité ne correspond pas.");
    }

  } catch (error: any) {
    console.error("Erreur candidature :", error);

    const message = error.response?.data?.error;

    if (message === "Vous avez déjà postulé à cette offre.") {
      alert("Vous avez déjà postulé à cette offre.");
    } else {
      alert(message || "Erreur lors de la candidature.");
    }
  }
};
  const offresFiltrees = offres.filter((offre) => {

    const texte = `
      ${offre.nom_entreprise}
      ${offre.specialite}
      ${offre.lieu}
      ${offre.type_contrat}
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
            OPPORTUNITÉS
          </span>

          <h1>
            Offres d'emploi
          </h1>

          <p>
            Découvrez les opportunités disponibles
            et trouvez votre prochain emploi.
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
        offresFiltrees.length === 0 && (

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

      {!loading &&
        offresFiltrees.length > 0 && (

          <div className="offres-grid">

            {offresFiltrees.map((offre) => (

              <OffreCard
                key={offre.id}
                offre={offre}
                onPostuler={handlePostuler}
              />

            ))}

          </div>

        )}

    </div>
  );
}

export default OffresCards;