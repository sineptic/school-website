import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getMenu = query({
  args: {},
  handler: async (ctx) => {
    const menu = await ctx.db.query("menu").collect();
    let res: Doc<"menu">[][] = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
    for (const menuItem of menu) {
      res[menuItem.day_number - 1].push(menuItem);
    }
    return res;
  },
});

export const add = mutation({
  args: {
    user: v.string(),
    menuItem: v.id("menu"),
  },
  handler: async (ctx, { user, menuItem }) => {
    ctx.db.insert("orders", { user, menu_item: menuItem });
  },
});
export const remove = mutation({
  args: {
    id: v.id("orders"),
  },
  handler: async (ctx, { id }) => {
    ctx.db.delete(id);
  },
});

export const getOrder = query({
  args: {
    user: v.string(),
  },
  handler: async (ctx, { user }) => {
    return await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("user"), user))
      .collect();
  },
});

export const getAllOrders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("orders").order("asc").collect();
  },
});
