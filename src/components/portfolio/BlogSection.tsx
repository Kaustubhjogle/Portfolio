import { useInfiniteQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { DEV_PROFILE_URL, DEV_USERNAME } from "@/utils/Links";

interface DevArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_timestamp: string;
  reading_time_minutes: number;
}

const postDate = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeZone: "UTC",
});

const PAGE_SIZE = 3;

async function fetchDevArticles(page: number, signal: AbortSignal): Promise<DevArticle[]> {
  const parameters = new URLSearchParams({
    username: DEV_USERNAME,
    page: String(page),
    per_page: String(PAGE_SIZE),
  });
  const response = await fetch(`https://dev.to/api/articles?${parameters}`, { signal });
  if (!response.ok) throw new Error("Could not load DEV posts");
  const articles = await response.json();
  if (!Array.isArray(articles)) throw new Error("Unexpected DEV response");
  return articles;
}

export default function BlogSection() {
  const { data, isPending, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isFetchNextPageError } = useInfiniteQuery({
    queryKey: ["dev-articles", DEV_USERNAME],
    queryFn: ({ pageParam, signal }) => fetchDevArticles(pageParam, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPage.length === PAGE_SIZE ? lastPageParam + 1 : undefined,
    staleTime: 15 * 60 * 1000,
    retry: 1,
  });
  const articles = data && [...new Map(data.pages.flat().map((article) => [article.id, article])).values()];

  return (
    <section id="blog" className="portfolio-panel" aria-labelledby="blog-heading">
      <h2 id="blog-heading"><a href="#blog">Blog</a></h2>
      <div id="blog-post-list" className="portfolio-body portfolio-projects">
        {isPending && <p className="portfolio-muted" role="status">Loading posts from DEV…</p>}
        {isError && !articles && <p className="portfolio-muted" role="status">Posts are temporarily unavailable here.</p>}
        {articles?.length === 0 && <p className="portfolio-muted">No published posts yet.</p>}
        {articles?.map((article) => (
          <article key={article.id} className={article.cover_image ? "portfolio-project" : "portfolio-project portfolio-blog-text-only"}>
            {article.cover_image && (
              <div className="portfolio-project-media portfolio-blog-cover">
                <img src={article.cover_image} alt="" loading="lazy" decoding="async" />
              </div>
            )}
            <div className="portfolio-project-details">
              <h3>
                <a className="portfolio-link" href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title} <ArrowUpRight aria-hidden="true" />
                </a>
              </h3>
              <p className="portfolio-blog-meta portfolio-muted">
                <time dateTime={article.published_timestamp}>{postDate.format(new Date(article.published_timestamp))}</time>
                {article.reading_time_minutes > 0 && <span>{article.reading_time_minutes} min read</span>}
              </p>
              {article.description && <p className="portfolio-muted">{article.description}</p>}
            </div>
          </article>
        ))}
        <p>
          <a className="portfolio-link" href={DEV_PROFILE_URL} target="_blank" rel="noopener noreferrer">
            View all posts on DEV <ArrowUpRight aria-hidden="true" />
          </a>
        </p>
      </div>
      {isFetchNextPageError && (
        <p className="portfolio-body portfolio-muted" role="status">Couldn’t load more posts. You can try again.</p>
      )}
      {hasNextPage && (
        <div className="portfolio-project-toggle">
          <button type="button" aria-controls="blog-post-list" disabled={isFetchingNextPage}
            onClick={() => void fetchNextPage()}>
            {isFetchingNextPage ? "Loading more posts…" : "View more"}
          </button>
        </div>
      )}
    </section>
  );
}
