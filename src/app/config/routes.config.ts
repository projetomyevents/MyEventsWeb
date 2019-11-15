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
  routesNames,
  routes: {
    home: `/${routesNames.home}`,
    error404: `/${routesNames.error404}`,
    user: {
      signin: `/${routesNames.user.signin}`,
      signup: `/${routesNames.user.signup}`,
      activate: `/${routesNames.user.activate}`,
      resendActivation: `/${routesNames.user.resendActivation}`,
      passwordReset: `/${routesNames.user.passwordReset}`,
      sendPasswordReset: `/${routesNames.user.sendPasswordReset}`,
    },
    event: {
      create: `/${routesNames.event.create}`,
      event: `/${routesNames.event.event}`,
      events: `/${routesNames.event.events}`,
    },
    guest: {
      guests: `/${routesNames.guest.guests}`,
      guestsEdit: `/${routesNames.guest.guestsEdit}`,
    },
  },
};
