const emailProviders = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com'
];

/**
 * Oferece uma lista com sugestões do email com provedores adicionados.
 *
 * @param email - O email a ser completado.
 */
export function completeEmails(email: string): string[] {
  const emailProvider = email.split('@');
  return emailProvider.length === 1
    ? []
    : emailProviders.filter(provider => provider.toLowerCase().startsWith(emailProvider[1]))
      .map(provider => emailProvider[0].concat('@', provider));
}
