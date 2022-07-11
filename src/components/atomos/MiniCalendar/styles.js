import styled from 'styled-components'
import { colors } from '../../../common/types/IColors'

export const Container = styled.div`
  margin-bottom: 40px;

  .react-calendar {
    border: none;
    width: ${({ fullWidth }) => (fullWidth ? '100%' : '245px')};

    abbr {
      font-size: 10px;
      text-decoration: none;
      text-transform: capitalize;
    }

    .react-calendar__month-view__days {
      height: 194px;
    }
    .react-calendar__navigation__label__labelText {
      *:first-letter {
        text-transform: capitalize !important;
      }
      font-size: 12px;
    }
    /* width: ${({ fullWidth }) =>
      fullWidth
        ? '100%'
        : '210px'};
    @media (min-width: 1920px) {
      width: ${({
      fullWidth
    }) =>
      fullWidth
        ? '100%'
        : '210px'};

      abbr {
        font-size: 13px;
        text-decoration: none;
        
      }

      .react-calendar__month-view__days {
        height: 239px;
      }
      .react-calendar__navigation__label__labelText {
        *:first-letter {
          text-transform: capitalize !important;
        }
        font-size: 18px;
        font-weight: bold;
      }
    }

    @media (max-width: 1440px) {
      width: ${({
      fullWidth
    }) =>
      fullWidth
        ? '100%'
        : '245px'};

      abbr {
        font-size: 10px;
        text-decoration: none;
      }

      .react-calendar__month-view__days {
        height: 201px;
      }
      .react-calendar__navigation__label__labelText {
        *:first-letter {
          text-transform: capitalize !important;
        }
        font-size: 12px;
      }
    }

    @media (max-width: 1366px) {
      width: ${({
      fullWidth
    }) =>
      fullWidth
        ? '100%'
        : '245px'};

      abbr {
        font-size: 10px;
        text-decoration: none;
      }

      .react-calendar__month-view__days {
        height: 194px;
      }
      .react-calendar__navigation__label__labelText {
        *:first-letter {
          text-transform: capitalize !important;
        }
        font-size: 12px;
      }
    }

    @media (max-width: 1280px) {
      width: ${({
      fullWidth
    }) =>
      fullWidth
        ? '100%'
        : '245px'};

      abbr {
        font-size: 10px;
        text-decoration: none;
      }

      .react-calendar__month-view__days {
        height: 194px;
      }
      .react-calendar__navigation__label__labelText {
        *:first-letter {
          text-transform: capitalize !important;
        }
        font-size: 12px;
      }
    }

    @media (max-width: 1024px) {
      width: ${({
      fullWidth
    }) =>
      fullWidth
        ? '100%'
        : '225px'};

      abbr {
        font-size: 9px;
        text-decoration: none;
      }

      .react-calendar__month-view__days {
        height: 160px;
      }
      .react-calendar__navigation__label__labelText {
        *:first-letter {
          text-transform: capitalize !important;
        }
        font-size: 10px;
      }
    } */

    :only-child {
      margin-bottom: 0px;
    }

    * {
      font-size: 12px;
    }
/* 
    *:first-letter{
      text-transform: capitalize;
    } */

    .react-calendar__navigation {
      align-items: center;
      .react-calendar__navigation__label {
        font-size: 20px;
        /* color: ${colors.secundary}; */
        font-weight: bold;
      }

      .react-calendar__navigation__label:first-letter {
        text-transform: capitalize;
      }

    }
    .react-calendar__navigation__arrow {
      /* color: ${colors.secundary}; */
      font-size: 30px;
    }
    .react-calendar__tile--now {
      background: rgba(200, 200, 200, 0.5);
      border-radius: 10px;
    }
    /* .react-calendar__month-view__weekdays__weekday {
      abbr {
        text-decoration: none;
      }
    } */
    .react-calendar__tile--active {
      /* background: #e70220; */
      color: white;
      font-weight: bold;
      border-radius: 10px;
    }
    .react-calendar__tile:hover {
      border-radius: 10px;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
      /* background: #e70220; */
      border-radius: 10px;
    }
    .react-calendar__navigation__next2-button {
      display: none;
    }
    .react-calendar__navigation__prev2-button {
      display: none;
    }
  }
`
