export const latestPrice = (dataPoints) => {
  if (dataPoints.length > 0) {
    return dataPoints[dataPoints.length - 1].value.toExponential(4);
  }
  return "---";
};

export const percentageDifference = (dataPoints) => {
  const lastIdx = dataPoints.length - 1;
  if (dataPoints.length > 1) {
    const difference = (
      ((dataPoints[lastIdx].value - dataPoints[lastIdx - 1].value) /
        dataPoints[lastIdx].value) *
      100
    ).toFixed(2);
    if (difference > 0) return `+ ${difference.toString()}`;
    else return `- ${(-1 * difference).toString()}`;
  }
  return "---";
};

export const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
