import {
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILURE
} from "../actions/stockTrackerActions";

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
          ...new Set([...state.companies, {
            name: action.payload.bestMatch.name,
            domain: action.payload.bestMatch.domain,
            logo: action.payload.bestMatch.logo
          }])
        ]
      };
    }

    case GET_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
