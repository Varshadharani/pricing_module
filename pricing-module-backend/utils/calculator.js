module.exports = (data, config) => {
  const { distance, timeMinutes, waitingTime } = data;
  const baseDistance = config.baseDistance;
  const dbp = config.distanceBasePrice;
  const dap = config.distanceAdditionalPrice;

  const additionalDistance = distance > baseDistance ? distance - baseDistance : 0;

  // TMF logic
  let tmf = 1;
  for (const tm of config.timeMultipliers) {
    if (timeMinutes > tm.durationLimit) {
      tmf = tm.multiplier;
    } else {
      break;
    }
  }

  // Waiting Charges
  const extraWaiting = waitingTime > config.freeWaitingTime
    ? waitingTime - config.freeWaitingTime
    : 0;
  const wc = extraWaiting * config.waitingChargePerMinute;

  const total = (dbp + (additionalDistance * dap)) + (timeMinutes * tmf) + wc;

  return {
    base: dbp,
    additionalDistance,
    dap,
    tmf,
    wc,
    total: total.toFixed(2)
  };
};
