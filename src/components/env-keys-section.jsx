'use client'
import { saveAs } from 'file-saver';
import copy from 'copy-to-clipboard';
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Key,Plus,Copy,Trash2,Download,EyeOff ,Eye} from "lucide-react"

const handleGetKeys = async (repo_full_name) =>{
  const res = await fetch("/api/getKeys",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({repo_full_name})
  })
  const json = await res.json()
  return json
}


const handleAddKey = async (repoId,user_id,newKey,repositoryName) => {

  const res = await fetch('/api/addKey',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({repoId,user_id,secrets:newKey,repo_full_name:repositoryName})
  })
  if(!res.ok) return null
  return await res.json()
}

export default function KeysSection({repositoryName,repositoryId,userId}){
    const [envKeys, setEnvKeys] = useState([])
    const [isAddingKey, setIsAddingKey] = useState(false)
    const [newKey, setNewKey] = useState({ key: "", value: "" })
    const [visibleKeys, setVisibleKeys] = useState(new Set())

    const {data:keys,error,isLoading} = useQuery({
      queryKey:['keys', repositoryName],
      queryFn: () => handleGetKeys(repositoryName)
    })
    
    const handleDeleteKey = (id) => {
        setEnvKeys(envKeys.filter((key) => key.id !== id))
        setVisibleKeys((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
        })
    }

    const toggleKeyVisibility = (id) => {
        setVisibleKeys((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(id)) {
            newSet.delete(id)
        } else {
            newSet.add(id)
        }
        return newSet
        })
    }

    const copyToClipboard = async (value) => {
      copy(value);
    }

    const downloadEnvFile = () => {
      setEnvKeys(keys?.data)
      const envContent = envKeys.map((key) => `${key.key_name}=${key.value}`).join("\n");
      const blob = new Blob([envContent], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `${repositoryName}.env`);
    }

    return(<>
      <Card >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Environment Keys
            </CardTitle>
            <div className="flex gap-2">
              <Dialog open={isAddingKey} onOpenChange={setIsAddingKey}>
                {keys?.data?.length > 0?(
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Key
                  </Button>
                </DialogTrigger>
                ):(
                <DialogTrigger asChild className="hidden">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Key
                  </Button>
                </DialogTrigger>
                )}
                <DialogContent>
                  <DialogHeader className=' ml-1 mb-1' >
                    <DialogTitle>Add Environment Key</DialogTitle>
                    <DialogDescription>Add a new environment variable for this repository.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className=' ml-1 mb-3' htmlFor="key">Key Name</Label>
                      <Input
                        id="key"
                        placeholder="e.g., DATABASE_URL"
                        value={newKey.key}
                        onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className='ml-1 mb-3' htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        placeholder="Enter the value"
                        value={newKey.value}
                        onChange={(e) => setNewKey({ ...newKey, value: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddingKey(false)}>
                        Cancel
                      </Button>
                      <Button onClick={async () => {
                          const res = await handleAddKey(repositoryId,userId,newKey,repositoryName);
                          if (res) {
                            setNewKey({ key: "", value: "" });
                          }}}>Add Key</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {keys?.data?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No environment keys configured</p>
              <p className="text-sm mb-4">Add environment variables to configure your repository</p>
              <Button onClick={() => setIsAddingKey(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Key
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {keys?.data?.map((key) => (
                <div key={key.id} className="flex items-end justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="ml-2 font-mono text-sm font-semibold text-shadow-lg ">Key:{key.key_name}</code>
                    </div>
                    <Separator className='my-2'/>
                    <code className="inline-flex bg-muted relative rounded  py-1 font-mono text-sm font-semibold w-[99%]  ">
                      {visibleKeys.has(key.id) ? <div className="  ml-1 relative rounded pl-1 py-1 font-mono text-sm font-semibold border-2 border-dashed w-8/9 overflow-hidden bg-gray-500/16">
                      <p className="w-full min-w-20 truncate"> 
                        {key.value}
                      </p> 
                      </div>
                      : <div className="ml-1 bg-gray-500/16 relative rounded  py-1 font-mono text-muted-foreground text-sm font-semibold border-2 border-dashed overflow-hidden w-8/9 pl-1">  Key Value</div>}
                      <div className="flex items-top gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(key.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                        {visibleKeys.has(key.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(key.value)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteKey(key.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </code>
                  </div>
                </div>
              ))}
            </div>
          )}
          {keys?.data?.length > 0 && (
            <Button variant="outline" className="flex justify-end mt-3 " size="sm" onClick={downloadEnvFile}>
              <Download className="h-4 w-4 mr-2" />
              Download .env
            </Button>
          )}
        </CardContent>
      </Card>

    </>)
}