import { Card, CardContent, CardDescription, CardHeader, CardTitle,CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
export default function HomePageNavBar(){
    return(<>
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-center scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ">Welcome!</CardTitle>
                <CardDescription className='scroll-m-20 text-2xl font-semibold tracking-tight ' >
                    Navigate
                    <Separator/>
                </CardDescription>
            </CardHeader>
        </Card>
     </>)
}