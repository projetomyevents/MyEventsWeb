const routesNames = {
  home: '',
  error404: '404',
  user: {
    signin: 'signin',
    signup: 'signup',
    passwordReset: 'request-password-reset'
  },
  event: {
    register: 'register-new-event',
    list: 'event-list'
  }
};

export const RoutesConfig = {
  routesNames,
  routes: {
    home: routesNames.home,
    error404: routesNames.error404
  }
};
