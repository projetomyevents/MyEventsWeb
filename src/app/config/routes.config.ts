const routesNames = {
  home: '',
  error404: '404',
  user: {
    signin: 'signin',
    signup: 'signup',
    activate: 'activate',
    resendActivation: 'resend-activation',
    passwordReset: 'password-reset',
    sendPasswordReset: 'send-password-reset',
  },
  event: {
    register: 'register-new-event',
    event: 'event/:id',
    events: 'events'
  },
  guest: {
    guests: 'event/:id/guests',
    guestsOrganize: 'event/:id/guests/organize'
  }
};

export const RoutesConfig: any = {
  routes: routesNames
};
