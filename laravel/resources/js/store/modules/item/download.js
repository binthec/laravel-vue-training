export default {
    namespaced: true,

    state: {
        list: {
            'current_page': 1,
            'per_page': 20,
            'order': 'desc',
            'order_column': 'updated_at',
            'last_page' : null,
            'total' : null,
        },

        list_url: '/api/items',
    },

    mutations: {
        setCurrentPage(state, payload) {
            state.list.current_page = payload.current_page;
        }
    },

    actions: {
        getList({commit, state, getters}) {
            axios.get(state.list_url, {
                params: {
                    page: state.list.current_page,
                    per_page: state.list.per_page,
                    order_column: state.list.order_column ?? 'updated_at',
                    order: state.list.order ?? 'desc',
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