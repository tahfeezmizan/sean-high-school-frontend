export const formatDateTime = (isoDate: string) => {
  const date = new Date(isoDate);

  const optionsDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const optionsYear: Intl.DateTimeFormatOptions = { year: "numeric" };

  const formattedDate = date.toLocaleDateString("en-US", optionsDate); // April 26, 2025
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime); // 2:27 PM
  const formattedYear = date.toLocaleDateString("en-US", optionsYear); // 2025

  return { formattedDate, formattedTime, formattedYear };
};
