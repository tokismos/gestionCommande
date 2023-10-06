import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { deleteProduct, fetchProducts } from "../db";
import {
  Alert,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./AlertDialog";
import SnackBarAlert from "./SnackBarAlert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "orderNumber", headerName: "Order number", width: 150 },

  { field: "fullName", headerName: "Full Name", width: 150, sortable: false },
  {
    field: "date",
    headerName: "Date",
    width: 130,
    disableColumnMenu: true,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 150,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "glassType",
    headerName: "Type de verre",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "buyingPrice",
    headerName: "Prix d'achat",
    sortable: false,
    width: 160,
  },
  {
    field: "sellingPrice",
    headerName: "Prix de vente",
    sortable: false,
    width: 160,
  },
];

export default function DataTable() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [rowId, setRowId] = useState(null);

  const navigate = useNavigate();

  const editColumn = {
    field: "edit",
    headerName: "Modifier",
    width: 50,
    renderCell: (params) => (
      <div>
        <IconButton
          color="primary"
          onClick={() => navigate("/add", { state: params?.id })}
        >
          <EditIcon />
        </IconButton>
      </div>
    ),
  };
  const deleteColumn = {
    field: "delete",
    headerName: "Supprimer",
    width: 50,
    renderCell: (params) => (
      <div>
        <IconButton
          color="primary"
          onClick={(ev) => {
            setRowId(params.id);
            setIsDialogOpen(true);
          }}
          style={{ color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  };

  useEffect(() => {
    fetchProducts(setProducts, setIsLoading);
  }, []);

  return (
    <div className="h-screen ">
      <AlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        onDelete={() => deleteProduct(rowId, setOpenSnackbar)}
      />
      <SnackBarAlert
        deleted
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
      <DataGrid
        rows={products}
        columns={[...columns, editColumn, deleteColumn]}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sortModel={[
          {
            field: "date",
            sort: "desc",
          },
        ]}
        loading={isLoading}
      />
    </div>
  );
}
