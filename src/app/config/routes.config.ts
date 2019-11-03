const routesNames = {
  home: '',
  error404: '404',
  user: {
    signin: 'signin',
    signup: 'signup',
    confirm: 'confirm',
    resendConfirmation: 'resend-confirmation',
    passwordReset: 'password-reset',
    sendPasswordReset: 'send-password-reset',
  },
  event: {
    register: 'register-new-event',
    list: 'event-list'
  }
};

export const RoutesConfig: any = {
  routes: routesNames
};
