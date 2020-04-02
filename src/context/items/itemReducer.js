export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ITEMS':
      return { ...state, items: payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, payload] };
    case 'UPDATE_ITEM':
      const items = state.items.map(item => {
        if (item.id === payload.id) item[payload.id] = payload;
        return item;
      });

      return {
        ...state,
        items
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== payload)
      };
    case 'ITEM_ERROR':
      return { ...state, error: payload };
    default:
      return state;
  }
};
