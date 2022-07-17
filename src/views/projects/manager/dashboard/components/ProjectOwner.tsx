import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useUser } from "../../../../../contexts/User";

const titleStyles = {
  fontWeight: 500,
  color: "gray.600",
  fontSize: 12,
};
const bodyStyles = {
  fontWeight: 600,
  fontSize: 14,
};

const ProjectOwner: FC = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={2} {...titleStyles}>
          ชื่อ-นามสกุล (TH)
        </GridItem>
        <GridItem
          colSpan={10}
          {...bodyStyles}
        >{`${user.firstNameTh} ${user.lastNameTh}`}</GridItem>

        <GridItem colSpan={2} {...titleStyles}>
          ชื่อ-นามสกุล (EN)
        </GridItem>
        <GridItem
          colSpan={10}
          {...bodyStyles}
        >{`${user.firstNameEn} ${user.lastNameEn}`}</GridItem>

        <GridItem colSpan={2} {...titleStyles}>
          การศึกษา (Education)
        </GridItem>
        <GridItem
          colSpan={10}
          {...bodyStyles}
        >{`${user.facultyNameEn}, ${user.edulevelNameEn}`}</GridItem>

        <GridItem colSpan={2} {...titleStyles}>
          สาขา/เอก (Major)
        </GridItem>
        <GridItem
          colSpan={10}
          {...bodyStyles}
        >{`${user.majorNameEn} (${user.majorCode})`}</GridItem>
        <GridItem colSpan={2} {...titleStyles}>
          เบอร์โทร (Phone)
        </GridItem>
        <GridItem
          colSpan={10}
          {...bodyStyles}
        >{`${user.phone}`}</GridItem>
        <GridItem colSpan={2} {...titleStyles}>
          อีเมล (Email)
        </GridItem>
        <GridItem
          colSpan={10}
          {...bodyStyles}
        >{`${user.email}`}</GridItem>
      </Grid>
    </Box>
  );
};
export default ProjectOwner;
