import { combineReducers } from "redux";
import shellModule from '../modules/shell/reducers';
import marketModule from '../modules/market/reducers';

const rootReducer = combineReducers({
    shellModule,
    marketModule,
});

export default rootReducer;