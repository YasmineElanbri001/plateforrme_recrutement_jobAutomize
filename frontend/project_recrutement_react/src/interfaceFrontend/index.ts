export interface Candidat {
  id: number;  
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  cin: string;
  specialite: string;
}

export interface Recruteur{
  id?: number;  
  nom: string;
  prenom: string;
  email: string
  telephone: string;
  adresse: string;
  reference_recruteur: string;
}

export type TypeContrat= 
  | "SUR_SITE"
  | "HYBRIDE"
  | "A_DISTANCE";

export interface Offre{
    id: number;
    nom_entreprise: string;
    lieu: string;
    specialite: string;
    type_contrat: TypeContrat;
    recruteur: number;
    image: File | null;
}

export type StatutEntretien =
  | "PLANIFIE"
  | "PASSER"
  | "ABSCENT"
  | "OCCUPER"
  | "CONTACTER"
  | "EN_ATTENTE"
  | "ACCEPTE"
  | "REFUSE";

export type CanalEntretien =
  | "PRESENTIEL"
  | "A_DISTANCE";

export interface Entretien{
    id: number;
    date_entretien: string;
    duree: string;
    canal_entretien: CanalEntretien
    lieu_entretien: string
    candidat: number;
    recruteur: number;
    offre: number;
    postulation: number;
    statut: StatutEntretien
}


export type Statut =
  | "NOUVELLE_CANDIDATURE"
  | "PLANIFIE"
  | "PASSER"
  | "ABSCENT"
  | "OCCUPER"
  | "CONTACTER"
  | "EN_ATTENTE"
  | "ACCEPTE"
  | "REFUSE";

export interface Postulation{
    id: number;
    offre: number;
    candidat: number;
    date_candidature: Date;


}

export interface Notification{
    id: number;
    day_date: Date;
    message: string;
    statut: Statut
    postulation: number;

}



export type Role =
  | "Administrateur"
  | "Utilisateur"
  | "Recruteur"
  | "Candidat";


export interface CompteUtilisateur{
  id:number;
  username: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string
  adresse: string;
  cin: string;
  reference_recruteur: string;
  specialite: string
  role: string;
  password: string;
  repassword: string;
}