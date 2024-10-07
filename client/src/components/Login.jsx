import { GoogleLogin } from "react-google-login";
import React, { useState, useEffect } from "react";
import { onGoogleLoginSuccess, onGoogleAuthFailure } from "../utils/googleOAuth";
import { googleClientId } from "../utils/util";
import { useNavigate  } from "react-router-dom";
import axios from 'axios';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [ showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    

    const handleSignIn = async() => {
        try{
            const response = await axios.post("http://localhost:3001/auth/signIn", {email, password});

            if (!response.data.message) {
                setError("")
                if(response.data.isProfileComplete === true){
                    navigate("/chatBot", { state: { data: response.data } });
                }else{
                    navigate("/updateprofile", { state: { data: response.data } });
                }
            }
            else{
                setError(response.data.message)
            }
        }
        catch(err){
            setError("Email Id or Passward is wrong!!")
        }
    }

    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-4">
                <div className="flex min-h-full flex-1 flex-col justify-center px-1 py-12 lg:px-1">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Log In your account
                        </h2>
                    </div>

                    <div className="flex justify-center mt-10 w-100">
                    <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }} className="space-y-6">
                            <div className="w-80">
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        placeholder="Email address"
                                        type="text"
                                        required
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                                <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                placeholder="Enter your password"
                                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800`}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                            <div className="flex justify-center">
                                <button
                                    type='submit'
                                    className="flex justify-center w-full rounded-sm px-3 py-2.5 bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Log In
                                </button>
                            </div>
                            {error !== "" && <p className="text-sm text-red-500">{error}</p>}
                            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                                Or
                            </div>
                            <div className="flex justify-center">
                                <GoogleLogin
                                    clientId={googleClientId}
                                    buttonText="Login with Google"
                                    onSuccess={(res) => onGoogleLoginSuccess(res, navigate)}
                                    onFailure={(res => onGoogleAuthFailure(res, setError))}
                                    cookiePolicy={"single_host_origin"}
                                    isSignedIn={true}
                                    className="flex justify-center w-full rounded-sm px-1 py-1 text-black"
                                />
                            </div>
                        </form>
                    </div>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account?
                        <a href="/signup" className="text-indigo-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
