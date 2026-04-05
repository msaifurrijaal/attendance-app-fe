/**
 * Ensures that a given string is not empty.
 *
 * @param value - The string to be checked.
 * @returns The original string if it is not empty; otherwise, returns a hyphen ('-').
 */
export const stringEmptyGuard = (value: string | undefined) => {
  return value ? value : '-'
}

/**
 * Ensures that a given number is not empty (i.e., not zero).
 *
 * @param value - The number to be checked.
 * @returns The original number if it is not zero, otherwise returns 0.
 */
export const numberEmptyGuard = (value: number | undefined) => {
  return value === undefined || value === null ? '-' : value
}

/**
 * Converts a date string to a localized date string if the value is not empty.
 * If the value is empty, returns a hyphen ('-').
 *
 * @param {string} [value=''] - The date string to be converted. Defaults to an empty string.
 * @returns {string} - The localized date string or a hyphen if the input is empty.
 */

export const dateEmptyGuard = (value = '') => {
  return value
    ? new Date(value).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : '-'
}
