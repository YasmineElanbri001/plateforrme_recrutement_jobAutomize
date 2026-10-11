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

import {createRecruteur, updateRecruteur  } from "../../services/api";
import type { Recruteur } from "../../interfaceFrontend";


const initialData: Recruteur = {
  id: 1,  
  nom: "Farah",
  prenom: "Farhati",
  email: "farah01@gmail.com",
  telephone: "0675986329",
  adresse: "Lot Al Majd Bloc B IMM 02",
  reference_recruteur : "Ref-002"
};

const RecruteurForm = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form, setForm] =
    useState<Recruteur>(initialData);

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

        await updateRecruteur(
          Number(id),
          form
        );

      }else{

        await createRecruteur(form);

      }

      navigate("/recruteurs");

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
              ? "Modifier le recruteur"
              : "Creer un recruteur"}
          </h2>
        </div>

        <Link
          to="/recruteurs"
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
            <label>Nom du Recruteur</label>

            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Prenom du Recruteur</label>

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
            <label>Adresse Recruteur</label>

            <input
              name="adresse"
              value={form.adresse}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label>La Reférence du Recruteur</label>

            <input
              name="reference_recruteur"
              value={form.reference_recruteur}
              onChange={handleChange}
              required
            />
          </div>         

        </div>

        <div className="form-actions">

          <Link
            to="/recruteurs"
            className="btn"
          >
            visualiser les recruteurs
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
                : "Enregistrer le recruteur"}

          </button>
        </div>

      </form>

    </div>
  );
};

export default RecruteurForm;