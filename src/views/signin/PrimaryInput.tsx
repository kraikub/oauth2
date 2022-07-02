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
    border-radius: 16px;
    border: solid #00000020;
    border-width: 1px;
    font-weight: 400;
    font-size: 1rem;
    outline: none;
    &:focus {
        outline: solid #00de73 2px !important;
    }
    &:active {
        outline: solid #00de73 2px !important;
    }
    &:hover {
        outline: solid #00000010 3px;
    }
    &::placeholder {
      color: #ccd6e0;
    }
`