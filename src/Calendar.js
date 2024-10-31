import { startOfMonth } from 'date-fns'
import { bool, func, instanceOf, number, object, objectOf, string } from 'prop-types'
import React, { useState } from 'react'
import CalendarGrid from './CalendarGrid'
import CalendarNavigation from './CalendarNavigation'
import CalendarWeekHeader from './CalendarWeekHeader'
import CalendarYearSelection from './CalendarYearSelection'
import useControllableState from './useControllableState'
import { isSelectable, mergeModifiers } from './utils'

export default function Calendar({
  locale,
  month: receivedMonth,
  modifiers: receivedModifiers,
  modifiersClassNames,
  minimumDate,
  maximumDate,
  onMonthChange,
  onDayHover,
  onDayClick,
  weekdayFormat,
  touchDragEnabled,
  minYear = 1900,
  maxYear = 2099
}) {
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, startOfMonth(new Date()))
  const [isSelectYear, setIsSelectYear] = useState(false)
  const modifiers = mergeModifiers(
    { disabled: date => !isSelectable(date, { minimumDate, maximumDate }) },
    receivedModifiers
  )
  function handleChangeYear(newYear) {
    const newMonth = new Date(month)
    newMonth.setFullYear(newYear)
    setMonth(newMonth)
    setIsSelectYear(false)
  }

  return (
    <div>
      <CalendarNavigation
        locale={locale}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        month={month}
        onMonthChange={setMonth}
        onYearClick={() => setIsSelectYear(true)}
      />

      <CalendarWeekHeader show={!isSelectYear} locale={locale} weekdayFormat={weekdayFormat} />
      <CalendarGrid
        show={!isSelectYear}
        locale={locale}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        month={month}
        onMonthChange={setMonth}
        onDayHover={onDayHover}
        onDayClick={onDayClick}
        touchDragEnabled={touchDragEnabled}
      />
      <CalendarYearSelection
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        show={isSelectYear}
        year={month}
        minYear={minYear}
        maxYear={maxYear}
        onYearChange={handleChangeYear}
      />
    </div>
  )
}

Calendar.propTypes = {
  locale: object.isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  month: instanceOf(Date),
  year: instanceOf(Date),
  onMonthChange: func,
  onYearChange: func,
  onDayHover: func,
  onDayClick: func,
  weekdayFormat: string,
  touchDragEnabled: bool,
  minYear: number,
  maxYear: number
}
