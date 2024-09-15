import { useState, useEffect } from 'react'
import { Plus, Search, ExternalLink, X, Bookmark, ChevronDown, Sparkles } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

const AIBookmarkManagerStylish = () => {
  const [bookmarks, setBookmarks] = useState([])
  const [newBookmark, setNewBookmark] = useState({ name: '', url: '', category: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('aiBookmarks')
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('aiBookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = () => {
    if (newBookmark.name && newBookmark.url && newBookmark.category) {
      setBookmarks([...bookmarks, { ...newBookmark, id: Date.now().toString() }])
      setNewBookmark({ name: '', url: '', category: '' })
      setIsDialogOpen(false)
    }
  }

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id))
  }

  const filteredBookmarks = bookmarks.filter(bookmark => 
    bookmark.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || bookmark.category === filter)
  )

  const categories = ['all', ...new Set(bookmarks.map(bookmark => bookmark.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="container mx-auto p-4 max-w-6xl">
        <header className="mb-12 text-center">
          <motion.h1 
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI Tool Bookmark Manager
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Organize and access your favorite AI tools with style
          </motion.p>
        </header>
        
        <motion.div 
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <Input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add New Tool
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
              <DialogHeader>
                <DialogTitle>Add New AI Tool Bookmark</DialogTitle>
                <DialogDescription>
                  Enter the details of the AI tool you want to bookmark.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newBookmark.name}
                    onChange={(e) => setNewBookmark({...newBookmark, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="url" className="text-right">
                    URL
                  </Label>
                  <Input
                    id="url"
                    value={newBookmark.url}
                    onChange={(e) => setNewBookmark({...newBookmark, url: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={newBookmark.category}
                    onChange={(e) => setNewBookmark({...newBookmark, category: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addBookmark} className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white">
                  Add Bookmark
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredBookmarks.map(bookmark => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span className="truncate text-lg font-semibold text-gray-800 dark:text-gray-100">{bookmark.name}</span>
                      <Button variant="ghost" size="icon" onClick={() => removeBookmark(bookmark.id)} className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
                        <X className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                    <CardDescription className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Bookmark className="h-4 w-4 mr-1" />
                      {bookmark.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{bookmark.url}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full group" onClick={() => window.open(bookmark.url, '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-45 transition-transform duration-300" /> 
                      <span className="group-hover:underline">Open Tool</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AIBookmarkManagerStylish