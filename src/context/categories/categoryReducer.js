export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_CATEGORIES':
      return { ...state, isLoading: false, categories: payload };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, payload] };
    case 'UPDATE_CATEGORY':
      const categories = state.categories.map(category => {
        if (category.id === payload.id) category[payload.id] = payload;
        return category;
      });

      return {
        ...state,
        categories
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== payload)
      };
    case 'CATEGORY_ERROR':
      return { ...state, error: payload };
    default:
      return state;
  }
};
