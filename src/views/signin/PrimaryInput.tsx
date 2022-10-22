import styled, { StyledComponent } from "styled-components";
import { FC } from "react";
import { colors } from "../../../styles/theme";

type BorderRadiusProps = "all" | "top" | "bottom" 

interface PrimaryInputProps {
    width?: string; 
    backgroundColor?: string;
    backgroundColorOnHover?: string;
    placeholderColor?: string;
    borderRadius?: BorderRadiusProps
}

const borderRadius: { [key: string]: string } = {
    all: "8px",
    top: "8px 8px 0 0",
    bottom: "0 0 8px 8px",
}

type WrappedPrimaryInputProps = StyledComponent<"input", PrimaryInputProps>

export const PrimaryInput: WrappedPrimaryInputProps= styled.input`
    height: 50px;
    width: ${(props: WrappedPrimaryInputProps) => props.width ? props.width : "100%"};
    background: ${(props: WrappedPrimaryInputProps) => props.backgroundColor ? props.backgroundColor : "transparent"};
    border-radius: ${(props: WrappedPrimaryInputProps) => borderRadius[props.borderRadius] || borderRadius["all"]};
    padding: 0 10px 0 10px;
    border: solid #00000020 1px;
    font-weight: 400;
    font-size: 1rem;
    outline: none;
    &:focus {
        background-color: ${(props: WrappedPrimaryInputProps) => props.backgroundColorOnHover || props.backgroundColor || "#00000014"}
    }
    &:active {
        background-color: ${(props: WrappedPrimaryInputProps) => props.backgroundColorOnHover || props.backgroundColor || "#00000014"}
    }
    &:hover {
        background-color: ${(props: WrappedPrimaryInputProps) => props.backgroundColorOnHover || "#00000007"}
    }
    &::placeholder {
      color: ${(props: WrappedPrimaryInputProps) => props.placeholderColor ? props.placeholderColor : "#ccd6e0"};
    }
`