import styled from "styled-components";
import { colors } from "../../../common/types/IColors";
import { TitleOneComponent } from "../../../components/atomos/TitleOne";
import { Input } from "../../../components/atomos/Input";
import { Select } from "../../../components/atomos/Select";
import { InputMask } from "../../../components/atomos/InputMask";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding-top: 5vh;
  border-bottom-right-radius: 2.5px;
  border-top-right-radius: 2.5px;
  background-color: ${colors.backgroundGray};
  overflow: hidden;
  width: 100%;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
`;

export const FormGrid = styled.div`
  display: flex;
  align-content: center;
  height: 65vh;
  margin: 5vw 2vw 1vw 2vw;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;

  padding: 50px 50px 450px 50px;

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

export const InputCustom = styled(Input)``;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: end;
`;

export const SelectInput = styled(Select)``;

export const SpacedView = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InputMasked = styled(InputMask)``;
