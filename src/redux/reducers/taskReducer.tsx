const taskReducer = (state = [], action: any) => {
  switch (action.type) {
    case 'POST_COMMENT_SUCCESS':
      return { ...state, tasks: action.tasks };
    default:
      return state;
  }
};

export default taskReducer;
