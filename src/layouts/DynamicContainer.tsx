import {
  Box,
  Container,
  ContainerProps,
  StackProps,
  VStack,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface DynamicContainerProps {
  children: ReactNode | ReactNode[];
  containerProps?: ContainerProps;
  stackProps?: StackProps;
}

export const DynamicContainer: FC<DynamicContainerProps> = (props) => {
  return (
    <Container px={[0, 4]} my="2vh" {...props.containerProps}>
      {
        <VStack spacing={2} w="full" {...props.stackProps}>
          {Array.isArray(props.children) ? (
            props.children.map((element, index) => {
              return (
                <Box key={`container-element-${index}`} w="full">
                  {element}
                </Box>
              );
            })
          ) : (
            <Box w="full">{props.children}</Box>
          )}
        </VStack>
      }
    </Container>
  );
};
