import * as Yup from "yup";
const allowedCategories = [
  "Watches",
  "Phones",
  "Accessories",
  "Earphones",
  "Ipads",
  "Laptops",
];

export const editProductValidationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Product description is required"),
  category: Yup.string()
    .required("Product category is required")
    .oneOf(
      allowedCategories,
      `Invalid category, You can only add one of the categories: ${allowedCategories.join(
        ", "
      )}`
    ),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Price is required"),
});
