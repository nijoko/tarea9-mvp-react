export const toDate = (s) => new Date(s.replace(/-/g, "/"));
export const fmtHour = (s) =>
  toDate(s).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
