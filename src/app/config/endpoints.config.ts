export const EndpointsConfig: any = {
  user: {
    login: 'user/login',
    register: 'user/register',
    activate: activateUser,
    resendActivation: resendUserActivation,
    passwordReset,
    sendPasswordReset
  },
  event: {
    create: 'event/create',
    event,
    events: 'event/all'
  },
  guest: {
    guests,
    guestsEdit
  },
  address: {
    cities: 'address/cities',
    states: 'address/states'
  }
};

function activateUser(token: string) {
  return `user/activate?token=${token}`;
}

function resendUserActivation(email: string) {
  return `user/resend-activation/${email}`;
}

function passwordReset(token: string) {
  return `user/password-reset?token=${token}`;
}

function sendPasswordReset(email: string) {
  return `user/send-password-reset/${email}`;
}

function event(id: number) {
  return `event/${id}`;
}

function guests(id: number) {
  return `event/${id}/guests`;
}

function guestsEdit(id: number) {
  return `event/${id}/guests/edit`;
}
