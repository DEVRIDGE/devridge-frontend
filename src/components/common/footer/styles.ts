import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px;
  width: 100%;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

export const Col = styled.div`
  display: flex;
`;

export const Logo = styled.svg`
  margin-right: 20px;
  width: 100px;
`;

export const Teams = styled.ul`
  li:first-child {
    margin-bottom: 10px;
  }
`;

export const Info = styled.ul`
  display: flex;

  li {
    margin-right: 10px;
  }

  li:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-end;

    li {
      margin-right: 0;
    }

    li:nth-of-type(2) {
      display: none;
    }

    li:last-child {
      margin-top: 10px;
    }
  }
`;

export const Item = styled.li`
  font-size: 10px;
  color: ${(props) => props.theme.textGreyColor};
`;
