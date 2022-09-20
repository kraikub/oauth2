import styled, { StyledComponent } from "styled-components";
import { FC } from "react";
import { colors } from "../../../styles/theme";

interface PrimaryInputProps {
    width?: string; 
    backgroundColor?: string;
    placeholderColor?: string;
}

type WrappedPrimaryInputProps = StyledComponent<"input", PrimaryInputProps>

export const PrimaryInput: WrappedPrimaryInputProps= styled.input`
    height: 50px;
    margin-top: 4px;
    width: ${(props: WrappedPrimaryInputProps) => props.width ? props.width : "100%"};
    background: ${(props: WrappedPrimaryInputProps) => props.backgroundColor ? props.backgroundColor : "transparent"};
    border-radius: 8px 8px 0 0;
    padding: 0 10px 0 10px;
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
      color: ${(props: WrappedPrimaryInputProps) => props.placeholderColor ? props.placeholderColor : "#ccd6e0"};
    }
`