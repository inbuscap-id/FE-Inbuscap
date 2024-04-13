import CustomAlert from "@/components/custom-alert";
import DataTable from "@/components/data-table";
import Layout from "@/components/layout-admin";
import { useToast } from "@/components/ui/use-toast";
import {
  approveBusiness,
  getBusinessVerifications,
} from "@/utils/apis/business/api";
import { IVerifBusiness, VerifBusiness } from "@/utils/apis/business/type";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Business() {
  const [datas, setDatas] = useState<IVerifBusiness[]>([]);
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [business, setBusiness] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getBusinessVerifications();

      setDatas(result.data);
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleApproveBusiness = async (
    proposal_id: number,
    body: VerifBusiness
  ) => {
    try {
      const result = await approveBusiness(proposal_id, body);

      toast({
        description: result.message,
      });

      if (body.is_active === 1) {
        setShowApproveDialog(!showApproveDialog);
      }

      if (body.is_active === 2) {
        setShowRejectDialog(!showRejectDialog);
      }
      navigate("/admin/businesses");

      const datas = await getBusinessVerifications();
      setDatas(datas.data);
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const columns = useMemo<ColumnDef<IVerifBusiness>[]>(
    () => [
      {
        header: "No",
        accessorKey: "no",
        cell: (info) => info.row.index + 1,
        footer: (props) => props.column.id,
        size: 10,
      },
      {
        header: "Business Title",
        accessorKey: "title",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 100,
      },
      {
        header: "Owner",
        accessorKey: "owner",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Detail",
        accessorKey: "description",
        cell: (info) => <p>{info.row.original.description.slice(0, 50)}...</p>,
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Amount",
        accessorKey: "capital",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Share Profit",
        accessorKey: "share",
        cell: (info) => <p>{info.row.original.share}%</p>,
        footer: (props) => props.column.id,
        size: 90,
      },
      {
        header: "Proposal",
        accessorKey: "proposal",
        cell: (info) => {
          return info.row.original.proposal ? (
            <>
              <a
                className="text-primary bg-green-100 font-semibold rounded-full text-center px-3 py-1 underline"
                href={info.row.original.proposal}
              >
                File
              </a>
            </>
          ) : (
            <>No Proposal</>
          );
        },
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        header: "Status",
        id: "status",
        cell: (info) => {
          const value = info.row.original.status;
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
        size: 100,
      },
      {
        header: "Approval",
        id: "approval",
        cell: (info) => {
          const value = info.row.original.status;
          if (value === 0) {
            return (
              <div className="flex gap-3">
                <UserCheck
                  className="text-green-700"
                  onClick={() => {
                    setBusiness(info.row.original.title);
                    setBusinessId(info.row.original.id);
                    setShowApproveDialog(!showApproveDialog);
                  }}
                />
                <UserX
                  className="text-red-700"
                  onClick={() => {
                    setBusiness(info.row.original.title);
                    setShowRejectDialog(!showRejectDialog);
                  }}
                />
              </div>
            );
          }
          if (value === 1) {
            return (
              <div className="flex gap-3">
                <UserX
                  className="text-red-700 mx-auto"
                  onClick={() => {
                    setBusiness(info.row.original.title);
                    setShowRejectDialog(!showRejectDialog);
                  }}
                />
              </div>
            );
          }

          if (value === 2) {
            return (
              <div className="flex gap-3">
                <UserCheck
                  className="text-green-700 mx-auto"
                  onClick={() => {
                    setBusiness(info.row.original.title);
                    setBusinessId(info.row.original.id);
                    setShowApproveDialog(!showApproveDialog);
                  }}
                />
              </div>
            );
          }
        },
        footer: (props) => props.column.id,
        size: 100,
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
        <p>Businesses</p>
      </div>
      <div className="w-full h-[500px]">
        <DataTable columns={columns} datas={datas} />
      </div>
      <CustomAlert
        open={showApproveDialog}
        title={`Kamu Yakin Untuk Menyetujui "${business}" ?`}
        description="Setelah bisnis disetujui, maka pengguna dapat berinvestasi di bisnis ini."
        onCancel={() => {
          setShowApproveDialog(!showApproveDialog);
        }}
        onAction={() => handleApproveBusiness(businessId!, { status: 1 })}
      />

      <CustomAlert
        open={showRejectDialog}
        title={`Kamu Yakin Untuk Me-reject "${business}" ?`}
        description="Setelah Bisnis di-reject, maka bisnis tidak akan dipublikasikan."
        onCancel={() => {
          setShowRejectDialog(!showRejectDialog);
        }}
        onAction={() => handleApproveBusiness(businessId!, { is_active: 2 })}
      />
    </Layout>
  );
}
