export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-=+\\|[\]{};:'",.<>?]).{8,24}$/;

export const phoneNumberRegex = /^010\d{8}$/;

export const idRegex = /^[a-zA-Z0-9_-]{8,32}$/;
