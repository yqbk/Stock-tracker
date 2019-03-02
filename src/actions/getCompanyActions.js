import handleErrors from "../helpers/apiErrorHandler";

export function fetchAPI(company) {
  return dispatch => {
    // we replace any address with path to file
    const URL =
      "https://autocomplete.clearbit.com/v1/companies/suggest?query=" + company;

    dispatch(getCompany(URL));

    return fetch(URL)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => dispatch(getCompanySuccess(data)))
      .catch(error => dispatch(getCompanyFailure(error)));
  };
}

export const GET_COMPANY = "GET_COMPANY";
export const GET_COMPANY_SUCCESS = "GET_COMPANY_SUCCESS";
export const GET_COMPANY_FAILURE = "GET_COMPANY_FAILURE";

export const getCompany = searchValue => ({
  type: "GET_COMPANY",
  payload: { searchValue }
});

export const getCompanySuccess = response => {
  console.log(response);
  const bestMatch = response[0];
  return {
    type: "GET_COMPANY_SUCCESS",
    payload: { bestMatch }
  };
};

export const getCompanyFailure = error => ({
  type: "GET_COMPANY_FAILURE",
  payload: { error }
});
