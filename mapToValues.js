const mapToValues = (
  current,
  min,
  max,
  targetMin = 0,
  targetMax = 100
) => ((current - min) * (targetMax - targetMin)) / (max - min) + targetMin;
