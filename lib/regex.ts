/**
 * Regex for HH:MM:SS format.
 * HH is hour from 00 to 23.
 * MM is minute from 00 to 59.
 * SS is second from 00 to 59.
 */
export const time24HoursFormat =
    /^([0-1][0-9]|[2][0-3]):([0-5][0-9]):[0-5][0-9]$/;

/**
 * Regex for YYYY-MM-DD format.
 * YYYY is year from 0000 to 9999.
 * MM is month from 01 to 12.
 * DD is day from 01 to 31.
 * Note that this cannot validate the date.
 */
export const dateFormat = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
