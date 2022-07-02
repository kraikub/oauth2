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
    border: solid #00000010;
    border-width: 0 0 2px 0;
    font-weight: 400;
    font-size: 1.2rem;
    transition: 300ms ease;
    outline: none;
    &:focus {
        border-width: 0 0 2px 0;
        border-color: #00de73;
    }
    &:active {
        border-width: 0 0 2px 0;
        border-color: #00de73;
    }
`