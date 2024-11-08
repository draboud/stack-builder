export const state = [];

export const removeOptsObject = function (activeId, firstCompFlag) {
  let indexed = state.indexOf(state.find((el) => el.id === activeId));

  if (indexed != -1) state.splice(indexed, 1);
};
