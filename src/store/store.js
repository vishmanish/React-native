import { createStore } from "redux";
import appReducer from "./reducers";

const initialState = {
  authorization: "hYP5GBmgTU",
  breeds: [],
  filters: {
    sex: [],
    qty: [],
    breeds: [],
    minage: null,
    maxage: null,
    icbf: null,
    bbqa: null,
  },
};

const store = createStore(appReducer, initialState);

export default store;
