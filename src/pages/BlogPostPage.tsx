import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { blogApi } from '@/services/api';
import type { BlogPost } from '@/types';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        const postData = await blogApi.getBySlug(slug);

        if (!postData) {
          navigate('/blog');
          return;
        }

        setPost(postData);

        const related = await blogApi.getRelated(postData.id, 3);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Error loading blog post:', error);
        navigate('/blog');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      showToast({
        type: 'success',
        title: 'Link copiado!',
        message: 'Link copiado para a área de transferência',
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      showToast({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível copiar o link',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!post) return null;

  const publishDate = new Date(post.publishedAt).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="border-b border-neutral-800 bg-background-elevated sticky top-16 lg:top-20 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar para o blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background-elevated rounded-2xl p-8 md:p-12 border border-neutral-800 shadow-2xl"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-brand-500/20 text-brand-400 rounded-full text-sm font-medium">
                {post.category.name}
              </span>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>{publishDate}</time>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min de leitura</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-neutral-100 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-neutral-400 leading-relaxed mb-8">{post.excerpt}</p>

            {/* Author & Share */}
            <div className="flex items-center justify-between pt-6 border-t border-neutral-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center">
                  <span className="text-brand-400 font-semibold text-lg">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-neutral-100">{post.author.name}</p>
                  <p className="text-sm text-neutral-500">{post.author.role}</p>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-invert prose-brand max-w-none
              prose-headings:text-neutral-100 prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-brand-400 prose-strong:font-semibold
              prose-ul:text-neutral-300 prose-ul:space-y-2
              prose-li:marker:text-brand-500
              prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline
            "
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-800">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-neutral-500">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neutral-800 text-neutral-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-neutral-100 mb-8">Artigos Relacionados</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block bg-background-elevated rounded-xl overflow-hidden border border-neutral-800 hover:border-brand-500/50 transition-all"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-brand-400 font-medium">
                      {relatedPost.category.name}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-100 mt-2 mb-2 group-hover:text-brand-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Clock className="w-3 h-3" />
                      <span>{relatedPost.readTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
