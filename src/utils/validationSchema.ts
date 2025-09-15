import * as yup from 'yup';

export const addressAddSchema = yup.object().shape({
  firstname: yup.string().required("First Name is required").typeError('Input must be a string'),
  lastname: yup.string().required("Last Name is required").typeError('Input must be a string'),
  mobile: yup.string().required("Mobile number is required").matches(/^(?:\+91[-\s]?|0)?\d{10}$/, 'Enter exactly 10 digits'),
  address: yup.string().required("Address is required").typeError('Input must be a string'),
  landmark: yup.string().required("Lanmark is required").typeError('Input must be a string'),
  pincode: yup.number().required("Pincode is required").typeError('Input must be a number'),
  city: yup.string().required("City is required").typeError('Input must be a string'),
  state: yup.string().required("State is required").typeError('Input must be a string'),
  // country: yup.string().required("Country is required").typeError('Input must be a string'),
  

})

export const editProfileSchema = yup.object().shape({
  name: yup.string().required("Name is required").typeError('Input must be a string'),
  // lastname: yup.string().required("Last Name is required").typeError('Input must be a string'),
  email: yup.string().email('Invalid email').required('Email is required'),
  // mobile: yup.string().required("Mobile number is required").matches(/^(\+91-|\+91|0)?\d{10}$/, 'Enter exactly 10 digits'),
})
