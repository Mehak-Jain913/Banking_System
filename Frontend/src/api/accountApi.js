const BASE_URL = "http://localhost:8080/api/accounts";

export const getAllAccounts = async () => {
  const res = await fetch(`${BASE_URL}/all`);
  if (!res.ok) throw new Error('Failed to fetch accounts');
  return res.json();
};

export const getAccount = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch account');
  return res.json();
};

export const createAccount = async (data) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create account');
  return res.json();
};

export const transferMoney = async (from, to, amount) => {
  const res = await fetch(
    `${BASE_URL}/${from}/transfer/${to}?amount=${amount}`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error('Transfer failed');
  return res.json();
};

export const depositAmount = async (id, amount) => {
  const res = await fetch(`${BASE_URL}/${id}/deposit?amount=${amount}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error('Deposit failed');
  return res.json();
};

export const withdrawAmount = async (id, amount) => {
  const res = await fetch(`${BASE_URL}/${id}/withdraw?amount=${amount}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error('Withdrawal failed');
  return res.json();
};