import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { BlogPage } from '@/pages/BlogPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { captureSource } from '@/lib/source-tracking';
import './App.css';

/** Router-agnostic routes: main.tsx wraps them in BrowserRouter, entry-server.tsx in StaticRouter. */
export function AppRoutes() {
  useEffect(() => {
    captureSource();
  }, []);

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </div>
  );
}
