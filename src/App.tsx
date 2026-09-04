import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { BlogPage } from '@/pages/BlogPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { captureSource } from '@/lib/source-tracking';
import './App.css';

function App() {
  useEffect(() => {
    captureSource();
  }, []);

  return (
    <BrowserRouter>
      <div className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
