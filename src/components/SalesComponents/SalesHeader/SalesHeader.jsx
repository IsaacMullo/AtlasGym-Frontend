import React, { useState } from "react";
import CustomTypography from "../../../common/CustomTypography/CustomTypography";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { Button } from "@mui/material";
import UseNavigation from "../../../hooks/UseNavigate/UseNavigate";
import AddModal from "../../StockManageComponents/AddModal/AddModal";


const SalesHeader = ({ onAddProduct }) => {
  const goTo = UseNavigation();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  

  return (
    <>
      <div className="header">
        <img className="logo" src="../src/assets/images/logo.jpg"/>
        <div>
          <div className="breadcrumb">
          <Button onClick={goTo("/stock")}>
            <CustomTypography variant="body2">ControlStock</CustomTypography>         
          </Button>

          <Button onClick={goTo("/sales")}>
            <CustomTypography variant="body2" className="ventas">Ventas</CustomTypography>
          </Button>

          <Button onClick={goTo("/history")}>
            <CustomTypography variant="body2">Historial de Ventas</CustomTypography>
          </Button>
          </div>
          <div className="titles">
            <CustomTypography variant="h5">Gym</CustomTypography>
            <CustomTypography variant="subtitle1">Sistema de control de stock</CustomTypography>
          </div>
        </div>
          <CustomButton onClick={handleOpenModal} className="add-button">Realizar venta</CustomButton>
      </div>
      <AddModal open={modalOpen} onClose={handleCloseModal} onAddProduct={onAddProduct}/>
    </>
  )
}

export default SalesHeader;
