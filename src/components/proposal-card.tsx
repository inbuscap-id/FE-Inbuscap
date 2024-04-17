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
      <div className="lg:w-11/12 md:w-12/12 lg:h-[330px] md:w-[600px] md:h-[260px] h-[500px] mx-auto md:flex sm:grid bg-slate-50 border border-[#00ad26] rounded-xl mb-20">
        <div className="w-full bg-slate-100 rounded-xl">
          <img src={image} alt="" className="lg:w-full lg:h-full md:h-[259px] md:w-[500px] w-[400px] h-[250px] rounded-xl" />
        </div>
        <div className="md:flex md:flex-col sm:grid md:w-11/12 justify-around p-5">
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
                        className="flex gap-2 cursor-pointer"
                        onClick={() => setShowPublicDialog(!showPublicDialog)}
                      >
                        <EarthIcon className="w-5 cursor-pointer" />
                        <p className="cursor-pointer">Go Public</p>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        className="flex gap-2 cursor-pointer"
                        onClick={() => setShowArchiveDialog(!showArchiveDialog)}
                      >
                        <Archive className="w-5" />
                        Archive
                      </DropdownMenuItem>
                    </>
                  )}
                  <Link to={`/business/${id}/update`}>
                    <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                      <EditIcon className="w-5" />
                      <p>Edit</p>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="text-red-600 flex gap-2 cursor-pointer"
                    onClick={() => setShowDeleteDialog(!showDeleteDialog)}
                  >
                    <Trash className="w-5 cursor-pointer" />{" "}
                    <p className="cursor-pointer">Delete</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <></>
          )}

          <div className="lg:mb-7 mb-9">
            <p className="lg:text-2xl md:text-xl text-base font-semibold">{title}</p>
            <p className="lg:text-xl md:text-md text-sm">
              {formatRupiah.format(collected)} / {formatRupiah.format(target)}
            </p>
            <p className="my-3 lg:text-sm text-[10px]">{desc.slice(0, 90)}.....</p>
            <p>{persentase}%</p>
            <Progress
              value={persentase}
              className="mb-4 border border-[#006516] bg-slate-200"
            />

            <>
              <Link
                to={invested ? `/invested-business/${id}` : `/business/${id}`}
              >
                <Button className="lg:w-1/4 bg-[#00ad26] hover:bg-[#006516]">
                  <p className="lg:text-base md:text-[15px] text-[10px]">See Details</p>
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
