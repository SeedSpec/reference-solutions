const protectedFinalStates = new Set(["final", "canceled"]);

export function mergeGameUpdate(current, incoming, sourceCorrection = false) {
  if (
    protectedFinalStates.has(current.status) &&
    !protectedFinalStates.has(incoming.status) &&
    !sourceCorrection
  ) {
    return current;
  }

  return {
    ...current,
    ...incoming,
    correction: sourceCorrection
      ? "Source correction applied and labeled"
      : current.correction,
  };
}
