import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function SnackBarAlert({
  openSnackbar,
  setOpenSnackbar,
  deleted,
}) {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={10000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() => setOpenSnackbar(false)}
        severity={"success"}
        sx={{
          width: "100%",
          borderRadius: 0,
          //   backgroundColor: "rgba(76,175,80,0.9)", // A more vivid color
          padding: "20px", // More padding to increase size
        }}
      >
        {deleted
          ? "Produit supprimé avec succès !"
          : "Produit ajouté avec succès !"}
      </Alert>
    </Snackbar>
  );
}
