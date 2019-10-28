export const EndpointsConfig: any = {
  user: {
    login: 'user/login',
    register: 'user/register',
    getByEmail: getUserByEmail
  }
};

function getUserByEmail(email: string) {
  return `user/${email}`;
}
