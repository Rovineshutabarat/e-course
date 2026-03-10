import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  BookOpen,
  Briefcase,
  Globe,
  Laptop,
  Newspaper,
} from "lucide-react";
import React from "react";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Features = () => {
  const features: Feature[] = [
    {
      icon: <BookOpen />,
      title: "Courses & Workshops",
      description:
        "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.\n" +
        "Et magna sit morbi lobortis.",
    },
    {
      icon: <Newspaper />,
      title: "Industry Leading Certification",
      description:
        "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.\n" +
        "Et magna sit morbi lobortis.",
    },
    {
      icon: <Laptop />,
      title: "Track your Learning",
      description:
        "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.\n" +
        "Et magna sit morbi lobortis.",
    },
    {
      icon: <Globe />,
      title: "Community Professionals",
      description:
        "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.\n" +
        "Et magna sit morbi lobortis.",
    },
    {
      icon: <Briefcase />,
      title: "Get Job Ready Skills",
      description:
        "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.\n" +
        "Et magna sit morbi lobortis.",
    },
    {
      icon: <Bell />,
      title: "Subscription Based",
      description:
        "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.\n" +
        "Et magna sit morbi lobortis.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-16 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Get <span className="text-blue-500">Career Ready</span> Skills
          </h2>
          <p className="text-muted-foreground">
            What are the benefits you'll get learning with us?
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature: Feature, index: number) => {
            return (
              <Card
                key={index}
                className="border-transparent dark:hover:bg-accent/10 hover:shadow-sm hover:shadow-primary/20 shadow-sm transition-all duration-300 rounded-lg overflow-hidden"
              >
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-6 rounded-lg bg-blue-500 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
