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
    register: 'event/register',
    event: eventById,
    events: 'event/all'
  },
  guest: {
    guestList
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

function eventById(id: number) {
  return `event/${id}`;
}

function guestList(eventId: number) {
  return `guest/list/${eventId}`;
}
