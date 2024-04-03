import DataTable from "@/components/data-table";
import Layout from "@/components/layout-admin";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

export default function Business() {
  
    const [datas, setDatas] = useState<TUser[]>([
      {
        businesstitle: "Nasi Goreng",
        detail: "Pendanaan untuk usaha Nasi Goreng",
        owner: "Ade Prasetyo",
        amount: "Rp.5000.000,-",
        shareprofit: "70% / 30%",
        file: "proposal-nasi-goreng.pdf",
      },
      {
        businesstitle: "Coffee Abnormal",
        detail: "Pendanaan untuk usaha Coffee Shop",
        owner: "Franco",
        amount: "Rp.50.000.000,-",
        shareprofit: "70% / 30%",
        file: "proposal-coffee-abnormal.pdf",
      },
    ]);
  
    const columns = useMemo<ColumnDef<TUser>[]>(
      () => [
        {
          header: "No",
          accessorKey: "no",
          cell: (info) => info.row.index + 1,
          footer: (props) => props.column.id,
          size: 20,
        },
        {
          header: "Business Title",
          accessorKey: "businesstitle",
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
          size: 100,
        },
        {
          header: "Detail",
          accessorKey: "detail",
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        },
        {
          header: "Owner",
          accessorKey: "owner",
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        },
        {
          header: "Amount",
          accessorKey: "amount",
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        },
        {
          header: "Share Profit",
          accessorKey: "shareprofit",
          cell: (info) => String(info.getValue()),
          footer: (props) => props.column.id,
          size: 90,
        },
        {
        header: "File",
        accessorKey: "file",
        cell: (info) => String(info.getValue()),
        footer: (props) => props.column.id,
        size: 0,
      },
        {
          header: "Approval",
          id: "approval",
          cell: (info) => (
            <div className="flex gap-3">
              <Ellipsis className="text-green-700" />
            </div>
          ),
          footer: (props) => props.column.id,
          size: 50,
        },
        {
          header: "Action",
          id: "action",
          cell: (info) => (
            <div className="flex gap-3">
              <Edit className="text-blue-700" />
              <Trash2 className="text-red-700" />
            </div>
          ),
          footer: (props) => props.column.id,
          size: 50,
        },
      ],
      []
    );
    return (
      <Layout>
        <div className="w-full text-xl font-semibold mb-4">
          <p>Businesses</p>
        </div>
        <div className="w-full">
          <DataTable columns={columns} datas={datas} />
        </div>
      </Layout>
    );
  }
