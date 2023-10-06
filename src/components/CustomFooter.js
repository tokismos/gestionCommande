import React from "react";
import { Button } from "@mui/material";
import {
  GridPagination,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function CustomFooter(props) {
  const navigate = useNavigate();

  return (
    <GridToolbarContainer className="flex justify-between">
      <div>
        <GridToolbarExport />
        <GridToolbarFilterButton />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/add")}
        >
          Ajouter un produit
        </Button>
      </div>
      <GridPagination {...props} />
    </GridToolbarContainer>
  );
}
