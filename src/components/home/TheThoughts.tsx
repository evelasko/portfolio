import MainHeading from "../headings/MainHeading";
import ThoughtCard from "../cards/ThoughtCard";

export default function TheThoughts() {
  const thoughts = [
    {
      title: "The Future of Web Design: Embracing Minimalism and Functionality",
      publishedAt: "Oct 5, 2025",
      readingTime: 5,
      image: "/assets/images/thoughts/thought_1.jpg",
      link: "/thoughts/future-web-design",
    },
    {
      title: "Building Scalable Design Systems: Lessons from the Field",
      publishedAt: "Sep 28, 2025",
      readingTime: 8,
      image: "/assets/images/thoughts/thought_2.jpg",
      link: "/thoughts/scalable-design-systems",
    },
    {
      title: "The Art of Creative Problem Solving in UX Design",
      publishedAt: "Sep 15, 2025",
      readingTime: 6,
      image: "/assets/images/thoughts/thought_3.jpg",
      link: "/thoughts/creative-problem-solving",
    },
    {
      title: "Why Motion Design Matters in Modern User Interfaces",
      publishedAt: "Sep 1, 2025",
      readingTime: 4,
      image: "/assets/images/thoughts/thought_4.jpg",
      link: "/thoughts/motion-design-matters",
    },
  ];

  return (
    <section id="the-thoughts" className="py-12 m:py-16 l:py-20 bg-white-90">
      <div className="container mx-auto px-4 m:px-8 l:px-12">
        <MainHeading
          title="The Thoughts"
          className="text-center mb-12 m:mb-16 l:mb-20"
        />

        <div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-2 gap-6 m:gap-8 l:gap-10">
          {thoughts.map((thought, index) => (
            <ThoughtCard
              key={index}
              title={thought.title}
              publishedAt={thought.publishedAt}
              readingTime={thought.readingTime}
              image={thought.image}
              link={thought.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
