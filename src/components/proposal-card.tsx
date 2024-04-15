import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Archive, EarthIcon, EditIcon, Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import CustomAlert from "./custom-alert";
import { Link } from "react-router-dom";
import { formatRupiah } from "@/utils/format-money";

interface Props {
  title: string;
  desc: string;
  target: number;
  collected: number;
  image: string;
  id: number;
  withOption?: boolean;
  archive?: boolean;
  invested?: boolean;
  onDelete?: (id: string) => Promise<void>;
}

export default function ProposalCard(props: Props) {
  const [showPublicDialog, setShowPublicDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    title,
    desc,
    image,
    target,
    collected,
    id,
    withOption,
    archive,
    invested,
    onDelete,
  } = props;

  let persentase = Math.round((collected / target) * 100);

  return (
    <>
      <div className="w-11/12 h-[330px] mx-auto flex bg-slate-50 border border-[#00ad26] rounded-xl mb-10">
        <div className="w-full bg-slate-100 rounded-xl">
          <img src={image} alt="" className="w-full h-full rounded-xl" />
        </div>

        <div className="flex flex-col w-11/12 justify-around p-5">
          {withOption ? (
            <div className="self-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" forceMount>
                  {archive ? (
                    <>
                      <DropdownMenuItem
                        className="flex gap-2"
                        onClick={() => setShowPublicDialog(!showPublicDialog)}
                      >
                        <EarthIcon className="w-5" />
                        Go Public
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        className="flex gap-2"
                        onClick={() => setShowArchiveDialog(!showArchiveDialog)}
                      >
                        <Archive className="w-5" />
                        Archive
                      </DropdownMenuItem>
                    </>
                  )}
                  <Link to={`/business/${id}/update`}>
                    <DropdownMenuItem className="flex gap-2 items-center">
                      <EditIcon className="w-5" />
                      <p>Edit</p>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="text-red-600 flex gap-2"
                    onClick={() => setShowDeleteDialog(!showDeleteDialog)}
                  >
                    <Trash className="w-5" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <></>
          )}

          <div className="mb-7">
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-xl">
              {formatRupiah.format(collected)} / {formatRupiah.format(target)}
            </p>
            <p className="my-2 text-sm">{desc.slice(0, 90)}.....</p>
            <p>{persentase}%</p>
            <Progress
              value={persentase}
              className="mb-4 border border-[#006516] bg-slate-200"
            />

            <>
              <Link
                to={invested ? `/invested-business/${id}` : `/business/${id}`}
              >
                <Button className="w-1/4 bg-[#00ad26] hover:bg-[#006516]">
                  See Details
                </Button>
              </Link>
            </>
          </div>
        </div>
      </div>
      <CustomAlert
        open={showPublicDialog}
        title="Kamu Yakin Untuk Mempublikasikan Kembali Proposal?"
        description="Proposal ini akan dapat terlihat lagi oleh publik, artinya crowd funding dilanjutkan."
        onCancel={() => {
          setShowPublicDialog(false);
        }}
      />
      <CustomAlert
        open={showArchiveDialog}
        title="Kamu Yakin Untuk Mengarsip Proposal Ini?"
        description="Proposal ini akan tersimpan di halaman Archive Proposals' dan tidak akan terlihat oleh publik."
        onCancel={() => {
          setShowArchiveDialog(false);
        }}
      />
      <CustomAlert
        open={showDeleteDialog}
        title="Kamu Yakin Menghapus Proposal Ini?"
        description="Ini akan menghapus Proposal dan tidak dapat dikembalikan."
        onAction={async () => {
          if (onDelete) {
            try {
              await onDelete(id.toString());
              setShowDeleteDialog(!showDeleteDialog);
            } catch (error) {}
          } else {
            return null;
          }
        }}
        onCancel={() => {
          setShowDeleteDialog(false);
        }}
      />
    </>
  );
}
