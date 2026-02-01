// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ICategory } from "@/types/categories.interface";

// export default function CategoryTable({
//   categories,
// }: {
//   categories: ICategory[];
// }) {
//   return (
//     <div className="border rounded-md">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Title</TableHead>
//             <TableHead className="text-right">Comments</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {categories.length === 0 ? (
//             <TableRow>
//               <TableCell
//                 colSpan={5}
//                 className="text-center py-8 text-muted-foreground"
//               >
//                 No categories found
//               </TableCell>
//             </TableRow>
//           ) : (
//             categories.map((category) => (
//               <TableRow key={category.id}>
//                 <TableCell>
//                   <div className="max-w-[400px]">
//                     <p className="font-medium">{category.name}</p>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

"use client";

import { deleteCategory } from "@/actions/categories.action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICategory } from "@/types/categories.interface";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CategoryTable({ categories }: { categories: ICategory[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (categoryId: string) => {
    const toastId = toast.loading("Deleting category...");
    setIsDeleting(categoryId);

    try {
      const res = await deleteCategory(categoryId);

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }

      toast.success("Category deleted successfully", { id: toastId });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="border rounded-md p-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <p className="p-5">No categories found</p>
          ) : (
            categories.map((category) => {
              return (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDelete(category.id)}
                          disabled={isDeleting === category.id}
                        >
                          {isDeleting === category.id
                            ? "Deleting..."
                            : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
