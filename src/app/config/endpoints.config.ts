export const EndpointsConfig: any = {
  user: {
    login: 'user/login',
    register: 'user/register',
    getByEmail: getUserByEmail,
    getConfirm: getUserConfirm,
    getResendConfirmation: getUserResendConfirmation,
    getPasswordReset: getUserPasswordReset,
    getSendPasswordReset: getUserSendPasswordReset
  },
  event: {
    register: 'event/register',
    getEvent: getEventById
  },
  address: {
    getAllCities: 'address/cities',
    getAllStates: 'address/states'
  }
};

function getUserByEmail(email: string) {
  return `user/${email}`;
}

function getUserConfirm(token: string) {
  return `user/confirm?token=${token}`;
}

function getUserResendConfirmation(email: string) {
  return `user/resend-confirmation/${email}`;
}

function getUserPasswordReset(token: string) {
  return `user/password-reset?token=${token}`;
}

function getUserSendPasswordReset(email: string) {
  return `user/send-password-reset/${email}`;
}

function getEventById(id: number) {
  return `event/${id}`;
}
