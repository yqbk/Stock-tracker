import handleErrors from "../helpers/apiErrorHandler";

// Sunscrapers encoded in Base64
const API_KEY = "U3Vuc2NyYXBlcnM=";

export function fetchAlphavantage(company) {
  return dispatch => {
    // we replace any address with path to file
    const URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=${API_KEY}`;
    const URL2 = symbol =>
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    const URL3 = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`;

    dispatch(getCompanyInfo(URL));

    // Get basic information using QUERY endpoint
    return fetch(URL)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        // Get extended information using Quote endpoint
        return fetch(URL2(data.bestMatches[0]["1. symbol"]))
          .then(handleErrors)
          .then(response => response.json())
          .then(dataExtended => {
            return fetch(URL3)
              .then(handleErrors)
              .then(response => response.json())
              .then(dataExtendedImage => {
                console.log("?? ", dataExtendedImage);
                return dispatch(
                  getCompanyInfoSuccess({
                    ...data.bestMatches[0],
                    ...dataExtended["Global Quote"],
                    ...dataExtendedImage.filter( match => {
                      

                      console.log('test', match.name, data.bestMatches[0]["2. name"].split(' ')[0], match.name === data.bestMatches[0]["2. name"].split(' ')[0])
                      return match.name.toUpperCase() === data.bestMatches[0]["2. name"].split(' ')[0].toUpperCase() 
                    })[0]
                      
                  })
                );
              });
          });
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

export const getCompanyInfoSuccess = response => {
  // console.log(response);
  // const bestMatch = response.bestMatches[0];
  return {
    type: "GET_COMPANY_INFO_SUCCESS",
    payload: response
  };
};

export const getCompanyInfoFailure = error => ({
  type: "GET_COMPANY_INFO_FAILURE",
  payload: { error }
});
