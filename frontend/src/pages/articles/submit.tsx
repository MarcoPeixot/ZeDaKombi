import { Navbar } from "../../components/ui/navbar"
import { Button } from "../../components/ui/button"
import { Upload, FileText, Plus } from "lucide-react"

export default function SubmitArticlePage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Submit New Article</h1>
            <p className="text-gray-500">Share your research with the community and interested entrepreneurs</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <form>
              <div className="mb-6">
                <label htmlFor="title" className="block mb-2 font-medium">Article Title</label>
                <input
                  type="text"
                  id="title"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter the full title of your article"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="abstract" className="block mb-2 font-medium">Abstract</label>
                <textarea
                  id="abstract"
                  rows={5}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Write a concise summary of your article"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                    Blockchain
                    <button className="ml-2 hover:text-red-500">×</button>
                  </span>
                  <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                    Research
                    <button className="ml-2 hover:text-red-500">×</button>
                  </span>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Add new tag"
                  />
                  <Button className="rounded-l-none">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Article File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
                  <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2 font-medium">Drag and drop your file here</p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Select File
                  </Button>
                  <p className="mt-4 text-sm text-gray-500">
                    Supported formats: PDF, DOCX, LaTeX (.tex) – Maximum 20MB
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Save Draft</Button>
                <Button>Publish Article</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
