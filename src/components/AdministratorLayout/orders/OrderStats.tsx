import { type LucideIcon } from "lucide-react";

interface Props{
    title: string;
    stat: number | string | undefined;
    Icon: LucideIcon
}

export default function OrderStats({ Icon, stat, title }: Props) {
    return (
        <article className={`flex items-center justify-around gap-x-1 border-2 border-gray-300 p-1 rounded-xl font-semibold h-25
            ${title.includes('totales') && 'bg-blue-100'} ${title.includes('pendientes') && 'bg-red-100'} 
            ${title.includes('proceso') && 'bg-yellow-100'} ${title.includes('completadas') && 'bg-green-100'} `}
        >
            <section className="flex justify-center items-center">
                <Icon size='40' />
            </section>
            <section className="flex flex-col justify-center">
                <h1 className="font-semibold capitalize" >{title}</h1>
                <p className="text-center font-bold text-lg">{stat}</p>
            </section>
        </article>
    )
}
