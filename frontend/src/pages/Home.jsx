import { signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth, googleProvider } from '../../utils/firebase';
import api from '../../utils/axios';
import {FcGoogle} from 'react-icons/fc'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Home() {
    const {userData} = useSelector(state=>state.user)
   
    const dispatch = useDispatch()

    const handleLogin = async (token) => {
  try {
    const {data} = await api.post("/api/auth/login",{token})
    dispatch(setUserData())
    
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
    <div className='h-screen flex bg-[#2a3f6d] text-white overflow-hidden'>

       {!userData && <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
        <div className='w-85 bg-[#09090B] border border-white/20 rounded-2xl p-7 flex flex-col gap-5 shadow-sm shadow-[#2563EB]'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-[17px] font-semibold text-slate-100 tracking-tight'>
                    Welcome to MultiMind
                </h2>
                <p className='text-[13px] text-slate-500'>Please login to continue using the app.</p>
            </div>

            <button className='w-full flex items-center justify-center gap-3 py-2.75 rounded-xl text-sm font-medium text-white bg-black border border-indigo-500/30 hover:border-[#2563EB] hover:from-indigo-400 hover:to-violet-600 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-150 cursor-pointer' onClick={googleLogin}>
                <FcGoogle size={15}/>
                Continue With Google
            </button>
        </div>
        </div>}

        
    </div>
  )
}

export default Home