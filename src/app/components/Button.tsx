import React from "react";
import styled from "styled-components";

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: "primary" | "secondary";
  disabled?: boolean;
};

const COLOR: Record<string, string> = {
  primary: `
      color: #fff;
      font-weight: bold;
      background: #3861FB;
      border-radius: 10px;
      margin: 0px 5px;
    `,
  secondary: `
      color: black;
      font-weight: bold;
      background: #EBEDF1;
      border-radius: 50px;
    `,
};

const Container = styled.button`
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  outline: none;
  transition: all 0.2s;
  ${(props) => props.color && COLOR[props.color]}
`;

export const Button = ({
  onClick,
  children,
  color = "primary",
  disabled,
}: ButtonProps) => {
  return (
    <Container onClick={onClick} color={color} disabled={disabled}>
      {children}
    </Container>
  );
};
