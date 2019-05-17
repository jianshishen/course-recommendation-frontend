const loaded = (
  state = {
    loaded: false
  },
  action
) => {
  switch (action.type) {
    case "CHANGE_LOADED":
      return {
        ...state,
        loaded: action.loaded
      };

    default:
      return state;
  }
};
export default loaded;
