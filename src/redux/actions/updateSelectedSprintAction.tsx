export const UPDATE_SELECTED_SPRINT = 'UPDATE_SELECTED_SPRINT';

export const updateSelectedSprint = (sprintId: number) => ({
  type: UPDATE_SELECTED_SPRINT,
  sprintId
});
