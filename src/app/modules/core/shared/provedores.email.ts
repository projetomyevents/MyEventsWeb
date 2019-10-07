const provedoresEmail = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com'
];

/**
 * Oferece um array com sugestões do email com provedores adicionados.
 *
 * @param email - O email a ser completado.
 */
export function completarEmails(email: string): string[] {
  const emailProvedor = email.split('@');

  return emailProvedor.length === 1
    ? []
    : provedoresEmail.filter(provedor => provedor.toLowerCase().startsWith(emailProvedor[1]))
      .map(provedor => emailProvedor[0].concat('@', provedor));
}
