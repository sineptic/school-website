import { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";

export const get = query({
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
