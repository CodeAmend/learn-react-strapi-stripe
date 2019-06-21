const CART_ID = 'cart';


export const setCart = (value, cartKey = CART_ID) => {
  if(localStorage) {
    localStorage.setItem(cartKey, JSON.stringify(value));
  }
}

export const getCart = (cartKey = CART_ID) => {
  if(localStorage && localStorage.getItem(cartKey)) {
    return JSON.parse(localStorage.getItem(cartKey));
  }
}

