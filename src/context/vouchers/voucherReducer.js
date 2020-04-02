export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_VOUCHERS':
      return { ...state, isLoading: false, vouchers: payload };
    case 'ADD_VOUCHER':
      return { ...state, vouchers: [...state.vouchers, payload] };
    case 'UPDATE_VOUCHER':
      const vouchers = state.vouchers.map(voucher => {
        if (voucher.id === payload.id) voucher[payload.id] = payload;
        return voucher;
      });

      return {
        ...state,
        vouchers
      };
    case 'DELETE_VOUCHER':
      return {
        ...state,
        vouchers: state.vouchers.filter(voucher => voucher.id !== payload)
      };
    case 'VOUCHER_ERROR':
      return { ...state, error: payload };
    default:
      return state;
  }
};
