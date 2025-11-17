export function hasActiveSubscription(user) {
  if (!user) return false;
  const t = user.planActiveUntil ? new Date(user.planActiveUntil) : null;
  return t && t > new Date();
}
export function getSubscriptionMessage(user) {
  if (!user) return 'Nenhum plano ativo';
  return hasActiveSubscription(user) ? `Plano ${user.plan} ativo até ${new Date(user.planActiveUntil).toLocaleDateString()}` : 'Sem plano ativo';
}
