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
    <div className="bg-IXBbg1 text-black h-auto flex flex-col items-center justify-center relative pb-12">
      <div className="maxwidth flex flex-col w-full px-6 md:px-32 space-y-16 mt-8">
        <h2 className="text-2xl font-bold mb-6">Nyheter</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full place-items-center">
          {/* Static news cards */}
          <NewsCard
            image="/Nettside_filler.png"
            title="Vi søker nye styremedlemmer!"
            date="19. August 2025"
            href="/styremedlem"
          />
          <NewsCard
            image="/Nettside_filler.png"
            title="Vi søker frivillige til karrieredag"
            date="20. August 2025"
            href="/frivillig"
          />

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
