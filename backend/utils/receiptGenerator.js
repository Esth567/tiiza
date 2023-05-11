const receiptGenerator = (
  transaction_type,
  description,
  amount,
  tx_ref,
  status,
  date,
) => {
  return {
    transaction_type,
    description,
    amount,
    tx_ref,
    status,
    date,
  };
};

module.exports = {receiptGenerator};
