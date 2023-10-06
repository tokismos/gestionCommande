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
import { useLocation } from "react-router-dom";
import SnackBarAlert from "./SnackBarAlert";

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

  useEffect(() => {
    if (state) {
      getProduct(state, setValue);
    }
  }, [state, setValue]);

  const onSubmit = (data) => {
    if (state) {
      return updateProduct(state, data);
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
    <div className="flex items-center justify-center h-screen">
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
                helperText={errors.orderNumber && "Order Number is required"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("fullName", { required: true })}
                label="Full Name"
                fullWidth
                error={!!errors.fullName}
                helperText={errors.fullName && "Full Name is required"}
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
                helperText={errors.date && "Date is required"}
                defaultValue={getCurrentDate()} // Set default value here
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("phoneNumber", { required: true })}
                label="Phone Number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="glassType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined">
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
                {...register("buyingPrice", { required: true })}
                label="Prix d'achat"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("sellingPrice", { required: true })}
                label="Prix de vente"
                fullWidth
              />
            </Grid>

            {/* <Grid item xs={12}>
           
            </Grid> */}
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
