import handleErrors from "./apiErrorHandler";

export const fetchAPI = API =>
  fetch(API)
    .then(handleErrors)
    .then(response => response.json());
