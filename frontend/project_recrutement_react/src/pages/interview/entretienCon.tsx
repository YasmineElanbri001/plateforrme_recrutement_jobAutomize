import type { Entretien } from "../../interfaceFrontend";

interface EntretienCardProps {
  entretien: Entretien;
  onPlanifier: (id: number) => void;
}

function EntretienCard({ entretien, onPlanifier }: EntretienCardProps) {
  return (
    <div className="offre-card">

      <div className="offre-card-body">

        {/* <h2>{entretien.id}</h2> */}

        <p className="entreprise-name">
          {entretien.date_entretien}
        </p>

        <p className="entreprise-name">
          {entretien.statut}
        </p>
        

        <p className="entreprise-name">
          {entretien.duree}
        </p>

        <p className="entreprise-name">
          {entretien.canal_entretien}
        </p>

        <p className="entreprise-name">
          {entretien.lieu_entretien}
        </p>

        {/* <div className="offre-details">

          <div>
            <span className="detail-icon">📍</span>
            <span>{entretien.candidat}</span>
          </div>
        </div> */}

        {/* <div className="offre-details">

          <div>
            <span className="detail-icon">📍</span>
            <span>{entretien.recruteur}</span>
          </div>
        </div> */}
        {/* <div className="offre-details">

          <div>
            <span className="detail-icon">📍</span>
            <span>{entretien.postulation}</span>
          </div>
        </div> */}
      </div>

      {/* <div className="offre-card-footer">

        <button
          className="postuler-button"
          onClick={() => {
            if (entretien.id !== undefined) {
              onPlanifier(entretien.id);
            }
          }}
        >
          Accepter →
        </button>

      </div>
      <div className="offre-card-footer">

        <button
          className="postuler-button"
          onClick={() => {
            if (entretien.id !== undefined) {
              onPlanifier(entretien.id);
            }
          }}
        >
          Accepter →
        </button>

      </div> */}
    </div>

  );
}

export default EntretienCard;