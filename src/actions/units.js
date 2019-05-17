export function changeUnits({ units }) {
  return {
    type: "CHANGE_UNITS",
    units
  };
}

export function deleteUnits({ id }) {
  return {
    type: "DELETE_UNITS",
    id
  };
}

export function addUnits({ coursename, courseid, semester, aosname }) {
  return {
    type: "ADD_UNITS",
    coursename,
    courseid,
    semester,
    aosname
  };
}
