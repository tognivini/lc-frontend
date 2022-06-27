import styled from "styled-components";
import { colors } from "../../common/types/IColors";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.blueGreenLight};
`;
export const UlCustom = styled.ul`
  list-style: none;
`;

export const Li = styled.li`
  margin-right: 5px;
  margin-left: 5px;
  float: left;
  border: 1px solid ${colors.blueGreenLight};
  border-radius: 8px;

  a {
    color: #fff;
    text-decoration: none;
    padding: 5px 10px;
    display: block;
    border-radius: 8px;
  }

  a:hover {
    background: ${colors.blueGreenLighter};
    color: #fff;
  }

  span {
    color: #fff;
    text-decoration: none;
    padding: 5px 10px;
    display: block;
    border-radius: 8px;
  }

  span:hover {
    background: ${colors.blueGreenLighter};
    color: #fff;
  }
`;

export const TitleGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20vw;
  padding-left: 20px;
`;
