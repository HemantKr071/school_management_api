import { z } from "zod";


// Zod Validation Schema to verify entries
export const schoolSchema = z.object({
  name: z.string().min(3, "School name must be at least 3 characters").max(255),
  address: z.string().min(5, "Address must be at least 5 characters"),
  latitude: z.number().min(-90, "Latitude must be between -90 and 90").max(90),
  longitude: z.number().min(-180, "Longitude must be between -180 and 180").max(180),
});

export const querySchema = z.object({
  latitude: z.preprocess((val) => parseFloat(val), z.number().min(-90).max(90)),
  longitude: z.preprocess((val) => parseFloat(val), z.number().min(-180).max(180)),
});
