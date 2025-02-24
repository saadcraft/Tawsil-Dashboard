
// Define or import the FormatDate function
export const FormatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}


export const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = (event.target as HTMLInputElement).value;
  if (!/^\d*$/.test(inputValue)) {
    (event.target as HTMLInputElement).value = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
  }
};

// Function to calculate the difference between two dates
export function getDateDifference(dateString: string): string {
  // Parse the given date string into a Date object
  const givenDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = currentDate.getTime() - givenDate.getTime();

  // Handle cases where the given date is in the past
  if (differenceInMs < 0) {
    return "0";
  }

  // Convert the difference into days, hours, minutes, and seconds
  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;

  const days = Math.floor(differenceInMs / msInDay);
  const hours = Math.floor((differenceInMs % msInDay) / msInHour);
  const minutes = Math.floor((differenceInMs % msInHour) / msInMinute);

  // Format the result
  return `${days !== 0 ? (days + " days,") : ""}  ${hours !== 0 ? (hours + " hours,") : ""}  ${minutes} minutes`;
}