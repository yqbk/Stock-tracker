export function fetchAPI(company) {
  return dispatch => {
    // we replace any address with path to file
    const URL =
      "https://autocomplete.clearbit.com/v1/companies/suggest?query=" + company;

    dispatch(getAPIRequest(URL));

    // Mock real address and get data from static files provided for the task
    return fetch(URL)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => dispatch(getAPIRequestSuccess(data)))
      .catch(error => dispatch(getAPIRequestFailure(error)));
  };
}

// Handle HTTP errors
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const GET_COMPANY = "GET_COMPANY";
export const GET_COMPANY_SUCCESS = "GET_COMPANY_SUCCESS";
export const GET_COMPANY_FAILURE = "GET_COMPANY_FAILURE";

export const getAPIRequest = searchValue => ({
  type: "GET_COMPANY",
  payload: { searchValue }
});

export const getAPIRequestSuccess = response => {
  console.log(response);
  const bestMatch = response[0];
  return {
    type: "GET_COMPANY_SUCCESS",
    payload: { bestMatch }
  };
};

export const getAPIRequestFailure = error => ({
  type: "GET_COMPANY_FAILURE",
  payload: { error }
});
