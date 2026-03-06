import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { blogPosts } from '@/blog/posts';
import { Navigation } from '@/components/Navigation';

export function BlogPage() {
  return (
    <div className="relative">
      <Navigation />
      <main className="relative pt-24 pb-20 min-h-screen bg-clinical">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h1 className="font-display text-display-md text-foreground mb-4">
              Insights & Resources
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              Expert perspectives on neurology litigation, expert witness standards,
              and medical-legal consulting for attorneys.
            </p>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="bg-white rounded-2xl p-8 shadow-xs hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-clinical-200">
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

                  <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-electric transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-text-secondary leading-relaxed mb-4">
                    {post.metaDescription}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.keywords.slice(0, 3).map((kw) => (
                        <span
                          key={kw}
                          className="flex items-center gap-1 text-xs px-2.5 py-1 bg-electric/5 text-electric rounded-full"
                        >
                          <Tag size={10} />
                          {kw}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-electric opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
