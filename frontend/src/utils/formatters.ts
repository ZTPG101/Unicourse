// Helper function to format duration from minutes to readable format
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0 && mins > 0) {
    return `${hours}h, ${mins}m`;
  } else if (hours > 0) {
    return `${hours} h`;
  } else {
    return `${mins} m`;
  }
}; 