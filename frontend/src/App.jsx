// import { signInWithPopup } from 'firebase/auth'
// Upar setPersistence aur browserSessionPersistence import karna zaroori hai
import { signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';
import api from '../utils/axios';

function App() {

const handleLogin = async (token) => {
  try {
    const {data} = await api.post("/auth/login",{token})
    console.log(data);
    
  } catch (error) {
    console.log(error);
    
  }
}

  const googleLogin = async () => {
    try {
      // 1. Set persistence to session storage BEFORE popup
      await setPersistence(auth, browserSessionPersistence);
      
      // 2. Now call the popup
      const data = await signInWithPopup(auth, googleProvider);
      const token =await data.user.getIdToken()
      console.log(token)
      await handleLogin(token)
      console.log("Success:", data);
    } catch (err) {
      console.log("Firebase Error:", err);
    }
  }


  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <button 
      onClick={googleLogin}
      className='w-5xl h-24 bg-amber-400'>
        Continue with Google
      </button>
    </div>
  )
}

export default App