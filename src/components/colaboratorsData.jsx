import { Card, CardContent, CardDescription, CardHeader, CardTitle,CardFooter } from "@/components/ui/card"
import { Avatar,AvatarFallback,AvatarImage } from "@radix-ui/react-avatar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"


export default function DataColab(colabs){
    return (<>

        <div className="grid grid-cols-7 gap-4 mt-3 ">
            {colabs?.colabs?.map((colab) => (
                <a key={colab?.node?.login} href={`https://github.com/${colab?.node?.login}`}>
                    <Card className='h-12 pt-6 justify-center hover-chart-2 transition-colors'  >
                        <CardHeader className="flex items-center gap-4">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={colab?.node?.avatarUrl} alt={name} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{colab?.node?.login}</span>
                                <span className="truncate text-xs">{colab?.node?.name}</span>
                            </div>
                        </CardHeader>
                    </Card>        
                </a>
            ))}
        </div>
    </>)
}
