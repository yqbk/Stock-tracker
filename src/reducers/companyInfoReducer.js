import {
  GET_COMPANY_INFO,
  GET_COMPANY_INFO_SUCCESS,
  GET_COMPANY_INFO_FAILURE
} from "../actions/getCompanyInfoActions";

const initialState = {
  searchValue: "",
  companies: [],
  loading: false,
  error: null
};

export default function companyInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_INFO: {
      return {
        ...state,
        searchValue: action.payload.searchValue,
        loading: true
      };
    }

    case GET_COMPANY_INFO_SUCCESS: {
      const companyData = action.payload;
      const fetchedCompany = {
        name: companyData["2. name"],
        region: companyData["4. region"],
        symbol: companyData["1. symbol"],
        time: `${companyData["5. marketOpen"]} - ${
          companyData["6. marketClose"]
        } ${companyData["7. timezone"]}`,
        // Rounding values to 2 digits after comma
        price: Math.round(companyData["05. price"] * 100) / 100,
        currency: companyData["8. currency"],
        change: `${Math.round(companyData["09. change"] * 100) /
          100} (${Math.round(
          companyData["10. change percent"].slice(0, -1) * 100
        ) / 100}%)`,
        closed: `Closed: ${companyData["07. latest trading day"]}`,
        domain: companyData.domain,
        logo: companyData.logo
      };

      return {
        ...state,
        loading: false,
        // Check if there is no duplicates
        companies: state.companies
          .map(company => company.symbol)
          .includes(fetchedCompany.symbol)
          ? state.companies
          : [...state.companies, fetchedCompany]
      };
    }

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
