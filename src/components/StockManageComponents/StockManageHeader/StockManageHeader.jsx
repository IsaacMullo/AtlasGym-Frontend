import React, { useState } from "react";
import CustomTypography from "../../../common/CustomTypography/CustomTypography";
import AddModal from "../AddModal/AddModal";
import CustomButton from "../../../common/CustomButton/CustomButton";

const StockManageHeader = ({ onAddProduct }) => {
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
            <CustomTypography variant="body2">ControlStock</CustomTypography>
            <CustomTypography variant="body2" className="ventas">Ventas</CustomTypography>
          </div>
          <div className="titles">
            <CustomTypography variant="h5">Gym</CustomTypography>
            <CustomTypography variant="subtitle1">Sistema de control de stock</CustomTypography>
          </div>
        </div>
            <CustomButton onClick={handleOpenModal} >Agregar Producto</CustomButton>
      </div>
      <AddModal open={modalOpen} onClose={handleCloseModal} onAddProduct={onAddProduct}/>
    </>
  )
}

export default StockManageHeader;
