import { isSameDay, startOfMonth } from 'date-fns'
import { bool, func, instanceOf, number, object, objectOf, string } from 'prop-types'
import React from 'react'
import Calendar from './Calendar'
import useControllableState from './useControllableState'
import { isSelectable, mergeModifiers, setTime } from './utils'

export default function DatePickerCalendar({
  locale,
  date: selectedDate,
  month: receivedMonth,
  onDateChange,
  onMonthChange,
  minimumDate,
  maximumDate,
  modifiers: receivedModifiers,
  modifiersClassNames,
  weekdayFormat,
  touchDragEnabled,
  minYear,
  maxYear
}) {
  const isSelected = date => isSameDay(date, selectedDate) && isSelectable(date, { minimumDate, maximumDate })
  const modifiers = mergeModifiers({ selected: isSelected, disabled: isSelected }, receivedModifiers)
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, startOfMonth(selectedDate || new Date()))

  const handleDateChange = date => {
    onDateChange(selectedDate ? setTime(date, selectedDate) : date)
  }

  return (
    <Calendar
      locale={locale}
      month={month}
      onMonthChange={setMonth}
      onDayClick={handleDateChange}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      weekdayFormat={weekdayFormat}
      touchDragEnabled={touchDragEnabled}
      minYear={minYear}
      maxYear={maxYear}
    />
  )
}

DatePickerCalendar.propTypes = {
  locale: object.isRequired,
  date: instanceOf(Date),
  month: instanceOf(Date),
  onDateChange: func,
  onMonthChange: func,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool,
  minYear: number,
  maxYear: number
}
