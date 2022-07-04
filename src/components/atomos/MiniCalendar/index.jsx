import React from 'react'

import { Container } from './styles'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const MiniCalendar = props => {
  return (
    <Container className="main-calendar-component" {...props}>
      <Calendar calendarType="US" locale="PT" {...props} />
    </Container>
  )
}

export { MiniCalendar }
