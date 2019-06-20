import axios from "axios";

const api_url = "https://api.edamam.com/search?";
const local_url = "http://localhost:5000/recipe";
const app_id = "97cb8be0";
const app_key = "3999bfc1be3cf4b776b07f2db54fd15b";

export const searchRecipe = ingredient => {
  return axios
    .get(`${api_url}q=${ingredient}&app_id=${app_id}&app_key=${app_key}`)
    .then(res => res.data.hits)
    .catch(err => console.log(err));
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
    .catch(error => error);
};

export const getRecipes = () => {
  return axios
    .get(`${local_url}`, {
      headers: {
        Authorization: localStorage.getItem("TOKEN")
      }
    })
    .then(res => res.data.recipe)
    .catch(err => console.log(err));
};

export const getCustomRecipe = id => {
  return axios
    .get(`${local_url}/${id}`, {
      headers: {
        Authorization: localStorage.getItem("TOKEN")
      }
    })
    .then(res => res.data.recipe)
    .catch(error => error);
};

export const updateCustomRecipe = recipe => {
  return axios
    .patch(`${local_url}/${recipe._id}`, recipe, {
      headers: {
        Authorization: localStorage.getItem("TOKEN")
      }
    })
    .then(res => res.data.recipe)
    .catch(error => error);
};

export const deleteCustomRecipe = id => {
  return axios
    .delete(`${local_url}/${id}`, {
      headers: {
        Authorization: localStorage.getItem("TOKEN")
      }
    })
    .then(res => res.data.recipe)
    .catch(error => error);
}
