import { useEffect, useState } from "react";

import type { Offre } from "../../interfaceFrontend";

import { getOffres } from "../../services/api";

import OffreCard from "./offreCard";

const OffresCards = () => {

  const [offres, setOffres] = useState<Offre[]>([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadOffres = async () => {

      try {

        const data = await getOffres();

        setOffres(data);

      } catch (error) {

        console.error(
          "Erreur lors du chargement des offres :",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    loadOffres();

  }, []);


  const handlePostuler = (id: number) => {

    console.log(
      "Postulation pour l'offre :",
      id
    );

  };


  if (loading) {

    return (
      <div>
        Chargement des offres...
      </div>
    );

  }


  return (

    <div className="offres-page">

      <h1>
        Offres d'emploi
      </h1>

      <div className="offres-container">

        {offres.map((offre) => (

          <OffreCard
            key={offre.id}
            offre={offre}
            onPostuler={handlePostuler}
          />

        ))}

      </div>

    </div>

  );
};

export default OffresCards;