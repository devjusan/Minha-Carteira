import { MdColorize } from "react-icons/md";
import styled from "styled-components";

interface ILegendProps {
  color: string;
}

export const Container = styled.div`
  width: 48%;
  height: 260px;

  margin: 10px 0;
  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.themeColor};
  border-radius: 7px;
  display: flex;
`;

export const SideLeft = styled.aside`
  padding: 30px 20px;
  > h2 {
    margin-bottom: 20px;
  }
`;

export const LegendContainer = styled.ul`
  height: 160px;
  overflow-y: scroll;
  padding-right: 15px;
  list-style: none;
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondary};
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.tertiary};
  }
`;

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  > div {
    background-color: ${(props) => props.color};
    width: 45px;
    height: 45px;
    border-radius: 5px;
    line-height: 45px;
    text-align: center;
    font-size: 18px;
  }

  > span {
    margin-left: 5px;
  }
`;

export const SideRight = styled.main``;
