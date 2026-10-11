import {
  type FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  addEntretien,
  getCandidats,
  getCandidature,
  getEntretiens,
  getOffres,
  getRecruteur,
  updateEntretien
} from "../../services/api";

import type {
  Candidat,
    Entretien,
    Offre,
    Postulation,
    Recruteur,
} from "../../interfaceFrontend";

const initialData: Entretien = {
  id: 1,  
  date_entretien: "2026-09-25T14:00" ,
  duree: "",
  canal_entretien: "PRESENTIEL",
  lieu_entretien: "",
  candidat: 0,
  recruteur: 0,
  offre: 0,
  postulation:0,
  statut: "PLANIFIE"
};

const EntretienForm = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Entretien>(initialData);
  const [candidats, setCandidats]= useState<Candidat[]>([]);
  const [recruteurs, setRecruteurs]= useState<Recruteur[]>([]);
  const [offres, setOffres]= useState<Offre[]>([]);
  const [candidatures, setCandidatures]= useState<Postulation[]>([]);
  

  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(id);

useEffect(() => {

  const loadCandidats = async () => {

    try {

      const data = await getCandidats();

      setCandidats(data);

    } catch (error) {

      console.error(error);

    }

  };

  loadCandidats();

}, []);


useEffect(() => {

  const loadRecruteurs = async () => {

    try {

      const data = await getRecruteur();

      setRecruteurs(data);

    } catch (error) {

      console.error(error);

    }

  };

  loadRecruteurs();

}, []);


useEffect(() => {

  const loadOffres = async () => {

    try {

      const data = await getOffres();

      setOffres(data);

    } catch (error) {

      console.error(error);

    }

  };

  loadOffres();

}, []);

