import { z } from "zod";
import { colors } from "../utils/data";

export default z.object({
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    guardian: z.string().email().optional(),
  }),
  address: z.object({
    "First name": z.string(),
    "Last name": z.string(),
    "Street Address": z.string(),
    "Apartment, Suite, Bldg. (Optional)": z.string().optional(),
    "Zip Code": z.string(),
    "City, State": z.string(),
    Country: z.string(),
  }),
  cart: z.array(
    z.object({
      type: z.string(),
      color: z.enum(Object.values(colors) as [string, ...string[]]),
      count: z.number(),
    })
  ),
  paid: z.boolean().default(false),
  delivered: z.boolean().default(false),
  trackID: z.number(),
});
