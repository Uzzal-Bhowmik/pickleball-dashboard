export const getBackendBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BACKEND_BASEURL;
};
export const getSocketUrl = () => {
  return process.env.NEXT_PUBLIC_SOCKET_URL;
};

export const getNodeEnv = () => {
  return process.env.NEXT_PUBLIC_NODE_ENV;
};

export const getAdminLoginInfo = () => {
  return {
    email: process.env.NEXT_PUBLIC_ADMIN_LOGIN_EMAIL,
    password: process.env.NEXT_PUBLIC_ADMIN_LOGIN_PASSWORD,
  };
};
