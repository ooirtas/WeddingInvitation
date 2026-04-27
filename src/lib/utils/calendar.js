export function generateCalendarLinks(event) {
  const { title, date, time, location, note } = event;

  // Simple date parser for "Saturday, 14 February 2027" and "08:00 WIB"
  // Note: We'll assume a 3-hour duration for the calendar event
  const year = 2027;
  const month = '02';
  const day = '14';
  const hour = time.split(':')[0];
  const minutes = '00';

  const startDateTime = `${year}${month}${day}T${hour}${minutes}00Z`;
  const endDateTime = `${year}${month}${day}T${parseInt(hour) + 3}${minutes}00Z`;

  const details = encodeURIComponent(note);
  const locationEncoded = encodeURIComponent(location);
  const titleEncoded = encodeURIComponent(`The Wedding of Aruna & Bima - ${title}`);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return {
    google: `https://www.google.com/calendar/render?action=TEMPLATE&text=${titleEncoded}&dates=${startDateTime}/${endDateTime}&details=${details}&location=${locationEncoded}`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${titleEncoded}&startdt=${year}-${month}-${day}T${hour}:${minutes}:00&enddt=${year}-${month}-${day}T${parseInt(hour) + 3}:${minutes}:00&body=${details}&location=${locationEncoded}`,
    ics: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:${encodeURIComponent(currentUrl)}%0ADTSTART:${startDateTime}%0ADTEND:${endDateTime}%0ASUMMARY:${titleEncoded}%0ADESCRIPTION:${details}%0ALOCATION:${locationEncoded}%0AEND:VEVENT%0AEND:VCALENDAR`
  };
}
