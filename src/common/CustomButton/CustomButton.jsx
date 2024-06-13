import { Button } from "@mui/material";

const CustomButton = ({variant, size, onClick, className, children}) =>{
  return(
    <div>
      <Button variant={variant} size={size} onClick={onClick} className={className}>{children}</Button>
    </div>
  )
}

export default CustomButton