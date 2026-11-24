export const validateName = (name: string): boolean => name.trim().length >= 3;
export const validatePhone = (phone: string): boolean => /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/.test(phone.replace(/\s/g, ''));
export const validateDate = (date: string): boolean => {
  const selected = new Date(date);
  const now = new Date();
  return !isNaN(selected.getTime()) && selected >= now;
};