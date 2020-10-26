import * as Yup from 'yup';

export const AddressSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  comment: Yup.string().default(''),
}).defined();

export type Address = Yup.InferType<typeof AddressSchema>;


export const OrderItemSchema = Yup.object({
  productId: Yup.string().required(),
  count: Yup.number().integer().positive().required()
}).defined();

export type OrderItem = Yup.InferType<typeof OrderItemSchema>;


export const OrderSchema = Yup.object({
  id: Yup.string().required(),
  items: Yup.array().of(OrderItemSchema),
  address: AddressSchema,
  status: Yup.string().required(),
}).defined();

export type Order = Yup.InferType<typeof OrderSchema>;
