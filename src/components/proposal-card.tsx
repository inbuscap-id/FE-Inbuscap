import nasigoreng from "@/assets/nasigoreng.jpg";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Archive, EditIcon, Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import CustomAlert from "./custom-alert";

interface Props {
  title: string;
  desc: string;
  target: number;
  collected: number;
  withOption?: boolean;
}

let rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function ProposalCard(props: Props) {
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { title, desc, target, collected, withOption } = props;
  let persentase = (collected / target) * 100;

  return (
    <>
      <div className="w-11/12 mx-auto flex bg-slate-50 border border-[#00ad26] rounded-xl mb-10">
        <div className="w-full bg-red-100 rounded-xl">
          <img src={nasigoreng} alt="" className="w-full h-full rounded-xl" />
        </div>

        <div className="flex flex-col w-11/12 justify-center p-5">
          {withOption ? (
            <div className="self-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="flex gap-2"
                    onClick={() => setShowArchiveDialog(true)}
                  >
                    <Archive className="w-5" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2">
                    <EditIcon className="w-5" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 flex gap-2"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash className="w-5" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <></>
          )}

          <div>
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-xl">
              {rupiah.format(collected)} / {rupiah.format(target)}
            </p>
            <p className="my-2 text-sm">{desc}</p>
            <p>{persentase}%</p>
            <Progress
              value={persentase}
              className="mb-4 border border-[#006516] bg-slate-200"
            />
            <Button className="w-1/4 bg-[#00ad26] hover:bg-[#006516]">
              See Details
            </Button>
          </div>
        </div>
      </div>
      <CustomAlert
        open={showArchiveDialog}
        title="Kamu Yakin Untuk Mengarsip Proposal Ini?"
        description="Proposal ini akan tersimpan di halaman Archive Proposals' dan tidak akan terlihat oleh publik."
        // onAction={async () => {
        //   try {
        //     await onDelete(postID);
        //     setShowDeleteDialog(false);
        //   } catch (error) {}
        // }}
        onCancel={() => {
          setShowArchiveDialog(false);
        }}
      />
      <CustomAlert
        open={showDeleteDialog}
        title="Kamu Yakin Menghapus Proposal Ini?"
        description="Ini akan menghapus Proposal dan tidak dapat dikembalikan."
        // onAction={async () => {
        //   try {
        //     await onDelete(postID);
        //     setShowDeleteDialog(false);
        //   } catch (error) {}
        // }}
        onCancel={() => {
          setShowDeleteDialog(false);
        }}
      />
    </>
  );
}
