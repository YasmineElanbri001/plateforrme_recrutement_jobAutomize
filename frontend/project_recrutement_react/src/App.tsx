
import './App.css'
import { useEffect, useState } from 'react';
import Dashboard from './pages/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Candidats from './pages/candidats/candidats';
import Recruteurs from './pages/recruteurs/recruteurs';
import Offres from './pages/offres/offres';
import Entretiens from './pages/interview/entretiens';
import CandidatForm from './pages/candidats/candidatForm';
import OffreForm from './pages/offres/offreForm';
import OffresCards from './pages/offres/offresCards';
import NotificationList from './pages/notificationsList/notificationsList';
import EntretiensContainer from './pages/interview/containerInterview';
import EntretienForm from './pages/interview/entretiensForm';
import RecruteurForm from './pages/recruteurs/recruteurForm';
import Login from './components/authentification/LoginComponent';
import Registration from './components/authentification/Register';

function App() {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api')
    .then(response => response.json())
    .then(data => setMessage(data.message))
    .catch(error => console.error('Error fetching message: ', error));
   
}, []); // Dependency array ensures the effect only runs when count changes


  return (
    // <div>
    //   <h1>message from backend</h1>
    //   <p>{message}</p>
    // </div>
    <BrowserRouter>

      <Routes>

          <Route path="/" element={<Login />}/>  

          <Route path="/login" element={<Login />}/>  

          <Route path="/register" element={<Registration />}/>  
        



        {/* <Route index element={<Dashboard />}/> */}
        <Route element={<Layout />}>

          <Route path='/home' element={<Dashboard />} />

          <Route path="candidats" element={<Candidats />}/>

          <Route path="/candidats/nouveau" element={<CandidatForm />}/>  

          <Route path="recruteurs" element={<Recruteurs />}/>

          <Route path="/recruteur/nouveau" element={<RecruteurForm />}/>
          
          <Route path="offres" element={<Offres />}/>
          
          <Route path="/offre/nouveau" element={<OffreForm />}/>  
          
          <Route path="/offre/nouveau" element={<OffreForm />}/>

          <Route path="/offresCards" element={<OffresCards />}/> 

          <Route path="/entretienCon" element={<EntretiensContainer />}/> 


          <Route path="/entretiens" element={<Entretiens />}/>     

          <Route path="/entretiens/nouveau" element={<EntretienForm />}/>               

          <Route path="/notificationsList" element={<NotificationList />}/>

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
