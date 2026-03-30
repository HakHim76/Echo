import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

function SignUpPage() {
const [ formData, setFormData] =useState({
  fullName:"",email:"",password:""
})

const {signup, isSigningUp} = useAuthStore()

const handleSubmit = (e)=>{}

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
    <div className="relative w-full max-w-6x md:h-[800px] h-[650px] ">

    </div>
    </div>
  )
}

export default SignUpPage
