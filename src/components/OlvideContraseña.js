import api from "../app/api/api";
export const passwordRecoveryMail = async (email) => {
  try {
    const response = await api.post("/auth/passwordRecoveryMail", { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const verifyVerificationCode = async (
  email,
  verificationCode,
  newPassword
) => {
  try {
    const response = await api.post("/auth/verifyCode", {
      email,
      verificationCode,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
