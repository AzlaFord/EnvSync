'use client'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, Copy,Trash2,EyeOff,Star,Eye, Plus, Key,Download } from "lucide-react"

export default function KeysSection({repositoryName,}){
    const [envKeys, setEnvKeys] = useState([
        {
        id: "1",
        key: "DATABASE_URL",
        value: "postgresql://user:pass@localhost:5432/mydb",
        },
        { id: "2", key: "API_SECRET_KEY", value: "sk_live_abc123def456ghi789" },
        { id: "3", key: "REDIS_URL", value: "redis://localhost:6379" },
    ])
    const [isAddingKey, setIsAddingKey] = useState(false)
    const [newKey, setNewKey] = useState({ key: "", value: "" })
    const [visibleKeys, setVisibleKeys] = useState(new Set())

    const handleAddKey = () => {
        if (newKey.key && newKey.value) {
        setEnvKeys([
            ...envKeys,
            {
            id: Date.now().toString(),
            ...newKey,
            },
        ])
        setNewKey({ key: "", value: "" })
        setIsAddingKey(false)
        }
    }
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
        try {
        await navigator.clipboard.writeText(value)
        } catch (err) {
            const textArea = document.createElement("textarea")
            textArea.value = value
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand("copy")
            document.body.removeChild(textArea)
        }
    }
    const downloadEnvFile = () => {
        const envContent = envKeys.map((key) => `${key.key}=${key.value}`).join("\n")
        const blob = new Blob([envContent], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${repositoryName}.env`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }
    return(<>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Environment Keys
            </CardTitle>
            <div className="flex gap-2">
              {envKeys.length > 0 && (
                <Button variant="outline" size="sm" onClick={downloadEnvFile}>
                  <Download className="h-4 w-4 mr-2" />
                  Download .env
                </Button>
              )}
              <Dialog open={isAddingKey} onOpenChange={setIsAddingKey}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Key
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Environment Key</DialogTitle>
                    <DialogDescription>Add a new environment variable for this repository.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="key">Key Name</Label>
                      <Input
                        id="key"
                        placeholder="e.g., DATABASE_URL"
                        value={newKey.key}
                        onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="value">Value</Label>
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
                      <Button onClick={handleAddKey}>Add Key</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {envKeys.length === 0 ? (
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
              {envKeys.map((envKey) => (
                <div key={envKey.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="font-mono text-sm font-semibold">{envKey.key}</code>
                      <Badge variant="outline" className="text-xs">
                        {visibleKeys.has(envKey.id) ? "Visible" : "Hidden"}
                      </Badge>
                    </div>
                    <code className="text-xs text-muted-foreground font-mono">
                      {visibleKeys.has(envKey.id) ? envKey.value : "•".repeat(Math.min(envKey.value.length, 20))}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility(envKey.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {visibleKeys.has(envKey.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(envKey.value)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteKey(envKey.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

    </>)
}