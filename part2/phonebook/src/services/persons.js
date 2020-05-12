import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const all = () => {
  return axios.get(baseUrl).then(({
    data
  }) => data)
}
const add = item => {
  return axios.post(baseUrl, item).then(({
    data
  }) => data)
}
const del = (id, item) => {
  return axios.delete(`${baseUrl}/${id}`, item).then(({
    data
  }) => data)
}
const update = (id, item) => {
  return axios.put(`${baseUrl}/${id}`, item).then(({
    data
  }) => data)
}

export default {
  all,
  add,
  del,
  update,
}