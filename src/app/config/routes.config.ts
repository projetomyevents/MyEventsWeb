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
    create: 'create-event',
    event: 'event/:id',
    events: 'events',
  },
  guest: {
    guests: 'event/:id/guests',
    guestsEdit: 'event/:id/guests/edit',
  },
};

export const RoutesConfig: any = {
  routes: routesNames,
};
