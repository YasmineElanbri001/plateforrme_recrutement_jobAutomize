// import {
//   type FormEvent,
//   useEffect,
//   useState,
// } from "react";

// import {
//   Link,
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import { addOffres, getOffres, updateOffre  } from "../../services/api";

// import type { Offre, TypeContrat } from "../../interfaceFrontend";

// const initialData: Offre = {
//   id: 1,  
//   typeContrat: "SUR_SITE",
//   nom_entreprise: "",
//   lieu: "",
//   specialite: "",
//   image: "",
// };

// const OffreForm = () => {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] =
//     useState<Offre>(initialData);

//   const isEdit = Boolean(id);

//   useEffect(() => {

//     if (!id) return;

//     // getOffres(Number(id))
//     //   .then(setForm)
//     //   .catch(console.error);

//   }, [id]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement
//     >
//   ) => {

//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });

//   };

//   const handleSubmit = async (
//     e: FormEvent
//   ) => {

//     e.preventDefault();

//     try {

//       if (isEdit) {

//         await updateOffre(
//           Number(id),
//           form
//         );

//       }else{

//         await addOffres(form);

//       }

//       navigate("/offres");

//     } catch (error) {

//       console.error(error);
//       alert("Erreur lors de l'enregistrement.");

//     }

//   };

//   return (
//     <div>

//       <div className="page-header">

//         <div>
//           <h2>
//             {isEdit
//               ? "Modifier l'offre"
//               : "Publier une offre"}
//           </h2>
//         </div>

//         <Link
//           to="/offres"
//           className="btn"
//         >
//           ← Retour
//         </Link>

//       </div>

//       <form
//         className="form-card"
//         onSubmit={handleSubmit}
//       >

//         <div className="form-grid">

//           <div className="form-group">
//             <label>Entreprise</label>

//             <input
//               name="nom_entreprise"
//               value={form.nom_entreprise}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Spécialité / Poste</label>

//             <input
//               name="specialite"
//               value={form.specialite}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Lieu</label>

//             <input
//               name="lieu"
//               value={form.lieu}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">

//             <label>Type de contrat</label>

//             <select
//               name="type_contrat"
//               value={form.typeContrat}
//               onChange={handleChange}
//             >

//               <option value="SUR_SITE">
//                 Sur site
//               </option>

//               <option value="HYBRIDE">
//                 Hybride
//               </option>

//               <option value="A_DISTANCE">
//                 À distance
//               </option>

//             </select>

//           </div>

//           <div className="form-group full">

//             <label>URL de l'image</label>

//             <input
//               name="image"
//               value={form.image ?? ""}
//               onChange={handleChange}
//               placeholder="https://..."
//             />

//           </div>

//         </div>

//         <div className="form-actions">

//           <Link
//             to="/offres"
//             className="btn"
//           >
//             Annuler
//           </Link>




//         </div>

//       </form>

//     </div>
//   );
// };

// export default OffreForm;


import React from "react";

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
  getOffres,
  getRecruteur,
  publierOffre,
  updateOffre,
} from "../../services/api";

import type {
  Offre,
  Recruteur,
} from "../../interfaceFrontend";

const initialData: Offre = {
  id: 1,  
  // type: "SUR_SITE",
  nom_entreprise: "",
  lieu: "",
  specialite: "",
  type_contrat:"SUR_SITE",
  recruteur:1,
  image: null,
};

const OffreForm = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Offre>(initialData);

  const [saving, setSaving] = useState(false);
 
  const [recruteurs, setRecruteurs]= useState<Recruteur[]>([]);
  // const [FileSelected, setFileSelectd] = useState(f)
  const [fileSelected, setFileSelected] = React.useState<File>() // also tried <string | Blob>


  const isEdit = Boolean(id);
  

const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;
    
    setFileSelected(fileList[0]);
  };

const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (fileSelected) {
        const formData = new FormData();
        
        formData.append("image", fileSelected, fileSelected.name);
    }
};

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

  // Charger l'offre en cas de modification
  useEffect(() => {

    if (!id) return;

    const loadOffre = async () => {

      try {

        const offres = await getOffres();

        const offre = offres.find(
          (item) => item.id === Number(id)
        );

        if (offre) {
          setForm(offre);
        }

      } catch (error) {

        console.error(error);

      }

    };

    loadOffre();

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

        await updateOffre(
          Number(id),
          form
        );

        alert("Offre modifiée avec succès !");

      } else {
        const formData = new FormData();
        formData.append(
          "nom_entreprise",
          form.nom_entreprise
        );   
        formData.append(
        "lieu",
        form.lieu
        );       
        formData.append(
        "specialite",
        form.specialite
        );
        formData.append(
        "type_contrat",
        form.type_contrat
        );          
        formData.append(
        "recruteur",
        form.recruteur.toString()
        );        
        await publierOffre(formData);

        alert("Offre enregistrée avec succès !");

      }

      // Redirection vers les cards
      navigate("/offresCards");

    } catch (error) {

      console.error(error);

      alert(
        "Erreur lors de l'enregistrement de l'offre."
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
              ? "Modifier l'offre"
              : "Publier une offre"}
          </h2>

        </div>

        <Link
          to="/offres"
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
              Entreprise
            </label>

            <input
              type="text"
              name="nom_entreprise"
              value={form.nom_entreprise}
              onChange={handleChange}
              placeholder="Ex : Capgemini"
              required
            />

          </div>


          {/* Spécialité */}

          <div className="form-group">

            <label>
              Spécialité / Poste
            </label>

            <input
              type="text"
              name="specialite"
              value={form.specialite}
              onChange={handleChange}
              placeholder="Ex : Développeur Java"
              required
            />

          </div>


          {/* Lieu */}

          <div className="form-group">

            <label>
              Lieu
            </label>

            <input
              type="text"
              name="lieu"
              value={form.lieu}
              onChange={handleChange}
              placeholder="Ex : Rabat"
              required
            />

          </div>


          {/* Type contrat */}

           <div className="form-group">

            <label>
              Type de contrat
            </label>

            <select
              name="type_contrat"
              value={form.type_contrat}
              onChange={handleChange}
              required
            >

              <option value="SUR_SITE">
                Sur site
              </option>

              <option value="HYBRIDE">
                Hybride
              </option>

              <option value="A_DISTANCE">
                À distance
              </option>

            </select>

          </div> 

          {/* <div className="form-group">

            <label>
              Le recruteur
            </label>

            <input
              type="number"
              name="recruteur"
              value={form.recruteur}
              onChange={handleChange}
              placeholder="Ex : 1"
              required
            />

          </div> */}


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
          {/* Image */}

          <div className="form-group full">

            <label>
              Upload l'image
            </label>

            <input
              accept="image/*"
              id="file"
              name="file"
              type="file"
              multiple={false}
              onChange={handleImageChange}
            />

            {/* <button
              onClick={uploadFile}
            >
              Choose Picture
            </button> */}

            <button
              type="button"
              onClick={() => document.getElementById("file")?.click()}
            >
            </button>
            {/* <input
              type="text"
              name="image"
              value={form.image ?? ""}
              onChange={handleChange}
              placeholder="https://..."
            /> */}

          </div>

        </div>


        {/* Boutons */}

        <div className="form-actions">

          <Link
            to="/offres"
            className="btn"
          >
            visualiser les offres
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
                : "Enregistrer l'offre"}

          </button>

        </div>

      </form>

    </div>

  );
};

export default OffreForm;