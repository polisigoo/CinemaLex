import Vue from 'vue';

const module = {
    state: {
        data: [],
        footer: [],
        actor_details: {},
        home_loading: false,
    },
    actions: {

        // Get all movies form api /api/v1/movies
        GET_HOME_LIST({ commit }) {
            commit('HOME_SPINER_LOAD');
            axios.get('/api/v1/get/home').then((response) => {
                if (response.status === 200) {
                    const list = response.data.data;
                    commit('SET_HOME_LIST', {list});
                    commit('HOME_SPINER_CLEAN');
                }
            });
        },

        // Get all movies form api /api/v1/movies
        GET_HOME_FOOTER_DETAILS({ commit }) {
            axios.get('/api/v1/get/app/details').then((response) => {
                if (response.status === 200) {
                    const data = response.data.data;
                    commit('SET_HOME_FOOTER_DETAILS', data);
                }
            });
        },

    },
    mutations: {

        SET_HOME_LIST(state, list) {
            state.data = list.list;
        },

        SET_HOME_FOOTER_DETAILS(state, data){
            state.footer = data;
        },

        // Spiner load
        HOME_SPINER_LOAD(state) {
            state.home_loading = true;
        },

        HOME_SPINER_CLEAN(state) {
            state.home_loading = false;
        }
    },
    getters: {}
};
export default module;