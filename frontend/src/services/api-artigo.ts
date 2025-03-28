// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // ou sua URL de produção

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitArticle = async (formData: FormData, token?: string) => {
  try {
    const config = token ? {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    } : {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post(`${API_BASE_URL}/artigos`, formData, config);
    return response.data;
  } catch (error) {
    console.error('Error submitting article:', error);
    throw error;
  }
};

export const fetchArticles = async () => {
  try {
    const response = await api.get('/artigos');
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const fetchArticleByIndex = async (index: number) => {
  try {
    const response = await api.get(`/artigos/${index}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }

  
};

export const fetchResearchPosts = async () => {
  try {
    // Primeiro buscamos os artigos da blockchain
    const articlesResponse = await api.get('/artigos');
    const articles = articlesResponse.data;
    
    // Transformamos em posts para o feed
    const posts = articles.map((article: any, index: number) => ({
      id: index,
      author: {
        name: article.autor || "Autor Desconhecido",
        avatar: article.autor ? article.autor.charAt(0) : "A",
        institution: "Instituição não especificada",
      },
      timeAgo: "Publicado recentemente", // Você pode adicionar datas reais
      content: `Novo artigo publicado: "${article.titulo}"`,
      tags: ["Research", "Blockchain"], // Tags padrão ou pode extrair do artigo
      likes: 0, // Pode implementar sistema de likes depois
      comments: 0, // Pode implementar comentários depois
      hasArticle: true,
      articleData: article, // Mantemos os dados completos do artigo
    }));
    
    return posts;
  } catch (error) {
    console.error('Error fetching research posts:', error);
    throw error;
  }
};