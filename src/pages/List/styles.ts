import styled from "styled-components";

export const Content = styled.main``;

export const Filters = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  .tag-filter {
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: ${(props) => props.theme.colors.themeColor};

    margin: 0 10px;
    opacity: 0.35;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }

    &::after {
      content: "";
      display: block;
      width: 55px;
      margin: 0 auto;
      border-bottom: 10px solid ${(props) => props.theme.colors.warning};
    }
  }

  .tag-filter-recurrent {
    margin-right: 20px;
  }

  .tag-filter-eventual {
    margin-left: 20px;
  }

  .tag-filter-recurrent::after {
    content: "";
    display: block;
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${(props) => props.theme.colors.success};
  }

  .tag-filter-eventual::after {
    content: "";
    display: block;
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${(props) => props.theme.colors.warning};
  }

  .tag-actived {
    opacity: 1;
  }
`;

export const EmptyData = styled.p`
  font-size: 18px;
  font-weight: 500;
  background: none;
  color: ${(props) => props.theme.colors.themeColor};
`;
