import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { dayPretty } from "@/logic";
import ProductRow from "@/components/ProductRow";
import Popover from "@/components/Popover";
import { Doc, Id } from "../../convex/_generated/dataModel";
import {
  buildHeaderGroups,
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "preact/hooks";

type OrderRow = {
  user: string;
  orderedProducts: Map<Id<"menu">, Id<"orders">>;
};

export function Dashboard2() {
  const menu: Doc<"menu">[][] | undefined = useQuery(api.order.getMenu);
  const allOrders = useQuery(api.order.getAllOrders);

  if (menu === undefined || allOrders === undefined) {
    return "Loading";
  }

  const tableData = useMemo(() => {
    let users = new Map<string, Map<Id<"menu">, Id<"orders">>>();
    for (const order of allOrders) {
      const node = users.get(order.user);
      if (node === undefined) {
        users.set(order.user, new Map());
      }
      users.get(order.user)!.set(order.menu_item, order._id);
    }
    return Array.from(users).map(([user, orderedProducts]) => ({
      user,
      orderedProducts,
    }));
  }, [allOrders]);

  const columnHelper = createColumnHelper<OrderRow>();

  const columns = useMemo(() => {
    const staticColumns: ColumnDef<OrderRow, any>[] = [
      columnHelper.accessor("user", {
        header: "User",
        cell: (info) => info.getValue(),
      }),
    ];
    const dynamicColumns: ColumnDef<OrderRow, any>[] = menu.flatMap(
      (_day, dayIndex) => {
        const columnId = `day-${dayIndex + 1}`;
        return columnHelper.display({
          id: columnId,
          header: () => dayPretty(dayIndex + 1),
          cell: (props) => (
            <DayCell
              user={props.row.original.user}
              dayIndex={dayIndex}
              orderedProducts={props.row.original.orderedProducts}
              menu={menu}
            />
          ),
        });
      },
    );
    return [...staticColumns, ...dynamicColumns];
  }, [menu]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                style={{ padding: "8px" }}
                key={header.id}
                colSpan={header.colSpan}
              >
                {/* HACK: Use flexRender to render the header content */}
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DayCell({
  user,
  dayIndex,
  orderedProducts,
  menu,
}: {
  user: string;
  dayIndex: number;
  orderedProducts: Map<Id<"menu">, Id<"orders">>;
  menu: Doc<"menu">[][];
}) {
  const total = menu[dayIndex]
    .filter((item) => orderedProducts.has(item._id))
    .reduce((sum, item) => sum + item.price, 0);
  return (
    <Popover
      trigger={total}
      id={`dashboard1-${user}-${dayIndex}`}
      target={
        <div class="popover-main-content">
          <table class="headerless-table">
            <tbody>
              {menu[dayIndex].map((item) => (
                <ProductRow
                  user={user}
                  menuItem={item}
                  orderId={orderedProducts.get(item._id)}
                  detailedDescription={false}
                />
              ))}
            </tbody>
          </table>
        </div>
      }
    />
  );
}
