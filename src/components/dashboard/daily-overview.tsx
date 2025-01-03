"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Recycle, Trash2, ChevronLeft, ChevronRight, Search, PlusCircle, MinusCircle, Calendar, Bell } from 'lucide-react'
import { useModal } from "@/hooks/modal-store"

// Helper function to get current date
const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
}

export default function DailyOverview() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [weight, setWeight] = useState<number | "">("")
    const [name, setName] = useState<string>("")
    const [logs, setLogs] = useState<{ category: string; quantity: number; weight: number; name: string }[]>([])

    const handleAddLog = () => {
        if (selectedCategory && name && weight) {
            setLogs([...logs, { category: selectedCategory, quantity, weight: Number(weight), name }])
            setSelectedCategory(null)
            setQuantity(1)
            setWeight("")
            setName("")
        }
    }

    const totalItems = logs.reduce((sum, log) => sum + log.quantity, 0)

    const pieData = [
        { name: "Single-Use", value: logs.filter(log => log.category === "Single-Use").reduce((sum, log) => sum + log.quantity, 0) },
        { name: "Recyclables", value: logs.filter(log => log.category === "Recyclables").reduce((sum, log) => sum + log.quantity, 0) },
        { name: "Non-Recyclables", value: logs.filter(log => log.category === "Non-Recyclables").reduce((sum, log) => sum + log.quantity, 0) },
    ]

    const COLORS = ['#FF8042', '#00C49F', '#FFBB28']

    const {onOpen}= useModal()
    return (
        <div className="">
            <Card className="w-full mx-auto bg-transparent ">
                <CardHeader className="bg-green-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl font-bold">Track your plastic usage today!</CardTitle>
                    <p className="text-green-100">{getCurrentDate()}</p>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <CategoryButton
                            category="Single-Use"
                            icon={<ShoppingBag className="w-8 h-8" />}
                            color="bg-red-500"
                            onClick={() => setSelectedCategory("Single-Use")}
                        />
                        <CategoryButton
                            category="Recyclables"
                            icon={<Recycle className="w-8 h-8" />}
                            color="bg-blue-500"
                            onClick={() => setSelectedCategory("Recyclables")}
                        />
                        <CategoryButton
                            category="Non-Recyclables"
                            icon={<Trash2 className="w-8 h-8" />}
                            color="bg-gray-500"
                            onClick={() => setSelectedCategory("Non-Recyclables")}
                        />
                    </div>
                    {/* <Button
                        
                        onClick={() => { 
                            onOpen("logItem")
                        }}
                    >
                        Add log
                    </Button> */}
                    {/* <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full max-w-[300px]  mb-4 bg-green-600 hover:bg-green-700">Log Item</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Log Plastic Item</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="quantity" className="text-right">
                                        Quantity
                                    </Label>
                                    <div className="flex items-center">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        >
                                            <MinusCircle className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            id="quantity"
                                            className="w-16 text-center mx-2"
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            <PlusCircle className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="weight" className="text-right">
                                        Weight (kg)
                                    </Label>
                                    <Input
                                        id="weight"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Category
                                    </Label>
                                    <select
                                        id="category"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={selectedCategory || ""}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Single-Use">Single-Use</option>
                                        <option value="Recyclables">Recyclables</option>
                                        <option value="Non-Recyclables">Non-Recyclables</option>
                                    </select>
                                </div>
                            </div>
                            <Button onClick={handleAddLog} className="w-full bg-green-600 hover:bg-green-700">
                                Add to Log
                            </Button>
                        </DialogContent>
                    </Dialog> */}

                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle>Today's Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-2xl font-bold">{totalItems}</p>
                                    <p className="text-sm text-gray-500">Total Items Logged</p>
                                </div>
                                <div className="w-32 h-32">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={30}
                                                outerRadius={40}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-between">
                        <Button variant="outline" className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Log History
                        </Button>
                        <Button variant="outline" className="flex items-center">
                            <Bell className="w-4 h-4 mr-2" />
                            Set Reminders
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function CategoryButton({ category, icon, color, onClick }: { category: string; icon: React.ReactNode; color: string; onClick: () => void }) {
    return (
        <Button
            className={`h-24 ${color} hover:opacity-90 transition-opacity duration-200 flex flex-col items-center justify-center rounded-lg shadow-md`}
            onClick={onClick}
        >
            {icon}
            <span className="mt-2 font-semibold">{category}</span>
        </Button>
    )
}

