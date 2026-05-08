export const luhnCheck = (cardNumber) => {
  const num = cardNumber.replace(/\s+/g, '');
  if (!/^\d{13,19}$/.test(num)) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};
export const isFutureDate = (value) => {
  if (!value) return false;
  const match = value.match(/^(\d{2})\/(\d{4})$/);
  if (!match) return false;
  
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10);
  
  if (month < 1 || month > 12) return false;
  
  const now = new Date();
  const expiry = new Date(year, month - 1, 1);
  const current = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return expiry >= current;
};

export const formatCardNumber = (value) => {
  const raw = value.replace(/\D/g, '').slice(0, 16);
  return raw.replace(/(.{4})/g, '$1 ').trim();
};

export const maskCardNumber = (number) => {
  const raw = number.replace(/\s/g, '');
  const last4 = raw.slice(-4);
  return `•••• •••• •••• ${last4}`;
};