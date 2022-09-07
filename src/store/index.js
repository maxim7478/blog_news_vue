import {createStore} from "vuex";
import postModule from './modules/postModule';

export default createStore({
  modules: {
    post: postModule
  }
})