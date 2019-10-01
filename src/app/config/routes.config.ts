const routesNames = {
  home: '',
  erro404: '404',
  usuario: {
    login: 'login',
    cadastro: 'cadastro',
    senha: 'recuperacaodesenha' // recuperação de senha
  }
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: routesNames.home,
    error404: routesNames.erro404
  }
};
