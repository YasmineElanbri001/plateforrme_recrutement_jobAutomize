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

import { createCandidat, updateCandidat  } from "../../services/api";
import type { Candidat } from "../../interfaceFrontend";


const initialData: Candidat = {
  id: 1,  
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  adresse: "",
  cin: "",
  specialite: ""
};

const CandidatForm = () => {


  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] =
    useState<Candidat>(initialData);

  const isEdit = Boolean(id);

  useEffect(() => {}, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: FormEvent
  ) => {

    e.preventDefault();

    try {

      if (isEdit) {

        await updateCandidat(
          Number(id),
          form
        );

      }else{

        await createCandidat(form);

      }

      navigate("/candidats");

    } catch (error) {

      console.error(error);
      alert("Erreur lors de l'enregistrement.");

    }

  };

  return (
    <div>

      <div className="page-header">

        <div>
          <h2>
            {isEdit
              ? "Modifier le candidat"
              : "Creer un candidat"}
          </h2>
        </div>

        <Link
          to="/candidats"
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

          <div className="form-group">
            <label>Nom du Candidat</label>

            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Prenom du Candidat</label>

            <input
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Téléphone</label>

            <input
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label>Adresse</label>

            <input
              name="adresse"
              value={form.adresse}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label>CIN</label>

            <input
              name="cin"
              value={form.cin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Spécialiter</label>

            <input
              name="specialite"
              value={form.specialite}
              onChange={handleChange}
              required
            />
          </div>          

        </div>

        <div className="form-actions">

          {/* <Link
            to="/candidats"
            className="btn"
          >
            Annuler
          </Link> */}
          <Link
            to="/candidats"
            className="btn"
          >
            visualiser les candidats
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
                : "Enregistrer le candidat"}

          </button>

        </div>

      </form>

    </div>
  );
};

export default CandidatForm;