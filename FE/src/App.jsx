import { Routes, Route } from 'react-router-dom';
import Root from './Pages/Root';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Profil from './Pages/Profil';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/profil' element={<Profil />} />
      </Routes>
    </>
  )
}

export default App
