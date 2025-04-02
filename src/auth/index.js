//isLoggedIn =>

export const isLoggedIn = () => {
    let data = localStorage.getItem("loginToken");
    if(data == null){
        return false;
    }
    else{
        return true;
    }
}

//doLogin => set jwt at local storage
export const doLogin = (data,nextFn) =>{
    localStorage.setItem("loginToken", JSON.stringify(data));
    nextFn();

}

//Do Logout => remove jwt from local storage
export const doLogout = (nextFn) =>{
    
    localStorage.removeItem("loginToken");
    nextFn();
}
// get current user
export const getCurrentUser = () =>{
   try {
    if(isLoggedIn){
        // let data = localStorage.getItem("loginToken").user;
        let data = JSON.parse(localStorage.getItem("loginToken")).user;
        return data;
    }
    else{
        console.log("Error loading user from local storage.");
        
    }
   } catch (error) {
    console.log("Error loading curr user:",error);
    
   }
}

export const getToken = () =>{
    if(isLoggedIn){
        return JSON.parse(localStorage.getItem("loginToken")).token;
    }
    else{
        return null;
    }
}
