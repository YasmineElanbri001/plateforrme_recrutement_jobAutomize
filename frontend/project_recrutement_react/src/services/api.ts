import axios from "axios";

import type {
  Candidat,
  Recruteur,
  Offre,
  Entretien, 
  Notification,
  Postulation,
  CompteUtilisateur
} from "../interfaceFrontend";
import { data } from "react-router-dom";

export const API_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  const publicRoutes = [
    "/login/",
    "/register/",
  ];

  if (token && !publicRoutes.includes(config.url || "")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* =========================
   CANDIDATS
========================= */

export const getCandidats = async () => {
  const response = await api.get<Candidat[]>("/list_candidat/");
  return response.data;
};

export const getCandidatBy = async (id: number) => {
  const response = await api.get<Candidat>(
    `/details_candidat/${id}/`
  );
  return response.data;
};

export const createCandidat = async (data: Candidat) => {
  const response = await api.post<Candidat>(
    "/create-candidat/",
    data
  );
  return response.data;
};

export const updateCandidat = async (
  id: number,
  data: Candidat
) => {
  const response = await api.post<Candidat>(
    `/update-candidat/${id}/`,
    data
  );

  return response.data;
};

export const deleteCandidat = async (id: number) => {
  return api.delete(`/delete-candidat/${id}/`);
};



// ==============api recruteurs===============================
export const getRecruteur = async () => {
  const response = await api.get<Recruteur[]>("/list_recruteur/");
  return response.data;
};

export const deleteRecruteur = async (id: number) => {
  return api.delete(`/delete-recruteur/${id}/`);
};


// ==============api Offres===============================

export const getOffres = async () => {
  const response = await api.get<Offre[]>("/list_offre/");
  return response.data;
};


export const publierOffre = async (data: FormData) => {
  const response = await api.post<FormData>(
    "/publier_offre/",
    data
  );
  return response.data;
};

  export const updateOffre = async (
    id: number,
    offre: Offre
  ) => {
    const response = await api.post<Offre>(
      `/update_offre/${id}/`,
      offre
    );

    return response.data;
  };

export const deleteOffres = async (id: number) => {
  return api.delete(`/delete_offre/${id}/`);
};

export const postuler = async (
  offreId: number,
  candidatId: number
) => {
  const response = await api.post("/postuler/", {
    offre: offreId,
    candidat: candidatId,
  });

  return response.data;
};
// ==============api entretiens===============================
export const getEntretiens = async () => {
  const response = await api.get<Entretien[]>("/list_entretien/");
  return response.data;
};

export const annulerEntretien = async (id: number) => {
  return api.delete(`/annuler_entretien/${id}/`);
};

export const getNotifications = async () => {
  const response = await api.get<Notification[]>("/list_notification/");
  return response.data;
};

export const deleteNotification = async (id: number) => {
  return api.delete(`/delete_notifications/${id}/`);
};


export const getCandidature = async ()=> {
  const response = await api.get<Postulation[]>("/list_postulation/");
  return response.data;
};

export const accepterCandidature = async (
  postulationId: number,
  dateEntretien: string,
  duree: string,
  lieu_entretien: string
) => {
  const response = await api.post("/accepter_candidature/", {
    postulation: postulationId,
    date_entretien: dateEntretien,
    duree: duree,
    lieu_entretien: lieu_entretien
  });

  return response.data;
};

export const refuserCandidature = async (
  postulationId: number,
  dateEntretien: string,
  duree: string
) => {
  const response = await api.post("/refuser_candidature/", {
    postulation: postulationId,
    date_entretien: dateEntretien,
    duree: duree,
  });

  return response.data;
};


export const addEntretien = async (data: Entretien) => {
  const response = await api.post<Entretien>(
    "/add_entretien/",
     data
  );
    console.log(data)

  return response.data;
};

  export const updateEntretien = async (
    id: number,
    entretien: Entretien
  ) => {
    const response = await api.post<Entretien>(
      `/update_entretien/${id}/`,
      entretien
    );

    return response.data;
  };


    export const createRecruteur = async (recruteur: Recruteur) => {
    const response = await api.post<Recruteur>(
      "/create-recruteur/",
      recruteur
    );

    return response.data;
  };  


  export const updateRecruteur = async (
    id: number,
    recruteur: Recruteur
  ) => {
    const response = await api.post<Recruteur>(
      `/update_recruteur/${id}/`,
      recruteur
    );

    return response.data;
  };   

export const register = async (data: CompteUtilisateur) => {
  const response = await api.post<CompteUtilisateur>(
    "/register/",
    data
  );
  return response.data;
};  


export const login = async(
  username: string,
  password: string
)=> {
  const response = await api.post(
    "/login/", {

      username: username,
      password: password
    }); 
    
  console.log("REPONSE LOGIN :", response.data);
  localStorage.setItem("access", response.data.access);
  localStorage.setItem("role", response.data.role);
  localStorage.setItem("id", String(response.data.id));
  localStorage.setItem("email", response.data.email);
  return response.data

}

