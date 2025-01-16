import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const  [loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext()

    const signup = async ({fullName,username,password,confirmPassword, gender}) =>{
        const success = handleInputErrors({fullName,username,password,confirmPassword, gender});
        if(!success){
            return;
        }
        try {
            const res = await fetch("/api/auth/signup", {
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({fullName,username,password,confirmPassword, gender})
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            // localstorage - to make sure if the user is logged in or not
            localStorage.setItem("chat-user", JSON.stringify(data));
            // context
            setAuthUser(data); //from useAuthContext

        } catch (error) {
            toast.error(`Error in useSignup`,error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading, signup};
};

export default useSignup;

function handleInputErrors({fullName,username,password,confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill in all the fields');
        return false;
    }

    if(password !== confirmPassword){
        toast.error('Passwords do not match');
        return false;
    }

    if(password.length < 6){
        toast.error('Please must be atleast 6 characters');
        return false;
    }

    return true;
}