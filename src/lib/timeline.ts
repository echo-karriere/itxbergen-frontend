interface TimelineItem {
  title: string;
  time: string;
  description: string;
  overlap?: boolean;
}

export const karrieredagTimeline: TimelineItem[] = [
  {
    title: "Dørene åpner for studenter",
    time: "09:30 - 10:00",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    title: "Ballongslipp",
    time: "10:00 - 10:15",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    title: "Lynpresentasjoner",
    time: "10:15 - 11:30",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    title: "Paneldebatt",
    time: "11:30 - 12:15",
    description: "Lorem ipsum dolor sit amet.",
    overlap: true,
  },
  {
    title: "Besøk bedriftene på stand",
    time: "11:30 - 16:00",
    description: "Lorem ipsum dolor sit amet.",
    overlap: true,
  },
  {
    title: "Workshop 1",
    time: "12:30 - 13:30",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    title: "Workshop 2",
    time: "13:30 - 14:30",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    title: "Workshop 3",
    time: "14:30 - 15:30",
    description: "Lorem ipsum dolor sit amet.",
  },
];
