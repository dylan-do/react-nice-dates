import { bool, func, instanceOf, number, object, objectOf, string } from 'prop-types'
import React, { useState } from 'react'
import DatePickerCalendar from './DatePickerCalendar'
import Popover from './Popover'
import useDateInput from './useDateInput'
import useDetectTouch from './useDetectTouch'
import useOutsideClickHandler from './useOutsideClickHandler'

function getInitialState({ date, maximumDate, minimumDate, minYear, maxYear }) {
  const dateValue = date ? new Date(date).getTime() : new Date().getTime()

  const maxDateValue = maximumDate
    ? new Date(maximumDate).getTime()
    : new Date(`${maxYear}-01-01`).getTime()
  const minDateValue = minimumDate
    ? new Date(minimumDate).getTime()
    : new Date(`${minYear}-01-01`).getTime()

  if (minDateValue < dateValue && dateValue < maxDateValue) {
    return new Date(dateValue)
  } else if (dateValue > maxDateValue) {
    return maximumDate
  } else if (dateValue < minDateValue) {
    return minimumDate
  }
  return date || new Date()
}

export default function DatePicker({
  children,
  locale,
  date,
  onDateChange = () => {},
  format,
  minimumDate,
  maximumDate,
  modifiers,
  modifiersClassNames,
  weekdayFormat,
  touchDragEnabled,
  minYear,
  maxYear
}) {
  const [month, setMonth] = useState(
    getInitialState({ date, maximumDate, minimumDate, minYear, maxYear })
  )

  const [focused, setFocused] = useState(false)
  const isTouch = useDetectTouch()

  const [inputRef, popoverRef] = useOutsideClickHandler(() => {
    if (focused) {
      setFocused(false)
    }
  })

  const inputProps = useDateInput({
    date,
    format,
    locale,
    minimumDate,
    maximumDate,
    onDateChange: (date) => {
      onDateChange(date)
      date && setMonth(date)
    }
  })

  const handleDateChange = (date) => {
    onDateChange(date)
    setFocused(false)
  }

  return (
    <div className="nice-dates">
      {children({
        inputProps: {
          ...inputProps,
          ref: inputRef,
          onFocus: () => {
            inputProps.onFocus()
            setFocused(true)

            if (isTouch) {
              inputRef.current.blur()
            }
          },
          readOnly: isTouch
        },
        focused
      })}

      <Popover open={focused} ref={popoverRef}>
        <DatePickerCalendar
          locale={locale}
          date={date}
          month={month}
          onDateChange={handleDateChange}
          onMonthChange={setMonth}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          weekdayFormat={weekdayFormat}
          touchDragEnabled={touchDragEnabled}
          minYear={minYear}
          maxYear={maxYear}
        />
      </Popover>
    </div>
  )
}

DatePicker.propTypes = {
  children: func.isRequired,
  locale: object.isRequired,
  date: instanceOf(Date),
  onDateChange: func,
  format: string,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool,
  minYear: number,
  maxYear: number
}
