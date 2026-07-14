export const validateLogin = (data: {
  email: string;
  password: string;
}) => {
  if (!data.email) {
    throw new Error("Email is required");
  }

  if (!data.password) {
    throw new Error("Password is required");
  }
};
