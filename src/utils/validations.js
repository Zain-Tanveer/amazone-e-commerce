export const USERNAME_RULES = [(v) => !!v || "Username is required"];
export const PASSWORD_RULES = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 6 || "Password must be greater than 6 characters",
];
