"use client";

import React from "react";
import EventCard from "@/components/utils/event-card";
import NewsCard from "@/components/utils/news-card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      {/* Event Cards Section */}
      <div className="flex flex-col space-y-4">
        <EventCard
          title="Event 1"
          date="January 20, 2025"
          address="123 Example Street, Cityville"
        />
        <EventCard
          title="Event 2"
          date="February 15, 2025"
          address="456 Another Road, Townland"
        />
        <EventCard
          title="Event 3"
          date="March 10, 2025"
          address="789 Different Ave, Villagetown"
        />
      </div>

      {/* News Cards Section */}
      <div className="flex space-x-4">
        <NewsCard
          image="/fuckup.png"
          title="News Article 1"
          date="January 5, 2025"
        />
        <NewsCard
          image="/fuckup.png"
          title="News Article 2"
          date="February 10, 2025"
        />
        <NewsCard
          image="/fuckup.png"
          title="News Article 3"
          date="March 15, 2025"
        />
      </div>
    </div>
  );
}
