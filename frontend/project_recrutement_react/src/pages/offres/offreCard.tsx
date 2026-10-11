import type { Offre } from "../../interfaceFrontend";

interface OffreCardProps {
  offre: Offre;
  onPostuler: (id: number) => void;
}

function OffreCard({ offre, onPostuler }: OffreCardProps) {
  return (
    <div className="offre-card">

      <div className="offre-card-top">

        <div className="logo-container">
          {offre.image ? (
            <img
              // src={offre.image}
              alt={offre.nom_entreprise}
              className="entreprise-logo"
            />
          ) : (
            <div className="logo-placeholder">
              🏢
            </div>
          )}
        </div>

        <span className="contrat-badge">
          {offre.type_contrat === "SUR_SITE"
            ? "Sur site"
            : offre.type_contrat === "HYBRIDE"
            ? "Hybride"
            : "À distance"}
        </span>

      </div>

      <div className="offre-card-body">

        <h2>{offre.specialite}</h2>

        <p className="entreprise-name">
          {offre.nom_entreprise}
        </p>

        <div className="offre-details">

          <div>
            <span className="detail-icon">📍</span>
            <span>{offre.lieu}</span>
          </div>

          <div>
            <span className="detail-icon">💼</span>
            <span>
              {offre.type_contrat === "SUR_SITE"
                ? "Sur site"
                : offre.type_contrat === "HYBRIDE"
                ? "Hybride"
                : "À distance"}
            </span>
          </div>

        </div>

      </div>

      <div className="offre-card-footer">

        <button
          className="postuler-button"
          onClick={() => {
            if (offre.id !== undefined) {
              onPostuler(offre.id);
            }
          }}
        >
          Postuler →
        </button>

      </div>

    </div>
  );
}

export default OffreCard;