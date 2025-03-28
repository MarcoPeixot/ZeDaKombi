// src/pages/view-article.tsx
import { useLocation } from 'react-router-dom';
import { Navbar } from "../components/ui/navbar";
import { Button } from "../components/ui/button";
import { Download, ExternalLink, FileText, Share2 } from "lucide-react";

interface Article {
  titulo: string;
  autor: string;
  ipfs_hash: string;
}

export default function ViewArticlePage() {
  const location = useLocation();
  const { article } = location.state as { article: Article };

  if (!article) {
    return <div>Article not found</div>;
  }

  const extractCIDFromUrl = (url: string) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const handleDownload = () => {
    if (!article.ipfs_hash) return;
    window.open(`/download/${extractCIDFromUrl(article.ipfs_hash)}`, '_blank');
  };

  const handleOpenInIPFS = () => {
    if (!article.ipfs_hash) return;
    window.open(article.ipfs_hash, '_blank');
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-2">Research Article</h1>
          <p className="text-secondary">Detailed view of the research publication</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-blue-600" />
              <div>
                <h2 className="font-medium">{article.titulo}</h2>
                <div className="text-sm text-secondary">
                  CID: {extractCIDFromUrl(article.ipfs_hash)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button 
                className="gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={handleOpenInIPFS}
              >
                <ExternalLink className="h-4 w-4" />
                Open in IPFS
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-6 mb-6 bg-white">
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
              <h3 className="font-medium text-lg">Details</h3>
              <div className="text-sm text-secondary">Published on Blockchain</div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Author</h4>
              <p>{article.autor}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Research</span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Blockchain</span>
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">IPFS</span>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="font-medium">{article.titulo}.pdf</span>
              </div>
              <div className="text-sm text-gray-500">IPFS Document</div>
            </div>

            <div className="h-[600px] bg-white p-4 flex items-center justify-center">
              <div className="text-center">
                <iframe 
                  src={`https://docs.google.com/gview?url=${article.ipfs_hash}&embedded=true`}
                  className="w-full h-[500px] border shadow-sm"
                  title="Document Preview"
                ></iframe>
                <p className="text-secondary mb-4">Document Preview</p>
                <Button onClick={handleDownload}>View Full Document</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}