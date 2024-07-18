import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
    const [inputs,setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })

    const {loading, signup} = useSignup();

    const handleCheckBoxChange = (gender) =>{
        setInputs({...inputs,gender});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
        
    };

    
    return(
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30'>
            <h1 className='text-3xl font-semibold text-center text-gray-300 '>
                SignUp
                <span className='text-yellow-500 mx-2'>ChatApp</span>
            </h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Fullname</span>
                    </label>
                    <input type="text" placeholder='Ahmad Kaif' className='w-full input input-bordered h-10'
                        value={inputs.fullname}
                        onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type="text" placeholder='ahmadkaif' className='w-full input input-bordered h-10'
                        value = {inputs.username}
                        onChange={(e) => setInputs({...inputs, username:e.target.value})}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="text" placeholder='Enter Password' className='w-full input input-bordered h-10'
                        value={inputs.password}
                        onChange={(e) => setInputs({...inputs, password:e.target.value})}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Confirm Password</span>
                    </label>
                    <input type="text" placeholder='********' className='w-full input input-bordered h-10'
                         value={inputs.confirmPassword}
                         onChange={(e) => setInputs({...inputs, confirmPassword:e.target.value})}
                    />
                </div>
                {/* Gender checkbox goes here */}
                <GenderCheckbox onCheckBoxChange = {handleCheckBoxChange} selectedGender={inputs.gender}/>

                <Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                    Already have an account?
                </Link>
                <div>
                    <button className='btn btn-neutral btn-block btn-sm mt-2' disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}    
                    </button>
                </div>

            </form>
            </div>
        </div>
    )
}
export default SignUp;