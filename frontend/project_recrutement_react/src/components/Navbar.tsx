import { useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();

  const getTitle = () => {

    if (location.pathname === "/") {
      return "Dashboard";
    }

    if (location.pathname.startsWith("/candidats")) {
      return "Candidats";
    }

    if (location.pathname.startsWith("/recruteurs")) {
      return "Recruteurs";
    }

    if (location.pathname.startsWith("/offres")) {
      return "Offres";
    }

    if (location.pathname.startsWith("/postulations")) {
      return "Postulations";
    }

    if (location.pathname.startsWith("/entretiens")) {
      return "Entretiens";
    }

    if (location.pathname.startsWith("/notifications")) {
      return "Notifications";
    }

    // if (location.pathname.startsWith("/login")) {
    //   return "Login";
    // }
    
    // if (location.pathname.startsWith("/register")) {
    //   return "Registration";
    // }    
    return "Automize Job";
  };

  return (
    <header className="navbar">

      <div>
        <h1>{getTitle()}</h1>
        <p>Gestion de recrutement</p>
      </div>

      <div className="navbar-right">

        <button className="notification-button">
          🔔
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          <div className="avatar">
            Y
          </div>

          <div>
            <strong>Yasmina</strong>
            <small>RECRUTEUR</small>
          </div>
        </div>

      </div>

    </header>
  );
};

export default Navbar;