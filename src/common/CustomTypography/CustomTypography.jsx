import { Typography } from "@mui/material";

const CustomTypography = ({variant, className, children}) =>{
  return(
    <div>
      <Typography variant={variant} className={className}>{children}</Typography>
    </div>
  )
}

export default CustomTypography