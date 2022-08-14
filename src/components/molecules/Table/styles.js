import styled, { css } from 'styled-components'
import { colors } from '../../../common/types/IColors'
// import { PaddingDefault } from '../Padding'

export const Parent = styled.div`
`

export const MainContainer = styled.div`
  display: block !important;

  #table-wrap {
    overflow: auto;
  }
`

export const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-sizing: border-box;
  white-space: nowrap;

  thead {
    text-align: left;
  }

  th {
    font-weight: 600;
    /* color: ${colors.red}; */
    vertical-align: middle;
    font-size: 14px;

    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;

    padding-top: 17px !important;
    padding-bottom: 17px !important;
  }


  tbody {
    > tr {
      background: #f4f4f4;
      &:nth-child(even) {
        background: #ffffff;
      }
    }
  }
    

  td {
    padding: 5px 0px;
    font-weight: normal;
    vertical-align: middle;
    color: #303030;
    font-size: 14px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;

    ${({ breakDataLines }) =>
      breakDataLines &&
      css`
        white-space: pre-line;
      `}

    padding-bottom: 15px !important;
    padding-top: 15px !important;
  }

  td.action-menu {
    position: relative !important;
    padding: 0 !important;
  }

  @media (max-width: 769px) {
    thead {
      display: none;
    }

    tbody,
    tr {
      display: block;
    }

    tr {
      margin-bottom: 15px;
    }

    td {
      display: flex;
      justify-content: flex-end;
      position: relative;
      text-align: end;
      word-break: break-word;

      & > button {

        @media (max-width: 769px) {
          span {
            margin-left: 5px;
          }
        }
      }

      &::before {
        content: attr(heading);
        font-size: 14px;
        position: absolute;
        font-weight: 600;
        left: 15px;
        display: block;
        text-align: start;
      }
    }
  }

  /* @media (max-width: 600px) {
    th {
      font-size: 12px;
    }
    td {
      font-size: 12px;
      &::before {
        content: attr(heading);
        font-size: 12px;
        position: absolute;
        left: 15px;
        display: block;
      }
    }
  } */

  @media (max-width: 460px) {
    thead {
      display: none;
    }

    tbody,
    tr {
      display: block;
    }

    tr {
      margin-bottom: 12px;
    }

    td {
      display: flex;
      justify-content: flex-end;
      position: relative;

      @media (max-width: 460px) {
        :last-child {
          padding-bottom: 35px;
        }
      }

      & > button {

        @media (max-width: 460px) {
          span {
            margin: 0px 10px;
            margin-left: 5px;
          }

          svg {
            width: 1.8rem;
            height: 1.8rem;
          }
        }
      }

      &::before {
        content: attr(heading);
        position: absolute;
        left: 15px;
        display: block;
      }
    }
  }

  @media (max-width: 375px) {
    td {
      display: flex;
      justify-content: flex-end;
      position: relative;
      padding-left: 8.2rem;

      &::before {
        content: attr(heading);
        position: absolute;
        left: 15px;
        display: block;
        margin-right: 65%;
      }

      & > button {

        span {
          margin-left: 5px;
        }
      }
    }
  }
`
