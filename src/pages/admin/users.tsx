import DataTable from "@/components/data-table";
import Layout from "@/components/layout-admin";
import { IVerif } from "@/utils/apis/users/type";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { getVerifications } from "@/utils/apis/users/api";
import { toast } from "sonner";

export default function Users() {
  const [datas, setDatas] = useState<IVerif[]>([]);

  useEffect(() => {
    fetchDataReqVerification();
  }, []);

  const fetchDataReqVerification = async () => {
    try {
      const result = await getVerifications();

      setDatas(result.data);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  };

  const columns = useMemo<ColumnDef<IVerif>[]>(
    () => [
      {
        header: "No",
        accessorKey: "no",
        cell: (info) => info.row.index + 1,
        footer: (props) => props.column.id,
        size: 50,
      },

      {
        header: "Fullname",
        accessorKey: "fullname",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Foto KTP",
        accessorKey: "photo_ktp",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },

      {
        header: "Foto NPWP",
        accessorKey: "photo_npwp",
        cell: (info) => String(info.getValue()),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Foto Selfie",
        accessorKey: "photo_selfie",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "KTP",
        accessorKey: "ktp",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "NPWP",
        accessorKey: "npwp",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "No HP",
        accessorKey: "phone",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Status",
        id: "is_active",
        cell: (info) => {
          const value = info.row.original.is_active;
          if (value === 0) {
            return (
              <p className="text-yellow-600 font-semibold bg-yellow-100 rounded-full text-center px-3 py-1">
                Pending
              </p>
            );
          }
          if (value === 1) {
            return (
              <p className="text-primary font-semibold bg-green-100 rounded-full text-center px-3 py-1">
                Approved
              </p>
            );
          }
          if (value === 2) {
            return (
              <p className="text-red-500 font-semibold bg-red-100 rounded-full text-center px-3 py-1">
                Rejected
              </p>
            );
          }
        },
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Approval",
        id: "approval",
        cell: () => (
          <div className="flex gap-3">
            <UserCheck className="text-green-700" />
            <UserX className="text-red-700" />
          </div>
        ),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Action",
        id: "action",
        cell: () => (
          <div className="flex gap-3">
            <Edit className="text-blue-700" />
            <Trash2 className="text-red-700" />
          </div>
        ),
        footer: (props) => props.column.id,
        size: 200,
      },
    ],
    []
  );
  return (
    <Layout>
      <div className="w-full text-xl font-semibold mb-4">
        <p>Users</p>
      </div>
      <div className="w-full">
        <DataTable columns={columns} datas={datas} />
      </div>
    </Layout>
  );
}
