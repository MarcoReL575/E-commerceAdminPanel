import { 
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function PaginationComponent({ currentPage, onPageChange, totalPages }: Props) {

    const getPages = ()=> {
        const pages: (number | 'ellipsis')[] = []
        const delta = 1
       
        const start = currentPage - delta
        const end = currentPage + delta

        for(let i = 1; i <= totalPages; i++) {
            if(i === 1 || i === totalPages || (i >= start && i <= end )) {
                pages.push(i)
            } else if(i === start - 1 || i === end + 1){
                pages.push('ellipsis')
            }
        }

        return pages.filter((item, pos, self)=> self.indexOf(item) === pos)
    };

    const pages = getPages()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
            <PaginationPrevious
                onClick={() => currentPage > 1 && onPageChange(currentPage -1)}
                className={currentPage === 1 ? ' pointer-events-none opacity-50': ''}
            />
        </PaginationItem>
        {pages.map((page, index) =>
            page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
                <PaginationLink
                    isActive={page === currentPage}
                    onClick={()=> onPageChange(page)}
                >
                {page}
                </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem >
            <PaginationNext 
                className={currentPage === totalPages ? 'cursor-pointer hover:bg-white': '' }
                onClick={() => currentPage < totalPages && onPageChange(currentPage +1)}
            />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
