// TimeZoneService — keeps all date handling in the user's zone (NFR-09).
export const TimeZoneService = {
  /** The user's IANA time zone, e.g. "America/Los_Angeles". */
  zone: (): string => Intl.DateTimeFormat().resolvedOptions().timeZone,

  /** Today's date as YYYY-MM-DD in the user's local time. */
  todayISO(): string {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 10);
  },

  /** Format an ISO timestamp for display in the user's locale/zone. */
  format(iso: string, opts: Intl.DateTimeFormatOptions = { dateStyle: "medium" }): string {
    return new Intl.DateTimeFormat(undefined, opts).format(new Date(iso));
  },
};
