// // function Dashboard() {
// //   return (
// //     <div className="dashboard">

// //       <h1>Dashboard</h1>

// //       <div className="stats">

// //         <div className="card">
// //           <h3>Candidats</h3>
// //           <p>125</p>
// //         </div>

// //         <div className="card">
// //           <h3>Offres</h3>
// //           <p>24</p>
// //         </div>

// //         <div className="card">
// //           <h3>Entretiens</h3>
// //           <p>18</p>
// //         </div>

// //         <div className="card">
// //           <h3>Recruteurs</h3>
// //           <p>12</p>
// //         </div>

// //       </div>

// //     </div>
// //   );
// // }

// // export default Dashboard;

// import StatCard from "../components/StatCard";

// function Dashboard() {
//   return (
//     <div className="dashboard">

//       <h1>Dashboard</h1>

//       <div className="stats">

//         <StatCard
//           title="Candidats"
//           value={125}
//         />

//         <StatCard
//           title="Offres"
//           value={24}
//         />

//         <StatCard
//           title="Entretiens"
//           value={18}
//         />

//         <StatCard
//           title="Recruteurs"
//           value={12}
//         />

//       </div>

//     </div>
//   );
// }

// export default Dashboard;


import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";

import {
  getCandidats,
  getRecruteur,
  getOffres,
  getEntretiens
} from "../services/api";

const Dashboard = () => {

  const [candidats, setCandidats] = useState(0);
  const [recruteurs, setRecruteurs] = useState(0);
  const [offres, setOffres] = useState(0);
  const [entretiens, setEntretiens] = useState(0);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const [
          candidatsData,
          recruteursData,
          offresData,
          entretiensData,

        ] = await Promise.all([
          getCandidats(),
          getRecruteur(),
          getOffres(),
          getEntretiens(),
        ]);

        setCandidats(candidatsData.length);
        setRecruteurs(recruteursData.length);
        setOffres(offresData.length);
        setEntretiens(entretiensData.length);

      } catch (error) {

        console.error(
          "Erreur chargement dashboard :",
          error
        );

      }

    };

    loadDashboard();

  }, []);

  return (
    <div>

      <div className="page-header">

        <div>
          <h2>Bienvenue sur Automize Job 👋</h2>

          <p>
            Gérez facilement vos candidats, offres,
            recrutements et entretiens.
          </p>
        </div>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Candidats"
          value={candidats}
          icon="👤"
          description="Candidats enregistrés"
        />

        <StatCard
          title="Recruteur"
          value={recruteurs}
          icon="👤"
          description="recruteurs enregistrés"
        />        

        <StatCard
          title="Offres"
          value={offres}
          icon="👤"
          description="offres enregistrés"
        /> 

        <StatCard
          title="Entretiens"
          value={entretiens}
          icon="👤"
          description="offres enregistrés"
        />         
      </div>

      <div className="dashboard-card">

        <h3>Automize Job</h3>

        <p>
          Plateforme de gestion du recrutement permettant
          de centraliser les candidats, recruteurs,
          offres, candidatures et entretiens.
        </p>

      </div>

    </div>
  );
};

export default Dashboard;