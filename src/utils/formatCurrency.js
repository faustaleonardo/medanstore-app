export default number => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  })
    .format(number)
    .replace(/,00/, '');
};
