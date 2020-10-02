const sprintReducer = (state = [], action: any) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, tasks: action.tasks };
    default:
      return state;
  }
};

export default sprintReducer;
