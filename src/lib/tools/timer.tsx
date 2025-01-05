
// Define or import the FormatDate function
export const FormatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' , hour: 'numeric' , minute: 'numeric'};
  return new Date(dateString).toLocaleDateString(undefined, options);
}
