import DataTable from "@/components/data-table";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export interface TWithdraw {
  amount: string;
  date: string;
  bussiness: string;
}

export default function Withdraw() {
  const [datas] = useState<TWithdraw[]>([
    {
      amount: "2000000",
      date: "27 Maret 2024",
      bussiness: "Nasi Goreng Pak Syukur",
    },
    {
      amount: "2000000",
      date: "27 Maret 2024",
      bussiness: "Nasi Goreng Pak Syukur",
    },
  ]);

  const columns = useMemo<ColumnDef<TWithdraw>[]>(
    () => [
      {
        header: "No",
        accessorKey: "no",
        cell: (info) => info.row.index + 1,
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Bussiness",
        accessorKey: "bussiness",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    ],
    []
  );
  return (
    <Layout>
      <div className="mb-5 mt-2 flex flex-col justify-between">
        <p className="text-2xl font-semibold ">Withdraw</p>
        <div className="mb-3">
          <div className="bg-[#fdfdfd] mt-5">
            <DataTable columns={columns} datas={datas} />
          </div>
          <div className="flex flex-col items-end gap-3">
            <p>Total : Rp3.000.000,-</p>
            <Button className="bg-[#00ad26] hover:bg-[#006516]">
              Withdraw
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
