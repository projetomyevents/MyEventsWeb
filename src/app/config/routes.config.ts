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
    status: 'guest',
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
      event: (id: number) => routesNames.event.event.replace(':id', String(id)),
      eventGuests: (id: number) => routesNames.event.eventGuests.replace(':id', String(id)),
      eventGuestsEdit: (id: number) => routesNames.event.eventGuestsEdit.replace(':id', String(id)),
      events: `/${routesNames.event.events}`,
    },
    guest: {
      status: `/${routesNames.guest.status}`,
    },
  },
};
