import { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const menu = await ctx.db.query("orders").collect();
    let res: Doc<"orders">[][] = [
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
