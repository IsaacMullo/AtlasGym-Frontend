import React from 'react';
import { Button, Typography } from "@mui/material";
import CustomTypography from "../../../common/CustomTypography/CustomTypography";
import UseNavigation from "../../../hooks/UseNavigate/UseNavigate";



const SalesHistoryHeader = () =>{
  const goTo = UseNavigation();

  return(
    <div className="header-sales-history">
      <img className="logoSH" src="../src/assets/images/logo.jpg"/>
      <div>
        <div className="breadcrumbSH">
          <Button onClick={goTo("/stock")}>
            <CustomTypography variant="body2">ControlStock</CustomTypography>         
          </Button>

          <Button onClick={goTo("/sales")}>
            <CustomTypography variant="body2" className="ventas">Ventas</CustomTypography>
          </Button>

          <Button onClick={goTo("/history")}>
            <Typography variant="body2">Historial de Ventas</Typography>
          </Button>
        </div>
        <div className="titlesSH">
          <CustomTypography variant="h5" className="atlasH5SH">Atlas Gym</CustomTypography>
          <CustomTypography variant="subtitle1">Sistema de control de stock</CustomTypography>
        </div>
      </div>
    </div>
  );
}

export default SalesHistoryHeader