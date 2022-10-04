export const state = () => ({
  user: false,
});

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, user) => {
    if (user) {
      state.user = user;
    } else {
      state.user = false;
    }
  },
};

export const getters = {
  isAuthenticated(state) {
    return !!state.user;
  },
};
