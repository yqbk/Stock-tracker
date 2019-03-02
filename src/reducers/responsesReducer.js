import {
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILURE
} from "../actions/getCompanyActions";

import {
  GET_COMPANY_INFO,
  GET_COMPANY_INFO_SUCCESS,
  GET_COMPANY_INFO_FAILURE
} from "../actions/getCompanyInfoActions";

const initialState = {
  searchValue: "",
  companies: [
    // {
    //   name: "",
    //   domain: "",
    //   logo: ""
    // }
  ],
  loading: false,
  error: null
};

export default function responsesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY: {
      return {
        ...state,
        searchValue: action.payload.searchValue,
        loading: true
      };
    }

    case GET_COMPANY_SUCCESS: {
      console.log("Get company success", action);

      return {
        ...state,
        loading: false,
        companies: [
          ...new Set([
            ...state.companies,
            {
              name: action.payload.bestMatch.name,
              domain: action.payload.bestMatch.domain,
              logo: action.payload.bestMatch.logo
            }
          ])
        ]
      };
    }

    case GET_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case GET_COMPANY_INFO: {
      return {
        ...state,
        searchValue: action.payload.searchValue,
        loading: true
      };
    }

    case GET_COMPANY_INFO_SUCCESS: {
      console.log("Get company success", action);

      const companyData = action.payload;

      return {
        ...state,
        loading: false,
        companies: [
          ...new Set([
            ...state.companies,
            {
              name: companyData["2. name"],
              region: companyData["4. region"],
              symbol: companyData["1. symbol"],
              time: `${companyData["5. marketOpen"]} - ${
                companyData["6. marketClose"]
              } ${companyData["7. timezone"]}`,
              price: Math.round(companyData["05. price"] * 100) / 100,
              currency: companyData["8. currency"],
              change: `${Math.round(companyData["09. change"] * 100) /
                100} (${Math.round(
                companyData["10. change percent"].slice(0, -1) * 100
              ) / 100}%)`,
              closed: `Closed: ${companyData["07. latest trading day"]}`,
              domain: companyData.domain,
              logo: companyData.logo,
              //               01. symbol: "ABB"
              // 1. symbol: "ABB"
              // 02. open: "19.7100"
              // 2. name: "ABB Ltd"
              // 03. high: "19.7400"
              // 3. type: "Equity"
              // 04. low: "19.5200"
              // 4. region: "United States"
              // 05. price: "19.5700"
              // 5. marketOpen: "09:30"
              // 06. volume: "3474806"
              // 6. marketClose: "16:00"
              // 07. latest trading day: "2019-03-01"
              // 7. timezone: "UTC-05"
              // 08. previous close: "19.7100"
              // 8. currency: "USD"
              // 09. change: "-0.1400"
              // 9. matchScore: "1.0000"
              // 10. change percent: "-0.7103%"
            }
          ])
        ]
      };
    }

    // 5. marketOpen: "09:30"
    // 6. marketClose: "16:00"
    // 7. timezone: "UTC-05"
    // 8. currency: "USD"
    // 9. matchScore: "1.0000"

    case GET_COMPANY_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
