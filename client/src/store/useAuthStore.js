import {create} from "zustand"
import { axiosInstance } from "../components/lib/axios"
import { signup } from "../../../server/src/controllers/auth.controller";
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
   authUser: null,
   isCheckingAuth:true,
   isSigningUp : true,

 checkAuth : async () => {
      try {
    const res = await axiosInstance.get("/auth/check");
    set({ authUser: res.data})
     } catch (error) {
    console.log("Error in authCheck:", error)
    set({authUser: null}) 
} finally{
        set({isCheckingAuth: false})
      }
    
 },
}))
signup : async  () =>{
   set({isSigningUp : true})
try {
  const res = await axios.post("/auth/signup", data)
  set({authUser: res.data})

  toast.success("Account created succesfully")
  
} catch (error) {
  toast.error(error.response.data.message)
  console.log("Error in signup:",error)
}
finally{
  set({isSigningUp:false})
}
}