useEffect(() => {

  const loadPostulations = async () => {

    try {

      const data = await getCandidature();

      setCandidatures(data);

    } catch (error) {

      console.error(error);

    }

  };

  loadPostulations();

}, []);

  useEffect(() => {

    if (!id) return;

    const loadEntretien = async () => {

      try {

        const entretiens = await getEntretiens();

        const entretien = entretiens.find(
          (item) => item.id === Number(id)
        );

        if (entretien) {
          setForm(entretien);
        }

      } catch (error) {

        console.error(error);

      }

    };

    loadEntretien();

  }, [id]);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setSaving(true);

    try {

      if (isEdit) {

        await updateEntretien(
          Number(id),
          form
        );

        alert("Entretien modifiée avec succès !");

      } else {
        
      } {

        await addEntretien(form);

        alert("Entretien enregistrée avec succès !");

      }

      // Redirection vers les cards
      navigate("/entretienCon");

    } catch (error) {

      console.error(error);

      alert(
        "Erreur lors de l'enregistrement de l'entretien."
      );

    } finally {

      setSaving(false);

    }

  };


  return (

    <div>

      <div className="page-header">

        <div>

          <h2>
            {isEdit
              ? "Modifier l'entretien"
              : "choisir canal"}
          </h2>

        </div>

        <Link
          to="/entretiens"
          className="btn"
        >
          ← Retour
        </Link>

      </div>


      <form
        className="form-card"
        onSubmit={handleSubmit}
      >

        <div className="form-grid">

          {/* Entreprise */}

          <div className="form-group">

            <label>
              Date Entretien
            </label>

            <input
              type="text"
              name="date_entretien"
              value={form.date_entretien}
              onChange={handleChange}
              placeholder="Ex : Capgemini"
              required
            />

          </div>


          {/* La duree */}

          <div className="form-group">

            <label>
              La durée de l'entretien
            </label>

            <input
              type="number"
              name="duree"
              value={form.duree}
              onChange={handleChange}
              placeholder="Ex : Développeur Java"
              required
            />

          </div>

           <div className="form-group">

            <label>
              Canal d'entretien
            </label>

            <select
              name="canal_entretien"
              value={form.canal_entretien}
              onChange={handleChange}
              required
            >

              <option value="PRESENTIEL">
                PRESENTIEL
              </option>

              <option value="A_DISTANCE">
                A_DISTANCE
              </option>

                        
            </select>

          </div> 
          {/* <div className="form-group">

            <label>
              Statut de l'Entretien
            </label>

            <input
              type="text"
              name="statut"
              value={form.statut}
              onChange={handleChange}
              required
            />

          </div> */}


          <div className="form-group">

            <label>
              Le lieu de l'entretien
            </label>

            <input
              type="text"
              name="lieu_entretien"
              value={form.lieu_entretien}
              onChange={handleChange}
              placeholder="Ex : Marrakech"
              required
            />

          </div>


           <div className="form-group">

            <label>
              Statut d'entretien
            </label>

            <select
              name="statut"
              value={form.statut}
              onChange={handleChange}
              required
            >

              <option value="NOUVELLE_CANDIDATURE">
                Nouvelle Candidature
              </option>

              <option value="PLANIFIE">
                Planifie
              </option>

              <option value="PASSER">
                Passer
              </option>

              <option value="ACCEPTE">
                Accepter
              </option>

              <option value="EN_ATTENTE">
                En_Attente
              </option>

              <option value="REFUSE">
                Refuser
              </option>                            
            </select>

          </div> 

          <div className="form-group">
            <label>
              Le Candidat
            </label> 

            <select
              name="candidat"
              value={form.candidat}
              onChange={handleChange}
              required
            >
              <option value="">
                -- Sélectionner un candidat --
              </option>

              {candidats.map((candidat) => (
                <option
                  key={candidat.id}
                  value={candidat.id}
                >
                  {candidat.nom} {candidat.prenom}
                </option>
              ))}
            </select>            

            {/* <label>
              Le Candidat
            </label>
            {candidats.map((candidat) => (
                <li key={event.id}>{event.date.toLocaleDateString()}</li>
            ))} */}
            {/* <input
              type="text"
              name="candidat"
              value={form.candidat}
              onChange={handleChange}
              required
            /> */}

          </div>


          <div className="form-group">
            <label>
              Le Recruteur
            </label> 

            <select
              name="recruteur"
              value={form.recruteur}
              onChange={handleChange}
              required
            >
              <option value="">
                -- Sélectionner un recruteur --
              </option>

              {recruteurs.map((recruteur) => (
                <option
                  key={recruteur.id}
                  value={recruteur.id}
                >
                  {recruteur.nom} {recruteur.prenom}
                </option>
              ))}
            </select>            

          </div>

          <div className="form-group">
            <label>
              Les Offres
            </label> 

            <select
              name="offre"
              value={form.offre}
              onChange={handleChange}
              required
            >
              <option value="">
                -- Sélectionner une offre --
              </option>

              {offres.map((offre) => (
                <option
                  key={offre.id}
                  value={offre.id}
                >
                  {offre.nom_entreprise} {offre.lieu}
                </option>
              ))}
            </select>            

          </div>          
          {/* <div className="form-group">

            <label>
              La Postulation
            </label>

            <input
              type="number"
              name="postulation"
              value={form.postulation}
              onChange={handleChange}
              required
            />

          </div> */}
          <div className="form-group">
            <label>
              La Candidature
            </label> 

            <select
              name="postulation"
              value={form.postulation}
              onChange={handleChange}
              required
            >
              <option value="">
                -- Sélectionner une candidature --
              </option>

              {candidatures.map((postulation) => (
                <option
                  key={postulation.id}
                  value={postulation.id}
                >
                  {postulation.id} {postulation.date_candidature.toString()}
                </option>
              ))}
            </select>            

          </div>

        </div>


        {/* Boutons */}

        <div className="form-actions">

          <Link
            to="/containerInterview"
            className="btn"
          >
            Annuler
          </Link>


          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >

            {saving
              ? "Enregistrement..."
              : isEdit
                ? "Enregistrer les modifications"

                : "Enregistrer l'entretien"}

          </button>

        </div>

      </form>

    </div>

  );
};

export default EntretienForm;