import { Button } from "@/components/ui/button";
import type { DateRange } from "@/types/auth";
import { useState } from "react";

type Props = {
    onChange: (range: DateRange) => void
}

export default function DateRangeFilter({ onChange }: Props) {

    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');

    const handleLast7Days = () => {
        const toDate = new Date()
        const fromDate = new Date()
        fromDate.setDate(toDate.getDate() - 7)
        onChange({ from: fromDate, to: toDate });
    }

    const handleLast30Days = () => {
        const toDate = new Date()
        const fromDate = new Date()
        fromDate.setDate(toDate.getDate() - 30);
        onChange({ from: fromDate, to: toDate })
    }

    const handleApplyRange = () => {
        if (!from || !to) return
        const fromDate = new Date(from)
        const toDate = new Date(to)
        if (fromDate > toDate) return
        onChange({ from: fromDate, to: toDate })
    }

    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold">Filtra por Fechas</h2>
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end">
                <div className="flex items-center gap-3"> 
                    <Button variant="outline" onClick={handleLast7Days}>
                        Últimos 7 días
                    </Button>
                    <Button variant="outline" onClick={handleLast30Days}>
                        Últimos 30 días
                    </Button>
                </div>
                <div className="flex items-end gap-2">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Desde</label>
                        <input
                            type="date"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="border rounded-md px-2 py-1"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Hasta</label>
                        <input
                            type="date"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="border rounded-md px-2 py-1"
                        />
                    </div>
                    <Button onClick={handleApplyRange}>
                        Aplicar
                    </Button>
                </div>
            </div>
        </div>
    )
}
