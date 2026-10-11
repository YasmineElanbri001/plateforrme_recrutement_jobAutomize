import React, { useState } from 'react';
 
const Home: React.FC = () => {
    const [jobTitle, setJobeTitle] = useState('');
    const [city, setCity] = useState('');

 
    return (
    <>

    <div className="home-page">
    
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
        <main>

            {/* <!-- Section principale --> */}

            <section className="hero">

                <h1 className="hero-title">
                    Job Automize
                </h1>


                {/* <!-- Formulaire de recherche --> */}

                <form className="search-container" method="GET" action="#">

                    <div className="search-field">

                        <input
                            type="text"
                            placeholder="Job Title"
                            value={jobTitle}
                            onChange={(e) => setJobeTitle(e.target.value)}
                        />


                    </div>


                    <div className="search-field">
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                    </div>


                    <button type="submit" className="search-button">
                        Find Job
                    </button>

                </form>

            </section>


            {/* <!-- ================= RECOMMANDATION ================= --> */}

            <section className="recommendation">

                <h2>
                    Your next job starts here
                    {/* <br> */}

                    Create an account or sign in to see
                    your personalized job recommendations
                </h2>


                <a href="#" className="get-started">
                    Get Started
                </a>

            </section>

        </main>
    </div> 
    </>      
   
);
};
 
export default Home;