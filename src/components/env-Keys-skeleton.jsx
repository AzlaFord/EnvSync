'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Key,Plus} from "lucide-react"

export default function EnvSkeleton(){
    return (<>
        <Card >
            <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Environment Keys
                </CardTitle>
            </div>
            </CardHeader>
            <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                    <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No environment keys configured</p>
                    <p className="text-sm mb-4">Add environment variables to configure your repository</p>
                    <Button onClick={() => setIsAddingKey(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Key
                    </Button>
                </div>
            </CardContent>
        </Card>
    </>)
}