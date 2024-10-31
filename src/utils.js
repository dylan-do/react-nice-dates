import { differenceInDays, isAfter, isBefore, set, startOfDay } from 'date-fns'

export const isSelectable = (date, { minimumDate, maximumDate }) =>
  !isBefore(date, startOfDay(minimumDate)) && !isAfter(date, maximumDate)

export const mergeModifiers = (baseModifiers, newModifiers) => {
  const modifiers = { ...baseModifiers }

  if (!newModifiers) {
    return baseModifiers
  }

  Object.keys(newModifiers).forEach(name => {
    modifiers[name] = baseModifiers[name]
      ? date => baseModifiers[name](date) || newModifiers[name](date)
      : newModifiers[name]
  })

  return modifiers
}

export const setTime = (date, dateWithTime) =>
  set(date, { hours: dateWithTime.getHours(), minutes: dateWithTime.getMinutes(), seconds: dateWithTime.getSeconds() })

export const isRangeLengthValid = ({ startDate, endDate }, { minimumLength, maximumLength }) =>
  differenceInDays(startOfDay(endDate), startOfDay(startDate)) >= minimumLength &&
  (!maximumLength || differenceInDays(startOfDay(endDate), startOfDay(startDate)) <= maximumLength)

export const isValidYear = (year, { minimumDate, maximumDate, minYear, maxYear }) => {
  if (!minimumDate && !maximumDate) return true

  const minYearValue = minimumDate ? new Date(minimumDate).getFullYear() : minYear || 1900
  const maxYearValue = maximumDate ? new Date(maximumDate).getFullYear() : maxYear || 2099

  return year >= minYearValue && year <= maxYearValue
}
