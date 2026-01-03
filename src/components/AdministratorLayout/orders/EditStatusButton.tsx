import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { editStatus } from "@/services/edit-status-service";
import type { Status } from "@/types/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function EditStatusButton({ orderId }: {orderId: string | undefined}) {
    const queryClient = useQueryClient()

    const handleEditStatus = async(option: Status) => {
        if(!orderId) return 
        await editStatus(option, orderId)
        queryClient.invalidateQueries({ queryKey: ['orders'] });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Editar</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={()=> handleEditStatus('proceso')}>
                        En Proceso
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> handleEditStatus('completado')}>
                        Completado
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> handleEditStatus('pendiente')}>
                        Pendiente
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
