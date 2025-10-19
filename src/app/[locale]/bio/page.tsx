import PhotoHero from "@/components/heroes/PhotoHero";

export default function BioPage() {
  return (
    <>
      <section>
        <PhotoHero
          title="Creative Insights & Design Journeys —"
          subtitle="Welcome to my Thoughts, where you'll get an inside look at my latest projects and product ideas. Explore, discover, and stay updated on what my team and I have been working on recently."
          backgroundImage="/assets/backgrounds/abstract_neutral_1.jpg"
          photo="/assets/images/photos/photo_1.jpg"
          link="#documentation"
        />
      </section>

      <section>
        <h1>Bio</h1>
        <p>
          Welcome to my Thoughts, where you&apos;ll get an inside look at my
          latest projects and product ideas. Explore, discover, and stay updated
          on what my team and I have been working on recently.
        </p>
      </section>
    </>
  );
}
