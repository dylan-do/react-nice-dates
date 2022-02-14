import { differenceInDays, isAfter, isBefore, startOfDay, set } from 'date-fns'

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

export const isValidYear = (year, { minimumDate, maximumDate }) => {
  if (!minimumDate && !maximumDate) return true

  const minYear = minimumDate ? new Date(minimumDate).getFullYear() : 1900
  const maxYear = maximumDate ? new Date(maximumDate).getFullYear() : 2099

  return year >= minYear && year <= maxYear
}
