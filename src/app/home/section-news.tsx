import NewsCard from "@/components/utils/news-card";

interface NewsItem {
  image: string;
  title: string;
  currentSlug: string;
  _createdAt: string;
}

interface SectionNewsProps {
  data: NewsItem[];
}

export default function SectionNews({ data }: SectionNewsProps) {
  const sortedNews = data.sort(
    (a: NewsItem, b: NewsItem) =>
      new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
  );

  return (
    <div className="w-full bg-IXBbg1 py-12" id="nyheter">
      <div className="maxwidth flex flex-col w-full px-6 md:px-32 space-y-12">
        <h2 className="text-2xl font-bold">Nyheter fra ITxBergen</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full place-items-center">
          {/* Static news cards */}

          {/* Dynamic news from sanity */}
          {sortedNews.map((item) => (
            <NewsCard
              key={item.currentSlug}
              image={item.image}
              title={item.title}
              date={item._createdAt}
              href={item.currentSlug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
