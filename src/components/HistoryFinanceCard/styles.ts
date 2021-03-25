import styled from "styled-components";

export const Container = styled.li`
  background-color: ${(props) => props.theme.colors.tertiary};
  margin: 10px 0;
  padding: 12px 10px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;

  position: relative;

  &:hover {
    opacity: 0.7;
    transform: translate3d(7px, 0, 0);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
  }

  > div > span {
    font-size: 22px;
    font-weight: 500;
  }
`;

interface ITagProps {
  color: string;
}

export const Tag = styled.div<ITagProps>`
  position: absolute;
  width: 13px;
  height: 70%;
  left: 0;
  background-color: ${(props) => props.color};
`;
