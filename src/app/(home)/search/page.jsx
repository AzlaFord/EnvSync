import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function SearchPage(){

    return (<>
        <div className="flex justify-center mt-2">
            <div className="flex">
                <Input type="text" placeholder="Find a repository.." className="w-svh border-black"/>
                
            </div>
        </div>
    </>)
}