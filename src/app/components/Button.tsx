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
      color: black;
      font-weight: bold;
      background: #EBEDF1;
    `,
  secondary: `
      color: #fff;
      font-weight: bold;
      background: linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248));
    `,
};

const Container = styled.button`
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  border-radius: 50px;
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
