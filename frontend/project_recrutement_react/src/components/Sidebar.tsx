// import { NavLink } from "react-router-dom";

// const username =localStorage.getItem("username")
// const role = localStorage.getItem("role")

// const Sidebar = () => {
//   return (
//     <aside className="sidebar">

//       <div className="sidebar-logo">
//         <div className="logo-icon">AJ</div>

//         <div>
//           <h2>Automize</h2>
//           <span>Job</span>
//         </div>
//       </div>

//       <nav className="sidebar-nav">

//         <p className="menu-title">MENU PRINCIPAL</p>

//         <NavLink
//           to="/home"
//           className={({ isActive }) =>
//             isActive ? "nav-item active" : "nav-item"
//           }
//         >
//           <span>⌂</span>
//           Dashboard
//         </NavLink>
//         {role === "ADMINISTRATEUR" &&(
//           <NavLink
//             to="/candidats"
//             className={({ isActive }) =>
//               isActive ? "nav-item active" : "nav-item"
//             }
//           >
//             <span>👤</span>
//             Candidats
//           </NavLink>
//         )}

//         {role === "ADMINISTRATEUR" &&(
//           <NavLink
//             to="/recruteurs"
//             className={({ isActive }) =>
//               isActive ? "nav-item active" : "nav-item"
//             }
//           >
//             <span>👤</span>
//             Recruteurs
//           </NavLink>
//         )}

        
//         <NavLink
//           to="/offres"
//           className={({ isActive }) =>
//             isActive ? "nav-item active" : "nav-item"
//           }
//         >
//           <span>👤</span>
//           Offres
//         </NavLink>

//         <NavLink
//           to="/entretiens"
//           className={({ isActive }) =>
//             isActive ? "nav-item active" : "nav-item"
//           }
//         >
//           <span>👤</span>
//           Entretiens
//         </NavLink>        

//         <NavLink
//           to="/entretienCon"
//           className={({ isActive }) =>
//             isActive ? "nav-item active" : "nav-item"
//           }
//         >
//           <span>👤</span>
//           Entretien Cards
//         </NavLink>     

//         <NavLink
//           to="/offresCards"
//           className={({ isActive }) =>
//             isActive ? "nav-item active" : "nav-item"
//           }
//         >
//           <span>👤</span>
//           Cards
//         </NavLink> 

//         {role === "RECRUTEUR" &&(
//           <NavLink
//             to="/notificationsList"
//             className={({ isActive }) =>
//               isActive ? "nav-item active" : "nav-item"
//             }
//           >
//             <span>👤</span>
//             Notification
//           </NavLink> 
//         )}
//         {/* <NavLink
//           to="/login"
//           className={({ isActive }) =>
//             isActive ? "nav-item active" : "nav-item"
//           }
//         >
//           <span>👤</span>
//           Login Page
//         </NavLink> 

//         <NavLink
//           to="/register"
//           className={({ isActive }) =>
//             isActive ? "nav-item active" : "nav-item"
//           }
//         >
//           <span>👤</span>
//           Registration Page
//         </NavLink>  */}
//         <NavLink
//           to="/deconnexion"
//           className={({ isActive }) =>
//             isActive ? "nav-item active" : "nav-item"
//           }
//         >
//           <span>👤</span>
//           Deconnexion
//         </NavLink>   
//       </nav>

//       {/* <div className="sidebar-bottom">

//         <div className="user-mini">

//           <div className="avatar"
//             {username
//               ? username.charAt(0).toUpperCase()
//               : "U"}
//           </div> 
          
          
//           <div>
//             <strong>
//               {username || "utilisateur"}
            
//             </strong>
//             <small>
//               {role || "Rôle Inconnu"}
//             </small>
//           </div>
//         </div>
//       </div> */}
//       <div className="sidebar-bottom">
//         <div className="user-mini">

//           <div className="avatar">
//             {username
//               ? username.charAt(0).toUpperCase()
//               : "U"}
//           </div>

//           <div>
//             <strong>
//               {username || "utilisateur"}
//             </strong>

//             <small>
//               {role || "Rôle Inconnu"}
//             </small>
//           </div>

//         </div>
//       </div>

//     </aside>
//   );
// };

// export default Sidebar;


import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const email  = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">AJ</div>

        <div>
          <h2>Automize</h2>
          <span>Job</span>
        </div>
      </div>

      <nav className="sidebar-nav">

        <p className="menu-title">MENU PRINCIPAL</p>

        {/* Dashboard */}
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>⌂</span>
          Dashboard
        </NavLink>

        {/* Candidats : ADMINISTRATEUR uniquement */}
        {role === "ADMINISTRATEUR" && (
          <NavLink
            to="/candidats"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>👤</span>
            Candidats
          </NavLink>
        )}

        {/* Recruteurs : ADMINISTRATEUR uniquement */}
        {role === "ADMINISTRATEUR" && (
          <NavLink
            to="/recruteurs"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>👤</span>
            Recruteurs
          </NavLink>
        )}

        {/* Offres */}
        <NavLink
          to="/offres"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>👤</span>
          Offres
        </NavLink>

        {/* Entretiens */}
        <NavLink
          to="/entretiens"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>👤</span>
          Entretiens
        </NavLink>

        {/* Entretien Cards */}
        <NavLink
          to="/entretienCon"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>👤</span>
          Entretien Cards
        </NavLink>

        {/* Cards */}
        <NavLink
          to="/offresCards"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>👤</span>
          Cards
        </NavLink>

        {/* Notifications : RECRUTEUR uniquement */}
        {role === "RECRUTEUR" && (
          <NavLink
            to="/notificationsList"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>👤</span>
            Notification
          </NavLink>
        )}

        {/* Déconnexion */}
        <NavLink
          to="/deconnexion"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>👤</span>
          Deconnexion
        </NavLink>

      </nav>

      {/* Utilisateur connecté */}
      <div className="sidebar-bottom">
        <div className="user-mini">

          <div className="avatar">
            {email 
              ? email .charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <strong>
              {email  || "email"}
            </strong>

            <small>
              {role || "Rôle Inconnu"}
            </small>
          </div>

        </div>
      </div>

    </aside>
  );
};

export default Sidebar;