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
    case "DELETE_UNITS":
      let remainedunits = state.units.filter(
        info => info.courseid !== action.id
      );
      return {
        ...state,
        units: remainedunits
      };
    case "ADD_UNITS":
      let newunits = state.units;
      newunits.push({
        coursename: action.coursename,
        courseid: action.courseid,
        semester: action.semester,
        aosname: action.aosname
      });
      return {
        ...state,
        units: newunits
      };
    default:
      return state;
  }
};
export default units;
