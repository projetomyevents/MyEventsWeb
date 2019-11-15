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
    eventGuests: 'event/:id/guests',
    eventGuestsEdit: 'event/:id/guests/edit',
    events: 'events',
  },
  guest: {
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
      eventGuests: `/${routesNames.event.eventGuests}`,
      eventGuestsEdit: `/${routesNames.event.eventGuestsEdit}`,
      events: `/${routesNames.event.events}`,
    },
    guest: {
    },
  },
};
