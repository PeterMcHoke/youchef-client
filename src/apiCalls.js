//const API_URL = 'https://gentle-tor-10264.herokuapp.com/api';
const API_URL = 'http://localhost:8000/api'

const tap = (label) => (x) => {
  console.log(label, x)
  return x;
}

function fetchAPI(path, method='GET', body=null, token=null) {
  const options = {
    headers: {
      'Content-type': 'application/json'
    },
    method
  };

  if (token)
    options.headers['Authorization'] = `Bearer ${token}`;

  if (body)
    options.body = JSON.stringify(body);

  return fetch(`${API_URL}${path}`, options);
}

function readResponse(r) {
    if (r.ok)
        return r.json()
    return r.json().then((body) => {
        throw Error(body.message)
        })
}

export function createAccount(data) {
    return fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(readResponse)
}
export function login(data) {
    return fetch(`${API_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-type': 'application/json',
        }
    }).then(readResponse)
}

export function fetchRecipes(ingredients, token) {
  return fetchAPI(`/recipes/search?ingredients=${ingredients.join(',')}`, 'GET', null, token)
    .then(readResponse)
}


export function updateEmail(email, token) {
    return fetchAPI(`/users/me`,'PATCH', { email }, token)
        .then(readResponse)
        .catch(console.log)
}

export function updatePassword(newPassword, oldPassword, token) {
    return Promise.resolve({
        message:'Updated succesfully'
    })
}

export function getSavedRecipes(token) {
  return fetchAPI('/users/me/recipes', 'GET', null , token)
    .then(readResponse)
}

export function saveRecipe(id, token) {
    return fetchAPI('/users/me/recipes', 'POST', { id }, token)
        .then(tap('response from saveRecipe'))
        .then(res => res.status)
}

export function deleteSavedRecipe(id, token) {
  console.log('DeleteSavedRecipe is being called')
  return fetchAPI('/users/me/recipes', 'DELETE', { id }, token)
    .then(tap('response from deleteSavedRecipe'))
    .then(res => res.status)
}
