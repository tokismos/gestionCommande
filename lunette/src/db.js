import { child, onValue, remove, update } from "firebase/database";

const { database, ref, push, set, get } = require("./firebase");
// import { getDatabase, ref, set } from "firebase/database";

const addProduct = (data, setOpenSnackbar, reset) => {
  const newUserRef = push(ref(database, "products"));

  set(newUserRef, {
    ...data,
  })
    .then(() => {
      setOpenSnackbar(true);
      reset();
    })
    .catch((error) => {
      // setOpenSnackbar("error");
    });
};

async function fetchProducts(setProducts, setIsLoading) {
  try {
    const starCountRef = ref(database, "products/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = [];
        // Iterate over each key-value pair in the data
        for (let key in data) {
          productsArray.push({
            id: key, // Include the key as 'id'
            ...data[key], // Spread the original data
          });
        }
        setProducts(productsArray);
        setIsLoading(false);
        return productsArray;
      } else {
        setIsLoading(false);
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
const getProduct = async (productId, setValue) => {
  try {
    const product = ref(database, `products/${productId}/`);
    onValue(product, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        Object.keys(data).forEach((field) => {
          if (data[field]) {
            setValue(field, data[field]);
          }
        });
        // setValue("phoneNumber", "8796");
      } else {
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const updateProduct = async (productId, data) => {
  const product = ref(database, `products/${productId}/`);

  await update(product, data);
};

const deleteProduct = (productId, setOpenSnackbar) => {
  const product = ref(database, `products/${productId}/`);

  remove(product)
    .then(() => {
      setOpenSnackbar(true);
    })
    .catch((error) => {
      console.error("Failed to delete:", error);
    });
};
export { addProduct, fetchProducts, getProduct, updateProduct, deleteProduct };
