import DataTable from "@/components/data-table";
import Layout from "@/components/layout-admin";
import { AdmBusiness } from "@/utils/apis/business/type";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

export default function Business() {
  
    const [datas, setDatas] = useState<AdmBusiness[]>([
      {
        title: "Nasi Goreng",
        description: "Pendanaan untuk usaha Nasi Goreng",
        fullname: "Ade Prasetyo",
        capital: 5000000,
        profit: 70,
        collected: 2000000,
        proposal: "proposal-nasi-goreng.pdf",
      },
      {
        title: "Coffee Abnormal",
        description: "Pendanaan untuk usaha Coffee Shop",
        fullname: "Franco",
        capital: 50000000,
        profit: 70,
        collected: 3000000,
        proposal: "proposal-coffee-abnormal.pdf",
      },
    ]);
  
    const columns = useMemo<ColumnDef<AdmBusiness>[]>(
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
          accessorKey: "title",
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
          size: 100,
        },
        {
          header: "Detail",
          accessorKey: "description",
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        },
        {
          header: "Owner",
          accessorKey: "fullname",
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        },
        {
          header: "Amount",
          accessorKey: "capital",
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        },
        {
          header: "Share Profit",
          accessorKey: "profit",
          cell: (info) => String(info.getValue()),
          footer: (props) => props.column.id,
          size: 90,
        },
        {
        header: "Proposal",
        accessorKey: "proposal",
        cell: (info) => String(info.getValue()),
        footer: (props) => props.column.id,
        size: 0,
      },
      {
        header: "Collected",
        accessorKey: "collected",
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
