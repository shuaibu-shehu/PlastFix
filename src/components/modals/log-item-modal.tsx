'use client';

import { Dialog, DialogDescription, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomeButton from '../global/custom-button';
import { useModal } from '@/hooks/modal-store';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { useToast } from '@/hooks/use-toast';
// import { useAdminStore } from '@/hooks/admin-store';
import { addLogItemSchema } from '@/lib/types'; // Assuming you have a schema for log items
import { useRouter } from 'next/navigation';

function LogItemModal() {
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === 'logItem';
    const { toast } = useToast();
    // const { addLogItem } = useAdminStore(); // Assuming you have a store for log items
    const router = useRouter();
    const form = useForm<z.infer<typeof addLogItemSchema>>({
        mode: 'onChange',
        resolver: zodResolver(addLogItemSchema),
        defaultValues: { name: '', weight: 0, quantity: 1, category: undefined },
    });

    const loading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof addLogItemSchema>) => {
        try {
            // const res = await addLogItem(data); // Call your function to add log item
            // if (res.success) {
            //     toast({ title: 'Success', description: 'Log item added successfully' });
            //     router.push(`/logs/${res.data.id}`); // Redirect to the log item page
            //     onClose(); // Close modal on success
            // } else {
            //     toast({ title: 'Error', description: res.message });
            // }
        } catch (error) {
            console.error('Failed to add log item:', error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Log Item</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Enter the details below to log a new item.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
                        {/* Item Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Item Name" disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Weight Input */}
                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Weight (kg)" type="number" disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Quantity Input */}
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Quantity" type="number" disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Category Select */}
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            disabled={loading}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Single-Use">Single-Use</SelectItem>
                                                <SelectItem value="Recyclables">Recyclables</SelectItem>
                                                <SelectItem value="Non-Recyclables">Non-Recyclables</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <div className="flex justify-between w-full items-center">
                                <Button disabled={loading} onClick={onClose} variant="ghost">
                                    Cancel
                                </Button>
                                <CustomeButton type="submit" isLoading={loading}>
                                    Log Item
                                </CustomeButton>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default LogItemModal; 