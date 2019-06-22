import axios from "axios";

const api_url = "https://api.edamam.com/search?";
const app_id = "97cb8be0";
const app_key = "3999bfc1be3cf4b776b07f2db54fd15b";

const isProduction = process.env.NODE_ENV === 'production'
const local_url = isProduction
  ? 'https://morfapp.herokuapp.com/recipe'
  : 'http://localhost:5000/recipe'

export const searchRecipe = ingredient => {
  return axios
    .get(`${api_url}q=${ingredient}&app_id=${app_id}&app_key=${app_key}`)
    .then(res => res.data.hits)
    .catch(error => console.log(error));
};

export const uploadRecipe = recipe => {
  return axios
    .post(`${local_url}/new`, recipe, {
      headers: {
        Authorization: localStorage.getItem("TOKEN"),
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => res.data.recipe)
    .catch(error => console.log(error));
};

export const getRecipes = () => {
  return axios
    .get(`${local_url}`, {
      headers: {
        Authorization: localStorage.getItem("TOKEN")
      }
    })
    .then(res => res.data.recipe)
    .catch(error => console.log(error));
};

export const getCustomRecipe = id => {
  return axios
    .get(`${local_url}/${id}`, {
      headers: {
        Authorization: localStorage.getItem("TOKEN")
      }
    })
    .then(res => res.data.recipe)
    .catch(error => console.log(error));
};

export const updateCustomRecipe = recipe => {
  return axios
    .patch(`${local_url}/${recipe._id}`, recipe, {
      headers: {
        Authorization: localStorage.getItem("TOKEN")
      }
    })
    .then(res => res.data.recipe)
    .catch(error => console.log(error));
};

export const deleteCustomRecipe = id => {
  return axios
    .delete(`${local_url}/${id}`, {
      headers: {
        Authorization: localStorage.getItem("TOKEN")
      }
    })
    .then(res => res.data.recipe)
    .catch(error => console.log(error));
}
