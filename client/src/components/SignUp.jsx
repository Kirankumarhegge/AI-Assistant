import { GoogleLogin } from "react-google-login";
import React, { useState, useEffect } from "react";
import { onGoogleLoginSuccess, onGoogleAuthFailure } from "../utils/googleOAuth";
import { useNavigate } from "react-router-dom";
import { checkPasswordStrength, googleClientId }  from "../utils/util.js";
import axios from "axios";


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordStrengthError, setPasswordStrengthError] = useState(false);
    const navigate = useNavigate();

    const checkEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            setError("Invalid email format.");
            return;
        }
        else{
            setEmailError(false);
            return
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError(true);
            setError("Passwords do not match.");
            return;
        }
        else{
            setPasswordError(false);
        }

        if (passwordStrengthError) {
            setError("Please set a strong password!");
            return;
        }

        if (emailError) {
            setError("Please choose a different email.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/auth/signUp", {
                email,
                password,
            });

            if (response.data) {
                navigate("/updateprofile", { state: { data: response.data } });
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                    Create Your Account
                </h2>
                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={checkEmail}
                            placeholder="Enter your email"
                            className={`mt-1 block w-full px-3 py-2 border rounded-md text-gray-800 ${emailError ? "border-red-500" : "border-gray-300"}`}
                        />
                        {emailError && (
                            <span className="text-red-500 text-sm">
                                {error}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                onBlur={() => checkPasswordStrength(password, setPasswordStrengthError, setError)}
                                placeholder="Enter your password"
                                className={`mt-1 block w-full px-3 py-2 border ${passwordStrengthError ? "border-red-500" : "border-gray-300"} rounded-md text-gray-800`}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {passwordStrengthError && (
                            <span className="text-red-500 text-sm">{error}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }}
                                placeholder="Confirm password"
                                className={`mt-1 block w-full px-3 py-2 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded-md text-gray-800`}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 text-gray-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {passwordError && (
                            <span className="text-red-500 text-sm">
                                Passwords do not match.
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                    >
                        Sign Up
                    </button>
                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                                Or
                            </div>
                            <div className="flex justify-center">
                                <GoogleLogin
                                    clientId={googleClientId}
                                    buttonText="Sign Up with Google"
                                    onSuccess={(res) => onGoogleLoginSuccess(res, navigate)}
                                    onFailure={(res => onGoogleAuthFailure(res, setError))}
                                    cookiePolicy={"single_host_origin"}
                                    isSignedIn={true}
                                    className="flex justify-center w-full rounded-sm px-1 py-1 text-black"
                                />
                            </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/user/login" className="text-blue-600 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
