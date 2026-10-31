
type Feature = {
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    title: "Expert-Led Courses & Workshops",
    description:
      "Learn from practitioners through structured video courses and interactive live workshops.",
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor course completion, study streaks, and deadlines from a single dashboard.",
  },
  {
    title: "Learn with a Community",
    description:
      "Ask questions, share work, and get feedback from peers and mentors.",
  },
  {
    title: "Build Job-Ready Skills",
    description:
      "Follow curated learning paths aligned with real hiring requirements.",
  },
  {
    title: "Get Certified",
    description:
      "Earn verifiable certificates to showcase to employers on completion.",
  },
  {
    title: "Simple Subscription",
    description:
      "Access the full course catalog with flexible monthly or yearly billing.",
  },
];

const Features = () => {
  return (
    <section className="relative py-10 md:py-14 lg:py-28 overflow-hidden bg-secondary dark:bg-background">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />

      <div className="relative container px-4 md:px-8 lg:px-20 mx-auto">
        <div className="max-w-2xl mb-16">
          <h2 className="mb-3 text-lg font-bold md:text-2xl">
            Everything you need to learn and grow
          </h2>
          <p className="max-w-xl text-muted-foreground text-balance">
            Courses, progress tracking, and certification in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature: Feature) => {
            return (
              <div key={feature.title}>
                <h3 className="mb-2 text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="max-w-100 text-sm text-muted-foreground text-balance">{feature.description}</p>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default Features;
