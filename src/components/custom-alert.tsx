import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  title: string;
  description: string;
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  onAction?: () => void;
}

export default function CustomAlert(props: Props) {
  const { open, description, onOpenChange, onAction, onCancel, title } = props;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="alert-cancel" onClick={onCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction data-testid="alert-yes" onClick={onAction}>
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
