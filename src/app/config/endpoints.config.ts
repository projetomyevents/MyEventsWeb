export const EndpointsConfig: any = {
  user: {
    login: 'user/login',
    register: 'user/register',
    activate: (token: string) => `user/activate?token=${token}`,
    resendActivation: (email: string) => `user/resend-activation/${email}`,
    passwordReset: (token: string) => `user/password-reset?token=${token}`,
    sendPasswordReset: (email: string) => `user/send-password-reset/${email}`,
  },
  event: {
    postEvent: 'event/create',
    getEvent: (id: number) => `event/${id}`,
    getEvents: 'event/all',
    getEventGuests: (id: number) => `event/${id}/guests`,
    getEventGuestsToEdit: (id: number) => `event/${id}/guests/edit`,
  },
  guest: {
  },
  address: {
    getCities: 'address/cities',
    getStates: 'address/states',
  },
};
