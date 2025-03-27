import { Navbar } from "../../components/ui/navbar"
import { Button } from "../../components/ui/button"
import { Image, Link, Plus } from "lucide-react"

export default function CreatePostPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-2">Create New Post</h1>
          <p className="text-secondary">Share updates, discoveries, or announcements with the community</p>
        </div>

        <div className="card">
          <form>
            <div className="mb-6">
              <textarea
                rows={5}
                className="w-full p-4 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="What would you like to share today?"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="tag flex items-center">
                  AI
                  <button className="ml-1 text-secondary hover:text-danger">×</button>
                </span>
                <span className="tag flex items-center">
                  Research
                  <button className="ml-1 text-secondary hover:text-danger">×</button>
                </span>
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 p-3 border border-input rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add new tag"
                />
                <Button className="rounded-l-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="gap-2">
                  <Image className="h-4 w-4" />
                  Add Image
                </Button>
                <Button variant="outline" className="gap-2">
                  <Link className="h-4 w-4" />
                  Add Link
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm">Link to a published article</span>
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Save Draft</Button>
              <Button>Publish</Button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

