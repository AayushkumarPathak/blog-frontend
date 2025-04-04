import { myAxios } from "./APP_Constants";

// BASE_URL is defined in APP_Constants.js
// Ex - http://localhost:9090/api/v1/**
 
export const signup = async(user)=>{
    return myAxios
    .post("/auth/register",user)
    .then((response)=>response.data);
}
// BASE_URL is defined in APP_Constants.js
export const login = async(loginData)=>{
    
    return myAxios
    .post("/auth/login",loginData)
    .then((response)=>response.data);
}