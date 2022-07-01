import styled from "styled-components";
import { colors } from "../../../common/types/IColors";
import Close from "@material-ui/icons/Close";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";

export const Div = styled.div`
  width: 100%;
  margin-bottom: 25px;

  position: relative;
  display: inline-block;

  @media (max-width: 600px) {
    position: unset;
  }

  :only-child {
    margin-bottom: 0px;
  }

  .select-box {
    display: flex;
    width: 100%;
    flex-direction: column;
    font-size: 13px;

    z-index: 4;
  }

  .select-box .options-container {
    box-shadow: 0 8px 12px 0 rgb(0 0 0 / 25%);

    background: #fff;
    color: #000;
    max-height: 0;
    width: 100%;
    opacity: 0;
    border-radius: 0 0 5px 5px;
    overflow: hidden;
    border-left: solid 1px rgba(200, 200, 200, 1);
    border-right: solid 1px rgba(200, 200, 200, 1);
    border-bottom: solid 1px rgba(200, 200, 200, 1);
    position: absolute;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    z-index: 5;

    order: 1;

    @media (max-width: 600px) {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      display: grid;

      grid-template-columns: 1fr 100vw 1fr;
      grid-template-rows: 1fr auto 1fr;
      grid-template-areas: ". . ." ". options ." ". . .";

      background: rgba(50, 50, 50, 0.5);

      z-index: 5000;
      margin-top: 0px !important;

      .options-list {
        grid-area: options;
        background: white;
        width: 100%;
      }
    }

    .option {
      padding: 8px;
      @media (max-width: 600px) {
        padding: 15px;
      }
    }
  }

  .selected {
    background: #fff;
    border-radius: ${({ drop }) => (drop ? "5px 5px 0 0" : "5px")};
    color: #000;
    position: relative;
    border: solid 1px
      ${({ error }) => (error ? "red" : "rgba(200, 200, 200, 1)")};
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    display: flex;
    align-items: center;
    justify-content: space-between;

    order: 0;

    font-size: 13px;

    min-height: 35px;
  }

  .open {
    transform: rotate(180deg);
    transition: transform 0.3s;
  }

  .close {
    transform: rotate(0deg);
    transition: transform 0.3s;
  }

  .select-box .options-container.active {
    max-height: 500%;
    opacity: 1;
    overflow-y: auto;
    position: absolute;

    @media (max-width: 600px) {
      position: fixed;
    }
    top: 37px;

    ::-webkit-scrollbar {
      width: 0;
    }

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .select-box .options-container.active + .selected::after {
    transform: rotateX(180deg);
    top: -6px;
  }

  .select-box .options-container::-webkit-scrollbar {
    width: 8px;
    background: rgba(200, 200, 200, 1);
    border-radius: 0 0 3px 0;
  }

  .select-box .options-container::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150, 1);
    border-radius: 0 0 3px 0;
  }

  .select-box .option,
  .selected {
    cursor: pointer;
  }

  .select-box .option:hover {
    background: ${colors.blueGreenLighter};
    color: #fff;
  }

  .select-box label {
    cursor: pointer;
  }

  .select-box .option .radio {
    display: none;
  }
`;

export const CloseIcon = styled(Close)``;
export const ArrowForwardIcon = styled(ArrowForwardIos)``;
