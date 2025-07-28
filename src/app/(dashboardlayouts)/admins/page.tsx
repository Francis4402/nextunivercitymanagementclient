"use client"

import { IAdminPayload, IAdmin, TUserName } from "@/types/user";
import { DashboardTable } from "../utils/table";
import { useEffect, useState } from "react";
import { getAllAdmins, updateAdmins, deleteAdmin } from "@/services/Admin";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdminValidationSchema } from "../utils/VSchemas/AdminFormValidation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";



const Admins = () => {
    const [admins, setAdmins] = useState<IAdminPayload[]>([]);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<IAdminPayload | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);


    const form = useForm({
        resolver: zodResolver(createAdminValidationSchema.shape.body.shape.admin),
        defaultValues: {
            designation: '',
            name: {
                firstName: '',
                middleName: '',
                lastName: ''
            },
            gender: 'male' as const,
            dateOfBirth: '',
            email: '',
            contactNo: '',
            emergencyContactNo: '',
            bloodGroup: 'A+' as const,
            presentAddress: '',
            permanentAddress: ''
        }
    });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await getAllAdmins();
            setAdmins(response.data);
        } catch (error) {
            console.error("Failed to fetch admins", error);
            toast.error("Failed to load admins");
        }
    };

    useEffect(() => {
        if (selectedAdmin) {
            form.reset();
        }
    }, [selectedAdmin, form]);

    const handleUpdateClick = (admin: IAdminPayload) => {
        setSelectedAdmin(admin);
        setUpdateOpen(true);
    };

    const handleDeleteClick = (admin: IAdminPayload) => {
        setSelectedAdmin(admin);
        setDeleteOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedAdmin) return;
        
        setIsLoading(true);
        try {
            await deleteAdmin(selectedAdmin._id!);
            await fetchAdmins();
            toast.success("Admin deleted successfully");
            setDeleteOpen(false);
        } catch (error) {
            console.error("Delete failed", error);
            toast.error("Failed to delete admin");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateSubmit = async (data: Partial<IAdmin>) => {
        if (!selectedAdmin) return;
        
        setIsLoading(true);
        try {
            await updateAdmins(data, selectedAdmin._id!);
            await fetchAdmins();
            toast.success("Admin updated successfully");
            setUpdateOpen(false);
        } catch (error) {
            console.error("Update failed", error);
            toast.error("Failed to update admin");
        } finally {
            setIsLoading(false);
        }
    };

    const columns: ColumnDef<IAdminPayload>[] = [
        {
          accessorKey: "profileImg",
          header: "Profile Image",
          cell: ({ row }) => <div className="text-left">
            {row.getValue("profileImg") ? (
              <Image src={row.getValue("profileImg")} alt="Profile Image" width={200} height={200} className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 text-center text-sm text-gray-500">
                
              </div>
            )}
          </div>,
        },
        {
            accessorKey: "name",
            header: "Full Name",
            cell: ({ row }) => {
              const value = row.getValue("name") as TUserName;
              const fullName = value
              ? `${value.firstName} ${value.middleName} ${value.lastName}`
              : "N/A";
              return <div className="text-left">{fullName}</div>;
            }
        },
        {
          accessorKey: "designation",
          header: "Designation",
          cell: ({ row }) => <div className="text-left">{row.getValue("designation")}</div>,
        },
        {
          accessorKey: "email",
          header: "Email",
          cell: ({ row }) => <div className="text-left">{row.getValue("email")}</div>,
        },
        {
          accessorKey: "gender",
          header: "Gender",
          cell: ({ row }) => <div className="text-left">{row.getValue("gender")}</div>,
        },
        {
            accessorKey: "dateOfBirth",
            header: "Date Of Birth",
            cell: ({ row }) => {
                const value = row.getValue("dateOfBirth");
                
                if (!value || 
                    (typeof value !== 'string' && 
                     typeof value !== 'number' && 
                     !(value instanceof Date))) {
                    return <div className='text-left'>Not Yet Added</div>;
                }
                
                const date = new Date(value);
                
                if (isNaN(date.getTime())) {
                    return <div className='text-left'>Invalid Date</div>;
                }
                
                const options: Intl.DateTimeFormatOptions = { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                };
                const formattedDate = date.toLocaleDateString(undefined, options);
                return <div className='text-left'>{formattedDate}</div>;
            }
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                const admin = row.original;
                return (
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateClick(admin)}
                        >
                            Update
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(admin)}
                        >
                            Delete
                        </Button>
                    </div>
                );
            }
        }
    ];

    return (
        <div className="mt-10">
            <DashboardTable columns={columns} data={admins} />
            
            {/* Update Dialog */}
            <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Update Admin</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleUpdateSubmit)} className="space-y-4">
                            {/* Name Fields */}
                            <div className="grid grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name.firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="First Name" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name.middleName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Middle Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Middle Name" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name.lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Last Name" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="designation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Designation</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Designation" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gender</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bloodGroup"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blood Group</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select blood group" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                                        <SelectItem key={group} value={group}>{group}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="contactNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact No</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Contact Number" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="emergencyContactNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Emergency Contact</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Emergency Contact" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="presentAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Present Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Present Address" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="permanentAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Permanent Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Permanent Address" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Update Admin'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}

            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Delete Admin</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Are you sure you want to delete this admin?
                    </DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Admins;