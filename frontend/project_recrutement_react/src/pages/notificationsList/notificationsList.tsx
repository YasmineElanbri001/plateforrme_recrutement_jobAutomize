import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { accepterCandidature, deleteNotification, getNotifications, refuserCandidature } from "../../services/api";
import type { Notification } from "../../interfaceFrontend";

const NotificationList = () => {

  const [notificationsList, setNotificationsList] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // const handleValidate = async (PostulationId: number) => {
  //   try {
  //     if (!PostulationId) {
  //       alert("Aucun candidat trouvé.");
  //       return;
  //     }
  
  //     await accepterCandidature(PostulationId );

  
  //   } catch (error: any) {
  //     console.error("Erreur d'acceptaion :", error);
  
  //     const message = error.response?.data?.error;
  
  //     if (message === "Vous avez un problème.") {
  //       alert("Vous avez un problème");
  //     } else {
  //       alert(message || "Erreur lors de l'acceptation.");
  //     }
  //   }
  // };

// const handleValidate = async (PostulationId: number) => {
//   try {
//     if (!PostulationId) {
//       alert("Aucun candidat trouvé.");
//       return;
//     }

//     const response = await accepterCandidature(
//       PostulationId

//     );

//     console.log("========== ENTRETIEN PLANIFIÉ ==========");
//     console.log(response);

//   } catch (error: any) {
//     console.error("Erreur d'acceptation :", error);

//     const message = error.response?.data?.error;

//     alert(message || "Erreur lors de l'acceptation.");
//   }
// };  


const handleValidate = async (postulationId: number) => {
  try {
    if (!postulationId) {
      alert("Aucun candidat trouvé.");
      return;
    }

    const response = await accepterCandidature(
      postulationId,
      "2026-09-25T10:00:00",
      "01:00:00",
      "Beni Mellal"
    );

    console.log("========== ENTRETIEN PLANIFIÉ ==========");
    console.log(response);

    alert(response.message);

  } catch (error: any) {
    console.error("Erreur d'acceptation :", error);

    const message = error.response?.data?.error;

    alert(message || "Erreur lors de l'acceptation.");
  }
};

const handleRefuser = async (postulationId: number) => {
  try {
    if (!postulationId) {
      alert("Aucun candidat trouvé.");
      return;
    }

    const response = await refuserCandidature(
      postulationId,
      "2026-09-25T10:00:00",
      "01:00:00"
    );

    console.log("========== ENTRETIEN Refuser ==========");
    console.log(response);

    alert(response.message);

  } catch (error: any) {
    console.error("Erreur d'acceptation :", error);

    const message = error.response?.data?.error;

    alert(message || "Erreur lors du refus.");
  }
};
  // const handleValidate = () => {  
  //     alert('Button clicked!');  
  //   };  

  const loadNotification = async () => {

    try {

      const data = await getNotifications();
      setNotificationsList(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };
  useEffect(() => {
    loadNotification();
  }, []);

  // const handleDelete = async (id?: number) => {

  //   if (!id) return;

  //   const confirmed = window.confirm(
  //     "Voulez-vous vraiment supprimer ce notification ?"
  //   );

  //   if (!confirmed) return;

  //   try {

  //     await deleteNotification(id);

  //     setNotificationsList(
  //       notificationsList.filter(
  //         (notification) => notification.id !== id
  //       )
  //     );

  //   } catch (error) {

  //     console.error(error);
  //     alert("Erreur lors de la suppression.");

  //   }
  // };

    // const handleDelete = async (id?: number) => {
  
    //   if (!id) return;
  
    //   const confirmed = window.confirm(
    //     "Voulez-vous vraiment supprimer cette offre ?"
    //   );
  
    //   if (!confirmed) return;
  
    //   try {
  
    //     await deleteNotification(id);
  
    //     setNotificationsList(
    //       notificationsList.filter(
    //         (notification) => notification.id !== id
    //       )
    //     );
  
    //   } catch (error) {
  
    //     console.error(error);
    //     alert("Erreur lors de la suppression.");
  
    //   }
    // };
  const filteredNotifications= notificationsList.filter(
    (notification) =>
        String(notification.id)
        .toLowerCase()
        .includes(search.toLowerCase()) ||      
      notification.day_date
        .toLocaleDateString("fr-FR")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      notification.statut
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (notification.message)
        .toLowerCase()
        .includes(search.toLowerCase()) ||        
      String(notification.postulation)
        .toLowerCase()
        .includes(search.toLowerCase())
  );


  // const filteredNotifications = notificationsList.filter((notification) => {

  // const texte = `
  //   ${notification.day_date}
  //   ${notification.message}
  //   ${notification.statut}
  //   ${notification.postulation}
  //   `.toLowerCase();

  //   return texte.includes(
  //     search.toLowerCase()
  //   );

  // });

  return (
    <div>

      <div className="page-header">

        <div>
          <h2>Liste des Notifications</h2>
          <p>Gérez les Notifications de la plateforme.</p>
        </div>

        {/* <Link
          to="/notification/nouveau"
          className="btn btn-primary"
        >
          + Nouveau candidat
        </Link> */}

      </div>

      <div className="toolbar">

        {/* <input
          type="text"
          placeholder="Rechercher un candidat..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        /> */}

      </div>

      {loading ? (
        <div className="loading">
          Chargement...
        </div>
      ) : (

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Day Date</th>
                <th>Message</th>
                <th>Statut</th>
                <th>Postulation</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredNotifications.map((notification) => (

                <tr key={notification.id}>

                  <td>{notification.id}</td>

                  <td>
                    <strong>
                      {notification.day_date.toString()}
                    </strong>
                  </td>

                  <td>{notification.message}</td>

                  <td>{notification.statut}</td>

                  <td>{notification.postulation}</td>

                  <td>

                    <div className="actions">

                      {/* <Link
                        to={`/notificationList/${notification.id}`}
                        className="btn btn-small"
                      >
                        Voir
                      </Link> */}
                      {/* <Link
                        to={`/entretiens/${notification.id}`}
                        className="btn btn-small"
                      >
                      Valider
                      </Link> */}
                     
                      {/* <Link
                        to={`/candidats/${candidat.id}/modifier`}
                        className="btn btn-small btn-warning"
                      >
                        Modifier
                      </Link> */}

                      {/* <button
                        className="btn btn-small btn-danger"
                        onClick={() =>
                          handleDelete(notification.id)
                        }
                      >
                        Supprimer
                      </button> */}

                      {/* <button
                        className="btn btn-small btn-danger"
                        onClick={() =>
                          handleDelete(notification.id)
                        }
                      >
                        Supprimer
                      </button>                       */}
                    <button onClick={() => handleValidate(notification.postulation)}>
                      Valider
                    </button>      
                    <button onClick={() => handleRefuser(notification.postulation)}>
                      Refuser
                    </button>                                      
                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredNotifications.length === 0 && (
            <div className="empty">
              Aucun notification trouvé.
            </div>
          )}

        </div>

      )}

    </div>
  );
};

export default NotificationList;