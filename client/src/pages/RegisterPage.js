import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backImage from "../assets/option4.jpg";

function RegisterPage() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        phone: '',
        age: '',
        region: '',
        zone: '',
        woreda: '',
        kebele: '',
        password: ''
    });

    const navigate = useNavigate();

    function register(event) {
        event.preventDefault();
        console.log("Register data:", values);
        axios.post("http://localhost:5000/register", values)
            .then(res => {
                console.log("Registered successfully:", res.data);
                navigate("/home"); // Navigate to the home page after successful registration
            }).catch(err => console.error(err));
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-t from-gray-800 to-gray-350 pt-32 pb-32'
        style={{
            backgroundImage: `url(${backImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "120vh",
          }}>
            <div className='w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg'>
                <form className="space-y-6" onSubmit={register}>
                    <h1 className='text-2xl font-bold text-blue-600 text-center mb-4'>SignUp</h1>

                    <div className='space-y-4'>
                        <input type='text' placeholder='Full Name' className='w-full px-4 py-2 border border-gray-300 rounded-lg' 
                        onChange={e => setValues({ ...values, username: e.target.value })} />

                        <input type='email' placeholder='Email' className='w-full px-4 py-2 border border-gray-300 rounded-lg' 
                        onChange={e => setValues({ ...values, email: e.target.value })} />

                        <input type='text' placeholder='Phone Number' className='w-full px-4 py-2 border border-gray-300 rounded-lg' 
                        onChange={e => setValues({ ...values, phone: e.target.value })} />

                        <input type='number' placeholder='Age' className='w-full px-4 py-2 border border-gray-300 rounded-lg' 
                        onChange={e => setValues({ ...values, age: e.target.value })} />

                        <input type='text' placeholder='Region' className='w-full px-4 py-2 border border-gray-300 rounded-lg' 
                        onChange={e => setValues({ ...values, region: e.target.value })} />

                        <input type='text' placeholder='Zone' className='w-full px-4 py-2 border border-gray-300 rounded-lg' 
                        onChange={e => setValues({ ...values, zone: e.target.value })} />

                        <input type='text' placeholder='Woreda' className='w-full px-4 py-2 border border-gray-300 rounded-lg' 
                        onChange={e => setValues({ ...values, woreda: e.target.value })} />

                        <input type='text' placeholder='Kebele' className='w-full px-4 py-2 border border-gray-300 rounded-lg' 
                        onChange={e => setValues({ ...values, kebele: e.target.value })} />

                        <input type='password' placeholder='Password' className='w-full px-4 py-2 border border-gray-300 rounded-lg' 
                        onChange={e => setValues({ ...values, password: e.target.value })} />
                    </div>

                    <button 
    type='submit' 
    className='mx-20 w-1/2 px-2 py-2 bg-blue-600 text-white rounded-lg 
              hover:bg-pink-700 hover:scale-125 transition duration-200 ease-in-out 
              active:bg-white-100 active:text-blue-800 active:scale-95'>
    Register
</button>

                </form>

                <div className='text-center mt-4'>
                    <p>Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
