import styled from "styled-components";
import { colors } from "../../../common/types/IColors";
import { Input } from "../../../components/atomos/Input";
import { InputMask } from "../../../components/atomos/InputMask";
import { TitleOneComponent } from "../../../components/atomos/TitleOne";
import { Select } from "../../../components/atomos/Select";
import { DateInput } from "../../../components/atomos/DateInput";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  border-bottom-right-radius: 2.5px;
  border-top-right-radius: 2.5px;
  background-color: ${colors.backgroundGray};
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
`;

export const FormGrid = styled.div`
  display: flex;
  align-content: center;
  height: 70vh;
  margin: 5vw 2vw 1vw 2vw;
  width: 50vw;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;

  padding: 50px 50px 50px 50px;

  background-color: ${colors.white};
  box-shadow: 0 0 3.5px 0 rgba(0, 0, 0, 0.3);

  width: 70vw;
`;

export const CardTitle = styled(TitleOneComponent)`
  text-align: center;
  color: ${colors.darkGray};
  font-family: "Open Sans" !important;
  font-size: 30px;
  margin-top: 0px !important;
`;

export const BrandView = styled.div``;

export const InputC = styled(Input)``;

export const InputMasked = styled(InputMask)``;

export const SelectInput = styled(Select)``;
export const DateInputC = styled(DateInput)``;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: end;
`;

export const NextScheduleGrid = styled.div`
  display: flex;
  align-content: center;
  height: 70vh;
  margin: 5vw 2vw 1vw 2vw;
  width: 40vw;
`;

export const ArrowForwardIosIcon = styled(ArrowForwardIos)`
  color: ${colors.blueGreenLight};
  cursor: pointer;
`;

export const ArrowForwardIosIconDown = styled(ArrowForwardIos)`
  transform: rotate(90deg);
  color: ${colors.blueGreenLight};
  cursor: pointer;
`;

export const NextScheduleContent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;

  padding: ${(props) =>
    props.oppenedView ? "20px 50px 50px 20px" : "50px 50px 50px 50px"};

  background-color: ${colors.white};
  box-shadow: 0 0 3.5px 0 rgba(0, 0, 0, 0.3);

  height: ${(props) => (props.oppenedView ? "60vh" : "2vh")};
  width: 50vw;
`;

export const ContainerNexSchedule = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CardTitleNextSchedule = styled(TitleOneComponent)`
  color: ${colors.darkGray};
  font-family: "Open Sans" !important;
  font-size: 25px;
  margin-top: 0px !important;
  cursor: pointer;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const SpacedView = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const VisibleSpan = styled.span`
  ${(props) => (props.visible ? "" : "display: none")};
`;
