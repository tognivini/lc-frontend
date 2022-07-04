import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;

  @media (max-width: 768px) {
    position: unset;
  }
`

export const Items = styled.div`
  position: absolute;
  padding: 4px;
  top: 0;
  max-width: 300px !important;
  /* left: 0; */
  right: 0;
  z-index: 1100;

  overflow: hidden;
  /* padding: 20px 20px 30px 20px; */

  background: #ffffff;
  border-radius: 6px;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.35);

  height: fit-content;

  .mini-calendar {
    margin: 0 !important;
  }

  @media (max-width: 768px) {
    height: 100vh;
    width: 100vw;
    max-width: 100vw;
    display: flex;
    background: rgba(0, 0, 0, 0.25);
    align-items: center;
    justify-content: center;

    .mini-calendar {
      max-width: 300px;
    }
  }

  p {
    padding: 15px 20px 15px 20px;
    cursor: pointer;

    :hover {
      background: #f4f4f4;
    }

    :last-child {
      margin-bottom: 15px;
    }
  }
`

export const ItemsTitle = styled.h3`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  padding: 15px 20px 15px 20px;
`
