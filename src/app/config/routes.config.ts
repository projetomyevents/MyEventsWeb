const routesNames = {
  home: '',
  erro404: '404',
  usuario: {
    login: 'login',
    cadastro: 'cadastro',
    senha: 'recuperacaodesenha'
  },
  evento: {
    criacao: 'criacaodeevento'
  }
};

export const RoutesConfig = {
  routesNames,
  routes: {
    home: routesNames.home,
    erro404: routesNames.erro404
  }
};
