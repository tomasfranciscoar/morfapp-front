import axios from "axios";

const base_url = "https://api.edamam.com/search?";
const app_id = "97cb8be0";
const app_key = "3999bfc1be3cf4b776b07f2db54fd15b";

export const searchRecipe = ingredient => {
  return axios
    .get(`${base_url}q=${ingredient}&app_id=${app_id}&app_key=${app_key}`)
    .then(res => console.log(res.data.hits))
    .catch(err => console.log(err));
};
