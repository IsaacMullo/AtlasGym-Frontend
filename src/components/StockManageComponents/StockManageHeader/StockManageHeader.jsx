import React, { useState } from "react";
import CustomTypography from "../../../common/CustomTypography/CustomTypography";
import AddModal from "../AddModal/AddModal";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { Button } from "@mui/material";
import UseNavigation from "../../../hooks/UseNavigation/UseNavigation";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import logo from "../../../assets/images/logo.jpg";


const StockManageHeader = ({ onAddProduct }) => {
  const goTo = UseNavigation();
  const { user } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  

  return (
    <>
      <div className="headerSM">
        <img className="logoSM" src={logo}/>
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
          <div className="titlesSM">
            <CustomTypography variant="h5" className="atlasH5SM">Atlas Gym</CustomTypography>
            <CustomTypography variant="subtitle1">Sistema de control de stock</CustomTypography>
          </div>
        </div>
          <CustomButton onClick={handleOpenModal} className="add-buttonSM">Agregar Producto</CustomButton>
      </div>
      <AddModal open={modalOpen} onClose={handleCloseModal} onAddProduct={onAddProduct}/>
    </>
  )
}

export default StockManageHeader;
