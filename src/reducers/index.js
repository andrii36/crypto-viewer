import { combineReducers } from "redux";
import shellModule from '../modules/shell/reducers';

const rootReducer = combineReducers({
    shellModule,
});

export default rootReducer;