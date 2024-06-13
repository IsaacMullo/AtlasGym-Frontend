import React, { useEffect, useState } from 'react';
import '../../styles/stock-manage.css';
import StockManageHeader from "../../components/StockManageComponents/StockManageHeader/StockManageHeader";
import StockManageTable from "../../components/StockManageComponents/StockManageTable/StockManageTable";

const StockManage = () => {


  return (
    <>
      <StockManageHeader/>
      <StockManageTable/>
    </>
  );
}

export default StockManage; 
