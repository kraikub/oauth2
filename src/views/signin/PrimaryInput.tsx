import styled, { StyledComponent } from "styled-components";
import { FC } from "react";
import { colors } from "../../../styles/theme";

interface PrimaryInputProps {
    width?: string 
}

export const PrimaryInput: StyledComponent<"input", PrimaryInputProps> = styled.input`
    height: 50px;
    width: ${(props) => props.width ? props.width : "100%"};
    background: transparent;
    padding: 0;
    border: solid #00000020;
    border-width: 0 0 2px 0;
    font-weight: 500;
    font-size: 1rem;
    outline: none;
    &:focus {
        border-color: ${colors.katrade[600]} !important;
    }
    &:active {
        border-color: ${colors.katrade.main} !important;
    }
    &:hover {
        border-color: #00000040;
    }
    &::placeholder {
      color: #ccd6e0;
    }
`