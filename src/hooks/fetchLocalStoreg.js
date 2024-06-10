export const fetchCartItems = () => {
  const cartItems =
    localStorage.getItem("cart") !== undefined
      ? JSON.parse(localStorage.getItem("cart"))
      : localStorage.removeItem("cart");
  return cartItems ? cartItems : [];
};
export const fetchOrderItems = () => {
  const cartItems =
    localStorage.getItem("order") !== undefined
      ? JSON.parse(localStorage.getItem("order"))
      : localStorage.removeItem("order");
  return cartItems ? cartItems : [];
};
export const fetchTran = () => {
  const tranSt =
    localStorage.getItem("tran") !== undefined
      ? JSON.parse(localStorage.getItem("tran"))
      : localStorage.removeItem("tran");
  return tranSt ? tranSt : "fr";
};
