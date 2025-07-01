//contains useful reusable functions that can be used anywhere in your js files

// A basic utility function to format a date into a readable format
export function formatDate(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Ensure the date is a valid Date object
  const parsedDate = new Date(date);
  
  if (isNaN(parsedDate)) {
    return 'Invalid Date'; // Return this if the date is invalid
  }

  return parsedDate.toLocaleDateString('en-US', options);
}
