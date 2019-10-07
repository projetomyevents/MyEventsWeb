const provedoresEmail = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com'
];

export function completarEmails(email: string): string[] {
  const emailProvedor = email.split('@');

  return emailProvedor.length === 1
    ? []
    : provedoresEmail.filter(provedor => provedor.toLowerCase().startsWith(emailProvedor[1]))
      .map(provedor => emailProvedor[0].concat('@', provedor));
}
