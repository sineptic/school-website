import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    day_number: v.number(),
    name: v.string(),
    contents: v.array(v.string()),
    price: v.float64(),
    mass: v.float64(),
    proteins: v.float64(),
    fats: v.float64(),
    carbonhydrates: v.float64(),
    energy_value: v.float64(),
  }),
});
