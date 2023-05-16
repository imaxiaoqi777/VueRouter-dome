import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            currentUser: null
        }
    },
    mutations: {
        setCurrentUser(state, user) {
            state.currentUser = user;
        }
    }
});

export default store;
