import { type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { blogPosts } from '@/blog/posts';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';

function renderMarkdown(content: string) {
  // Simple markdown renderer for blog posts
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="font-display text-2xl font-bold text-foreground mt-10 mb-4"
        >
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('---')) {
      elements.push(<hr key={key++} className="my-8 border-clinical-200" />);
    } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      elements.push(
        <p key={key++} className="text-sm text-text-secondary italic mt-4">
          {line.replace(/^\*|\*$/g, '')}
        </p>
      );
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      // Process inline bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={j} className="font-semibold text-foreground">
              {part.replace(/\*\*/g, '')}
            </strong>
          );
        }
        return part;
      });

      elements.push(
        <p key={key++} className="text-text-secondary leading-relaxed mb-4">
          {rendered}
        </p>
      );
    }
  }

  return elements;
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="relative">
        <Navigation />
        <main className="relative pt-24 pb-20 min-h-screen bg-clinical">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h1 className="font-display text-display-md text-foreground mb-4">
              Post Not Found
            </h1>
            <Link to="/blog">
              <Button className="bg-electric hover:bg-electric/90 text-white rounded-full">
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navigation />
      <main className="relative pt-24 pb-20 min-h-screen bg-clinical">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-electric transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to all posts
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>·</span>
              <span>{post.author}</span>
            </div>

            <h1 className="font-display text-display-md text-foreground mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {post.keywords.map((kw) => (
                <span
                  key={kw}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 bg-electric/5 text-electric rounded-full"
                >
                  <Tag size={10} />
                  {kw}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="prose-nlc">{renderMarkdown(post.content)}</div>

          {/* CTA */}
          <div className="mt-16 bg-navy rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Need a Neurology Expert for Your Case?
            </h3>
            <p className="text-slate-300 mb-6 max-w-lg mx-auto">
              Our board-certified neurologists are available for case review,
              expert testimony, and independent medical examinations nationwide.
            </p>
            <Link to="/#contact">
              <Button className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-transform hover:-translate-y-0.5">
                Request a Consult
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
