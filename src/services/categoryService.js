import { myAxios } from "./APP_Constants";

// BASE_URL is defined in APP_Constants.js
// Ex - http:{BASE_URL}/categories
export const loadAllCategories = async () => {
    return myAxios.get("/categories/").then((response)=>response.data);
}











