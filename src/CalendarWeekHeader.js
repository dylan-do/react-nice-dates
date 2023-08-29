import classNames from 'classnames'
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns'
import { bool, object, string } from 'prop-types'
import React from 'react'

export default function CalendarWeekHeader({ locale, weekdayFormat, show }) {
  const today = new Date()

  const weekDays = eachDayOfInterval({
    start: startOfWeek(today, { locale }),
    end: endOfWeek(today, { locale })
  }).map(date => format(date, weekdayFormat, { locale }))

  return (
    <div className={classNames({
      'nice-dates-week-header': true,
      'nice-dates-hidden': !show
    })}>
      {weekDays.map(day => (
        <span key={day} className='nice-dates-week-header_day'>
          {day}
        </span>
      ))}
    </div>
  )
}

CalendarWeekHeader.propTypes = {
  locale: object.isRequired,
  weekdayFormat: string,
  show: bool
}
