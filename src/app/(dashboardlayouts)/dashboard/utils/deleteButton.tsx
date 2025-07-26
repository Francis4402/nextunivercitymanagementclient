import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IAfaculty } from '@/types/afacultytype';



interface DeleteButtonProps {
    handleDelete: (faculty: IAfaculty) => void;
    faculty: IAfaculty;
}

const DeleteButton = ({ handleDelete, faculty }: DeleteButtonProps) => {
    
  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button variant="outline" size={"sm"}>delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Faculty</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this faculty?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => handleDelete(faculty)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteButton