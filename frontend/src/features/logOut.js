import api from "../../utils/axios"

export const logOut =async ()=>{
    try {
        const {data} = await api.get("/api/auth/logout")
    } catch (error) {
        console.log(error); 
    }
}