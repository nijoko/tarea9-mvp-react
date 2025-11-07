import { toDate } from "./date";
export function buildICS(sessions, calendarName = "Mi Feria") {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `X-WR-CALNAME:${calendarName}`,
  ];
  const dt = (d) => {
    const x = toDate(d);
    const p = (n) => String(n).padStart(2, "0");
    return `${x.getFullYear()}${p(x.getMonth() + 1)}${p(x.getDate())}T${p(
      x.getHours()
    )}${p(x.getMinutes())}00`;
  };
  sessions.forEach((s) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${s.id}@feria`,
      `DTSTART:${dt(s.start)}`,
      `DTEND:${dt(s.end)}`,
      `SUMMARY:${s.title}`,
      `DESCRIPTION:Track: ${s.track || "-"}`,
      "END:VEVENT"
    );
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
