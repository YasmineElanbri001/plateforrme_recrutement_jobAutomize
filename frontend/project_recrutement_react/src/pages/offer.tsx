import React from "react";

const Offer: React.FC = () => {
  return (
    <div className="offer-page">

      {/* ================= HEADER ================= */}
      <div className="header-container">
        <h1>Welcome To Our Offers</h1>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="nav-links">
        <a href="#">Login</a>

        <a href="/home">Accueil</a>

        <a href="/offre">Job Offer</a>

        <a href="#">Our Recruitment Service</a>
      </nav>

      {/* ================= CONTENU PRINCIPAL ================= */}
      <main className="offers-container">

        {/* ================= OFFRE 1 ================= */}
        <div className="offer-card">

          <div className="offer-image">
            <img src="/images/cypher.png" alt="Cypher" />
          </div>

          <div className="offer-content">

            <h2>Junior Développeur FullStack</h2>

            <div className="offer-tags">

              <span className="tag location">
                Casablanca
              </span>

              <span className="tag type">
                Stage
              </span>

              <span className="tag mode">
                Sur site
              </span>

            </div>

            <div className="company">
              Cypher
            </div>

          </div>

          <div className="offer-footer">

            <a href="#" className="see-more">
              See more
            </a>

            <a href="#" className="postuler">
              Postuler
            </a>

          </div>

        </div>


        {/* ================= OFFRE 2 ================= */}
        <div className="offer-card">

          <div className="offer-image">
            <img src="/images/inwi.png" alt="Inwi" />
          </div>

          <div className="offer-content">

            <h2>Responsable Logistique</h2>

            <div className="offer-tags">

              <span className="tag location">
                Casablanca
              </span>

              <span className="tag type">
                Freelance
              </span>

              <span className="tag mode">
                Sur site
              </span>

            </div>

            <div className="company">
              Inwi
            </div>

          </div>

          <div className="offer-footer">

            <a href="#" className="see-more">
              See more
            </a>

            <a href="#" className="postuler">
              Postuler
            </a>

          </div>

        </div>


        {/* ================= OFFRE 3 ================= */}
        <div className="offer-card">

          <div className="offer-image">
            <img src="/images/cypher.png" alt="Cypher" />
          </div>

          <div className="offer-content">

            <h2>Junior Développeur FullStack</h2>

            <div className="offer-tags">

              <span className="tag location">
                Casablanca
              </span>

              <span className="tag type">
                Full-Time
              </span>

              <span className="tag mode">
                Sur site
              </span>

            </div>

            <div className="company">
              Cypher
            </div>

          </div>

          <div className="offer-footer">

            <a href="#" className="see-more">
              See more
            </a>

            <a href="#" className="postuler">
              Postuler
            </a>

          </div>

        </div>


        {/* ================= OFFRE 4 ================= */}
        <div className="offer-card">

          <div className="offer-image">
            <img
              src="/images/maroc-telecom.png"
              alt="Maroc Telecom"
            />
          </div>

          <div className="offer-content">

            <h2>Chef De Projet CI/CD</h2>

            <div className="offer-tags">

              <span className="tag location">
                Rabat
              </span>

              <span className="tag type">
                Full-Time
              </span>

              <span className="tag mode">
                À distance
              </span>

            </div>

            <div className="company">
              Maroc Telecom
            </div>

          </div>

          <div className="offer-footer">

            <a href="#" className="see-more">
              See more
            </a>

            <a href="#" className="postuler">
              Postuler
            </a>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Offer;
