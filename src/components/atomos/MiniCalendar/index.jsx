import React from 'react'

import { Container } from './styles'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { differenceInCalendarDays } from 'date-fns';

const MiniCalendar = props => {
  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }
  // const disabledDates = [tomorrow, in3Days, in5Days];

  const disabledDates = ['07/07/2022', '07/07/2022', '07/15/2022'];
  function tileDisabled({ date, view }) {
    // Disable tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      return disabledDates.find(dDate => isSameDay(dDate, date));
    }
  }

  return (
    <Container className="main-calendar-component" {...props}>
      <Calendar calendarType="US" locale="PT" {...props}   disabledDates={tileDisabled}
 />
    </Container>
  )
}

export { MiniCalendar }
