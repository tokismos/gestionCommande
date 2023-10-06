import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { addProduct, getProduct, updateProduct } from "../db";
import { useLocation, useNavigate } from "react-router-dom";
import SnackBarAlert from "./SnackBarAlert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();
  const { state } = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      getProduct(state, setValue);
    }
  }, [state, setValue]);

  const onSubmit = (data) => {
    if (state) {
      return updateProduct(state, setOpenSnackbar, data);
    }
    addProduct(data, setOpenSnackbar, reset);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Add 1 because months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="mt-4">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="contained"
          color="primary"
        >
          Retour
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center my-10 gap-3">
        <span className="font-bold text-3xl">OPTIC 2000</span>
        {state && (
          <div className="justify-center flex items-center">
            <EditIcon className="text-red-500 text-2xl w-10 h-10" />
            <span className="text-xs text-red-500 ml-2">
              Vous êtes entrain de modifier le produit !
            </span>
          </div>
        )}
      </div>
      <SnackBarAlert
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
      <Container maxWidth="sm" className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                {...register("orderNumber", { required: true })}
                label="Order Number"
                fullWidth
                error={!!errors.orderNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("fullName", { required: true })}
                label="Full Name"
                fullWidth
                error={!!errors.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("date", { required: true })}
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                defaultValue={getCurrentDate()} // Set default value here
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("phoneNumber", {
                  validate: {
                    hasTenDigits: (value) =>
                      /^\d{10}$/.test(value) ||
                      "Numero de téléphone incorrect.",
                  },
                })}
                label="Numéro de téléphone"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber && errors.phoneNumber.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="glassType"
                control={control}
                defaultValue=""
                rules={{ required: "Type de verre is required" }} // Add validation rules here
                render={({ field, fieldState }) => (
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                  >
                    <InputLabel>Type de verre</InputLabel>
                    <Select label="Type de verre" {...field}>
                      <MenuItem value={"item1"}>Item 1</MenuItem>
                      <MenuItem value={"item2"}>Item 2</MenuItem>
                      <MenuItem value={"item3"}>Item 3</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("buyingPrice", {
                  required: "Prix d'achat is required",
                  pattern: {
                    value: /^[0-9]+(.[0-9]{1,2})?$/,
                    message: "Invalid number format",
                  },
                })}
                label="Prix d'achat"
                fullWidth
                error={!!errors.buyingPrice}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("sellingPrice", {
                  required: "Prix d'achat is required",
                  pattern: {
                    value: /^[0-9]+(.[0-9]{1,2})?$/,
                    message: "Invalid number format",
                  },
                })}
                label="Prix de vente"
                fullWidth
                error={!!errors.sellingPrice}
              />
            </Grid>
          </Grid>
          <div className="flex w-full justify-around mt-4">
            <Button type="submit" variant="contained" color="primary">
              {state ? "Modifier" : "Ajouter"}
            </Button>
            <Button variant="contained" onClick={() => reset()}>
              Reset
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default AddProduct;
