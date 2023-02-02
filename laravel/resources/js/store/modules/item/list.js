export default {
    namespaced: true,

    state: {
        list: {
            data: {},
            current_page: 1,
            per_page: 20,
            from: null,
            last_page : null,
            to: null,
            total : null,
        },

        order_column: 'id',
        order_direction: 'asc',

        list_url: '/api/items',
    },

    mutations: {
        setCurrentPage(state, payload) {
            state.list.current_page = payload.current_page;
        },
        setListOrder(state, payload){
            state.order_direction = payload.value;
        },
        setListOrderColumn(state, payload){
            state.order_column = payload.value;
        },
    },

    actions: {
        getList({commit, state, getters}) {
            axios.get(state.list_url, {
                params: {
                    page: state.list.current_page,
                    per_page: state.list.per_page,
                    order_column: state.order_column,
                    order_direction: state.order_direction,
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        state.list = response.data.list;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    //
                });
        }
    }
}
