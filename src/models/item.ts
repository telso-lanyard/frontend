import { z } from "zod";

export default z.object({
  name: z.string(),
  variants: z.array(
    z.object({
      media: z.string(),
      name: z.enum(["black", "white", "blue", "purple", "pink", "red", "grey"]),
      price: z.number(),
      qty: z.number(),
    })
  ),
});
