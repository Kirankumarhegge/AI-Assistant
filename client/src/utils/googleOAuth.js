import axios from 'axios';

export async function onGoogleLoginSuccess (res, navigate) {
    const userProfile = await axios.get(`http://localhost:3001/auth/userProfile/${res.profileObj.email}`);
    if(userProfile.data && userProfile.data.isProfileComplete === true){
        navigate("/chatBot", { state: { data: {...userProfile.data, ...res.profileObj } } });
    }
    else if(userProfile.data && userProfile.data.isProfileComplete === false){
        navigate("/updateprofile", { state: { data: {...userProfile.data, ...res.profileObj } } });
    }
    else{
        const response = await axios.post("http://localhost:3001/auth/signup", {
            email : res.profileObj.email,
            password : "",
        });
        
        if (response.data) {
            navigate("/updateprofile", { state: { data: { ...res.profileObj, ...response.data } } });
        } else {
            navigate("/");
        }
    } 
};


export function  onGoogleLogoutSuccess (navigate) {
    navigate("/");
};


export function  onGoogleAuthFailure (res)  {
    console.log("Failed to Log In ", res);
};