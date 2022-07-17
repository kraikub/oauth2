import styled, { StyledComponent } from "styled-components";
import { FC } from "react";

interface PrimaryInputProps {
    width?: string 
}

export const PrimaryInput: StyledComponent<"input", PrimaryInputProps> = styled.input`
    height: 50px;
    width: ${(props) => props.width ? props.width : "100%"};
    background: transparent;
    padding: 0 20px 0 20px;
    border-radius: 8px;
    border: solid #00000020;
    border-width: 1px;
    font-weight: 500;
    font-size: 1rem;
    outline: none;
    &:focus {
        box-shadow: 0 0 0 2px #00de73 !important;
    }
    &:active {
        box-shadow: 0 0 0 2px #00de73 !important;
    }
    &:hover {
        box-shadow: 0 0 0 3px #00000010;
    }
    &::placeholder {
      color: #ccd6e0;
    }
`