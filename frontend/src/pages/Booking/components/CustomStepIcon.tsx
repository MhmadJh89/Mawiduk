import React from "react";
import { Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  active: boolean;
  completed: boolean;
  className?: string;
};

const CustomStepIcon: React.FC<Props> = ({ active, completed, className }) => {
  return (
    <Box
      className={className}
      sx={{
        width: { xs: 50, sm: 50, md: 50 },
        height: { xs: 50, sm: 50, md: 50 },
        borderRadius: "50%",
        border: "5px solid" + (active ? "#D4AF37" : "#ffffff"),
        backgroundColor: completed ? "#008000" : active ? "#151a20" : "#B4B9C9",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: { xs: 20, sm: 24, md: 26 },
        zIndex: 1,
      }}
    ></Box>
  );
};

export default CustomStepIcon;
