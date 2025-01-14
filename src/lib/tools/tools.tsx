
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