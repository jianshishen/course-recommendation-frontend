const units = (
  state = {
    units: []
  },
  action
) => {
  switch (action.type) {
    case "CHANGE_UNITS":
      return {
        ...state,
        units: action.units
      };
    default:
      return state;
  }
};
export default units;
