import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Meta } from "@/utils/types/api";

interface Props {
  meta?: Meta;
  onClickPrevious: () => void;
  onClickNext: () => void;
  onClickPage: (page: string | number) => void;
}

export default function Pagination(props: Props) {
  const { meta, onClickPrevious, onClickNext, onClickPage } = props;

  return (
    <div className="flex justify-center items-center gap-3 mb-5">
      <Button
        variant="outline"
        size="icon"
        disabled={meta?.page === 1}
        onClick={onClickPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        disabled={meta?.page === 1}
        onClick={() => onClickPage(1)}
      >
        1
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={meta?.page === 2}
        onClick={() => onClickPage(2)}
      >
        2
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={meta?.page === 3}
        onClick={() => onClickPage(3)}
      >
        3
      </Button>

      <Button
        variant="outline"
        size="icon"
        disabled={meta?.page === meta?.total_pages}
        onClick={onClickNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
