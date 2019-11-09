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
  }
};

export const RoutesConfig: any = {
  routes: routesNames
};
