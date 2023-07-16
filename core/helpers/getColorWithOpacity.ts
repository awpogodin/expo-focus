export const getColorWithOpacity = (color: string, opacity: number): string => {
  const processedOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + processedOpacity.toString(16).toUpperCase();
};
