import classNames from 'classnames'
import { bool, func, instanceOf, number } from 'prop-types'
import React, { useEffect, useRef } from 'react'
import { isValidYear } from './utils'
export default function CalendarYearSelection({
  show,
  onYearChange,
  minimumDate,
  maximumDate,
  year,
  minYear = 1900,
  maxYear = 2099
}) {
  const currentFullYear = new Date(year).getFullYear()
  const years = Array.from({ length: maxYear - minYear }, (_, i) => minYear + i)
  function handleYearClick(selectedYear, event) {
    onYearChange(selectedYear)
    event.preventDefault()
    event.stopPropagation()
  }

  const currentYearRef = useRef(null)
  const parentRef = useRef(null)
  useEffect(() => {
    if (currentYearRef.current && parentRef.current) {
      parentRef.current.scrollTop = currentYearRef.current.offsetTop
    }
  }, [show])

  return (
    <div className={classNames({
      'nice-dates-grid': true,
      'nice-dates-hidden': !show
    })}>
      <div className='nice-dates-year_container' ref={parentRef}>
        {years.map(y => {
          const isCurrentYear = currentFullYear === y
          return <div
            key={y}
            ref={isCurrentYear ? currentYearRef : null}
            onClick={handleYearClick.bind(this, y)}
            className={classNames('nice-dates-year_item', {
              '-current-year': isCurrentYear,
              '-disabled': !isValidYear(y, { minimumDate, maximumDate, minYear, maxYear })
            })}>
            {y}
          </div>
        })}
      </div>
    </div>
  )
}

CalendarYearSelection.propTypes = {
  year: instanceOf(Date).isRequired,
  minYear: number,
  maxYear: number,
  onYearChange: func.isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  show: bool
}
