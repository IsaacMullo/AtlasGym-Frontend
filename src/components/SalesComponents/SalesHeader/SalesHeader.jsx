import React, { useState } from "react";
import CustomTypography from "../../../common/CustomTypography/CustomTypography";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { Button } from "@mui/material";
import UseNavigation from "../../../hooks/UseNavigate/UseNavigate";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";


const SalesHeader = ({ onOpenModal }) => {
  const goTo = UseNavigation();
  const { user } = useAuth();


  return (
    <>
      <div className="headerS">
        <img className="logoS" src="../src/assets/images/logo.jpg"/>
        <div>
        <div className="breadcrumbSM">
          {user && user.rol === 'admin' && (
            <Button onClick={goTo("/stock")}>
              <CustomTypography variant="body2">ControlStock</CustomTypography>
            </Button>
          )}

          {user && (user.rol === 'admin' || user.rol === 'employee') && (
            <Button onClick={goTo("/sales")}>
              <CustomTypography variant="body2" className="ventas">Ventas</CustomTypography>
            </Button>
          )}

          {user && user.rol === 'admin' && (
            <Button onClick={goTo("/history")}>
              <CustomTypography variant="body2">Historial de Ventas</CustomTypography>
            </Button>
          )}
        </div>
          <div className="titlesS">
            <CustomTypography variant="h5" className="atlasH5S">Atlas Gym</CustomTypography>
            <CustomTypography variant="subtitle1">Sistema de control de stock</CustomTypography>
          </div>
        </div>
          <CustomButton onClick={onOpenModal} className="sale-button">Realizar venta</CustomButton>
      </div>
    </>
  )
}

export default SalesHeader;
