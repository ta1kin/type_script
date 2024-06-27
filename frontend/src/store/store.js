import { createStore } from 'vuex';
import UserInfo from './modules/UserInfo.js';


const store = createStore({
    modules: { UserInfo }
});

export default store;