export function hasActiveSubscription(user) {
  if (!user) return false;
  const t = user.planActiveUntil ? new Date(user.planActiveUntil) : null;
  return t && t > new Date();
}

export function getSubscriptionStatus(user) {
  if (!user) return { active: false, expires: null };
  return { active: hasActiveSubscription(user), expires: user?.planActiveUntil || null };
}
