import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {FolderSearch} from "lucide-react"
import debounce from "lodash.debounce"


export default function SearchPage(){

    return (<>
        <div className="flex justify-center mt-2 w-full">
            <div className="flex justify-center items-center w-full">
                <FolderSearch className="h-8 w-8"/>
                <Input type="text" placeholder="Find a repository.." className="w-full sm:w-1/2 md:w-1/3 border-black ml-1"/>
            </div>

        </div>
    </>)
}