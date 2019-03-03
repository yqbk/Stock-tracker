import { fetchAPI } from "../helpers/fetchAPI";

// Sunscrapers encoded in Base64
const API_KEY = "U3Vuc2NyYXBlcnM=";

export function fetchCompanyInfo(company) {
  return dispatch => {
    const SYMBOL_SEARCH_API = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=${API_KEY}`;
    const QUOTE_API = symbol =>
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    const AUTOCOMPLETE_API = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`;

    dispatch(getCompanyInfo(company));

    // Get basic information using SEARCH API
    return fetchAPI(SYMBOL_SEARCH_API)
      .then(data => {
        const bestMatch = data.bestMatches[0];
        // Get extended information using Quote API
        return fetchAPI(QUOTE_API(bestMatch["1. symbol"])).then(
          dataExtended => {
            // Get image and url using Autocomplete API
            return fetchAPI(AUTOCOMPLETE_API).then(autocompleteData => {
              return dispatch(
                getCompanyInfoSuccess({
                  ...bestMatch,
                  ...dataExtended["Global Quote"],
                  // Try to mach company name in autocomplete response to get company logo and url
                  ...autocompleteData.filter(autocompleteMatch => {
                    return (
                      // Check if first uppercase name in both responses are matching
                      autocompleteMatch.name.toUpperCase() ===
                      bestMatch["2. name"].split(" ")[0].toUpperCase()
                    );
                  })[0]
                })
              );
            });
          }
        );
      })
      .catch(error => dispatch(getCompanyInfoFailure(error)));
  };
}

export const GET_COMPANY_INFO = "GET_COMPANY_INFO";
export const GET_COMPANY_INFO_SUCCESS = "GET_COMPANY_INFO_SUCCESS";
export const GET_COMPANY_INFO_FAILURE = "GET_COMPANY_INFO_FAILURE";

export const getCompanyInfo = searchValue => ({
  type: "GET_COMPANY_INFO",
  payload: { searchValue }
});

export const getCompanyInfoSuccess = response => ({
  type: "GET_COMPANY_INFO_SUCCESS",
  payload: response
});

export const getCompanyInfoFailure = error => ({
  type: "GET_COMPANY_INFO_FAILURE",
  payload: { error }
});
