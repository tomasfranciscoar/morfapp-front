import axios from "axios";

const isProduction = process.env.NODE_ENV === 'production'
const base_url = isProduction
  ? 'https://morfapp.herokuapp.com'
  : 'http://localhost:5000'

const logoutRedirect = isProduction ? 'https://morfapp.herokuapp.com' : 'http://localhost:3000'

export const signup = auth => {
    return axios.post(`${base_url}/signup`, auth)
    .then(res => res.data)
    .catch(error => {
      throw error.response.data
    })
  }

export const login = auth => {
    return axios.post(`${base_url}/login`, auth)
    .then(res => res.data)
    .catch(error => {
      throw error.response.data
    })
  }

export const logout = () => {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("USER");
  window.location.reload();
  window.location.href = logoutRedirect;
};