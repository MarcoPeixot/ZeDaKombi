// src/pages/submit-ipfs.tsx
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Navbar } from "../../components/ui/navbar";
import { Button } from "../../components/ui/button";
import { Upload, FileText, Plus } from "lucide-react";
import { submitArticle } from '../../services/api-artigo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { useUser } from '../../context/user-context';

export default function SubmitArticlePage() {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [tags, setTags] = useState<string[]>(['Blockchain', 'Research']);
  const [newTag, setNewTag] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success?: boolean,
    ipfs_url?: string,
    txHash?: string,
    error?: string
  } | null>(null);
  const [userInfo, setUserInfo] = useState<{ name: string, email: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { userType } = useUser();

  // Buscar informações do usuário ao carregar o componente
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const response = await fetch(`https://zedakombi-1.onrender.com/usuarios/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserInfo({ name: data.name, email: data.email });
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !title) {
      setSubmissionResult({
        success: false,
        error: file ? 'Title is required' : 'File is required'
      });
      return;
    }

    if (!userInfo?.name) {
      setSubmissionResult({
        success: false,
        error: 'User information not available. Please log in again.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const formData = new FormData();
      formData.append('titulo', title);
      formData.append('autor', userInfo.name); // Usa o nome do usuário logado
      formData.append('email', userInfo.email); // Adiciona o email do usuário
      formData.append('arquivo', file);
      formData.append('abstract', abstract);
      formData.append('tags', JSON.stringify(tags));

      const result = await submitArticle(formData, token || undefined);

      if (result.success) {
        setSubmissionResult(result);
        // Redirecionar após 3 segundos
        setTimeout(() => {
          navigate(userType === 'pesquisador' ? '/researcher-feed' : '/entrepreneur-feed');
        }, 3000);
      } else {
        setSubmissionResult({
          success: false,
          error: result.error || 'Failed to submit article'
        });
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      setSubmissionResult({
        success: false,
        error: error.response?.data?.error || error.message || 'Unknown error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Submit New Article</h1>
            <p className="text-gray-500">
              {userInfo?.name && `Submitting as: ${userInfo.name}`}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="title" className="block mb-2 font-medium">Article Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter the full title of your article"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="abstract" className="block mb-2 font-medium">Abstract</label>
                <textarea
                  id="abstract"
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  rows={5}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Write a concise summary of your article"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Add new tag"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    className="rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Article File</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.docx,.tex"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2 font-medium">
                    {file ? file.name : 'Drag and drop your file here'}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <Button type="button">
                    <FileText className="h-4 w-4 mr-2" />
                    Select File
                  </Button>
                  <p className="mt-4 text-sm text-gray-500">
                    Supported formats: PDF, DOCX, LaTeX (.tex) – Maximum 20MB
                  </p>
                </div>
              </div>

              {submissionResult && (
                <div className={`mb-6 p-4 rounded-lg ${submissionResult.success
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}>
                  {submissionResult.success ? (
                    <>
                      <p>Article submitted successfully!</p>
                      {submissionResult.ipfs_url && (
                        <p>IPFS URL: <a href={submissionResult.ipfs_url} target="_blank" rel="noopener noreferrer" className="underline">
                          {submissionResult.ipfs_url}
                        </a></p>
                      )}
                      {submissionResult.txHash && (
                        <p>Transaction Hash: {submissionResult.txHash}</p>
                      )}
                    </>
                  ) : (
                    <p>Error: {submissionResult.error || 'Failed to submit article'}</p>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !file || !title}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </span>
                  ) : 'Publish Article'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}