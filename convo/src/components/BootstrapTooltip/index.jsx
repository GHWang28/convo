import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/system";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.tooltipColor.bg,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.tooltipColor.bg,
    color: theme.palette.tooltipColor.text,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default BootstrapTooltip;
