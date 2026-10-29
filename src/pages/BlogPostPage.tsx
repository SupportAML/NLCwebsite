import { type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';
import { blogPosts } from '@/blog/posts';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { SEO, BlogPostingSchema, BreadcrumbSchema } from '@/components/SEO';

/** Inline markdown: **bold**, *italic*, and [text](/internal-or-https-link). */
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g);
  return parts.map((part, j) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={j} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith('/') ? (
        <Link key={j} to={href} className="text-electric underline underline-offset-2 hover:text-electric/80">
          {label}
        </Link>
      ) : (
        <a key={j} href={href} target="_blank" rel="noopener" className="text-electric underline underline-offset-2 hover:text-electric/80">
          {label}
        </a>
      );
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      return <em key={j}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function renderMarkdown(content: string) {
  // Simple markdown renderer for blog posts: ##/### headings, -/* and 1. lists,
  // --- rules, whole-line italic disclaimers, paragraphs with inline formatting.
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let key = 0;
  let list: { ordered: boolean; items: ReactNode[] } | null = null;

  const flushList = () => {
    if (!list) return;
    const items = list.items.map((item, j) => (
      <li key={j} className="text-text-secondary leading-relaxed pl-1">
        {item}
      </li>
    ));
    elements.push(
      list.ordered ? (
        <ol key={key++} className="list-decimal pl-6 mb-4 space-y-2">{items}</ol>
      ) : (
        <ul key={key++} className="list-disc pl-6 mb-4 space-y-2">{items}</ul>
      ),
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);

    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (list && list.ordered !== ordered) flushList();
      if (!list) list = { ordered, items: [] };
      list.items.push(renderInline((numbered ?? bullet)![1]));
      continue;
    }
    flushList();

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="font-display text-xl font-bold text-foreground mt-8 mb-3">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="font-display text-2xl font-bold text-foreground mt-10 mb-4"
        >
          {renderInline(line.slice(3))}
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
      elements.push(
        <p key={key++} className="text-text-secondary leading-relaxed mb-4">
          {renderInline(line)}
        </p>
      );
    }
  }
  flushList();

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

  const moreReading = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="relative">
      <SEO
        title={post.title}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
      />
      <BlogPostingSchema
        title={post.title}
        description={post.metaDescription}
        date={post.date}
        slug={post.slug}
        author={post.author}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
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
                {new Date(post.date).toLocaleDateString('en-US', { timeZone: 'UTC',
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

          {/* More reading — internal links between posts */}
          {moreReading.length > 0 && (
            <div className="mt-16 pt-10 border-t border-clinical-200">
              <h2 className="font-display text-xl font-bold text-foreground mb-5">
                Continue Reading
              </h2>
              <div className="space-y-3">
                {moreReading.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group flex items-start gap-3 bg-white border border-clinical-200 rounded-xl p-4 hover:shadow-md transition-all"
                  >
                    <ArrowRight size={16} className="text-electric shrink-0 mt-1" />
                    <span className="text-sm font-medium text-foreground group-hover:text-electric transition-colors">
                      {p.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
