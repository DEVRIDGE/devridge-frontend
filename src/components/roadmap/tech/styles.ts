import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
  z-index: 2;

  a {
    text-decoration: none;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
  }
`;

export const TechName = styled.span`
  font-size: 14px;
`;
