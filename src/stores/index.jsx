import { createStore } from "redux";
import rootReducer from "../reducers";

const Stores = createStore(rootReducer);

export default Stores;