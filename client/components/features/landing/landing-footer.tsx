import { Button } from "@/components/ui/button";
import {
  FacebookIcon,
  Instagram,
  LinkedinIcon,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  TwitterIcon,
} from "lucide-react";

type SocialIcon = {
  icon: LucideIcon;
  name: string;
};

type Link = {
  title: string;
  href: string;
};

const Footer = () => {
  const socialIcons: SocialIcon[] = [
    { icon: FacebookIcon, name: "Facebook" },
    { icon: TwitterIcon, name: "Twitter" },
    { icon: Instagram, name: "Instagram" },
    { icon: LinkedinIcon, name: "Linkedin" },
  ];

  const quickLinks: Link[] = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/" },
    { title: "Courses", href: "/" },
    { title: "Contact", href: "/" },
    { title: "Blog", href: "/" },
  ];

  const learningLinks: Link[] = [
    { title: "Business", href: "/" },
    { title: "Development", href: "/" },
    { title: "Marketing", href: "/" },
    { title: "Design", href: "/" },
    { title: "Photography", href: "/" },
  ];

  return (
    <footer className="pt-10 md:pt-14 lg:pt-16 pb-8 border-t">
      <div className="container px-4 md:px-8 lg:px-20 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:gap-10 mb-10 md:mb-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xl font-bold">Wahyedu</h3>
            <p className="mb-5 text-sm text-muted-foreground max-w-md">
              A modern e-learning platform with expert instructors and
              high-quality courses to help you achieve your goals.
            </p>
            <div className="flex space-x-3">
              {socialIcons.map((socialIcon: SocialIcon, index: number) => {
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="rounded-full w-9 h-9 border-gray-200"
                  >
                    <socialIcon.icon className="w-4 h-4" />
                    <span className="sr-only">{socialIcon.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-base font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link: Link, index: number) => {
                return (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {link.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-base font-semibold">Learning</h4>
            <ul className="space-y-3">
              {learningLinks.map((link: Link, index: number) => {
                return (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {link.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-base font-semibold">Contact Info</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3 text-sm">
                <div className="shrink-0 mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>123 Education St, Learning City, 10001</div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="shrink-0 mt-1">
                  <Mail className="w-4 h-4" />
                </div>
                <div>info@wahyedu.com</div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="shrink-0 mt-1">
                  <Phone className="w-4 h-4" />
                </div>
                <div>+1 (123) 456-7890</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 mt-6 text-center border-t text-sm">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Wahyedu. All rights reserved.
          </p>
          <div className="flex justify-center mt-3 space-x-5">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
