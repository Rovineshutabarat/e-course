import CourseCard from "@/components/features/course/course-card";
import { CourseResponse } from "@/types/payload/response/course.response";

const dummyCourses: CourseResponse[] = [
  {
    id: 1,
    title: "React JS Fundamental: Components, Hooks & Routing",
    slug: "react-js-fundamental",
    description: "Belajar React modern dari nol sampai bisa.",
    price: 129000,
    category: "Web Development",
    instructor: {
      username: "Rovines",
      email: "rovines@example.com",
      verified_at: "2024-01-01",
      image: null as unknown as { id: number; file_name: string; path: string },
    },
    difficulty: "BEGINNER",
    image: { id: 1, file_name: "React course", path: "https://picsum.photos/seed/lerneon-react/640/400" },
  },
  {
    id: 2,
    title: "Next.js Fullstack: App Router, Prisma & Auth",
    slug: "nextjs-fullstack",
    description: "Bangun aplikasi production-ready.",
    price: 199000,
    category: "Web Development",
    instructor: {
      username: "Jessica Taylor",
      email: "jessica@example.com",
      verified_at: "2024-01-01",
      image: { id: 2, file_name: "Jessica", path: "https://picsum.photos/seed/lerneon-ava1/100/100" },
    },
    difficulty: "INTERMEDIATE",
    image: { id: 3, file_name: "Next.js course", path: "https://picsum.photos/seed/lerneon-next/640/400" },
  },
  {
    id: 3,
    title: "Machine Learning Dasar dengan Python & Scikit-Learn",
    slug: "ml-dasar-python",
    description: "Regresi, klasifikasi, evaluasi model.",
    price: 249000,
    category: "Data Science",
    instructor: {
      username: "Olivia Green",
      email: "olivia@example.com",
      verified_at: "2024-01-01",
      image: null as unknown as { id: number; file_name: string; path: string },
    },
    difficulty: "ADVANCE",
    image: { id: 4, file_name: "ML course", path: "https://picsum.photos/seed/lerneon-ml/640/400" },
  },
  {
    id: 4,
    title: "UI/UX Design dengan Figma: Riset sampai Prototype",
    slug: "figma-ui-ux",
    description: "Wireframe, design system, prototyping.",
    price: 99000,
    category: "UI/UX Design",
    instructor: {
      username: "Daniel White",
      email: "daniel@example.com",
      verified_at: "2024-01-01",
      image: { id: 5, file_name: "Daniel", path: "https://picsum.photos/seed/lerneon-ava2/100/100" },
    },
    difficulty: "BEGINNER",
    image: { id: 6, file_name: "Figma course", path: "https://picsum.photos/seed/lerneon-figma/640/400" },
  },
  {
    id: 5,
    title: "Docker & Kubernetes untuk Backend Developer",
    slug: "docker-kubernetes",
    description: "Containerize dan orkestrasi aplikasi.",
    price: 199000,
    category: "DevOps & Cloud",
    instructor: {
      username: "Chris Johnson",
      email: "chris@example.com",
      verified_at: "2024-01-01",
      image: null as unknown as { id: number; file_name: string; path: string },
    },
    difficulty: "INTERMEDIATE",
    image: { id: 7, file_name: "Docker course", path: "https://picsum.photos/seed/lerneon-docker/640/400" },
  },
  {
    id: 6,
    title: "Pengenalan Programming dengan JavaScript",
    slug: "js-pemula",
    description: "Titik awal terbaik sebelum React.",
    price: 0,
    category: "Web Development",
    instructor: {
      username: "Rovines",
      email: "rovines@example.com",
      verified_at: "2024-01-01",
      image: null as unknown as { id: number; file_name: string; path: string },
    },
    difficulty: "BEGINNER",
    image: { id: 8, file_name: "JS course", path: "https://picsum.photos/seed/lerneon-js/640/400" },
  },
];

export default function CardPreviewPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Card Preview</h1>
        <p className="text-sm text-muted-foreground">
          Dummy showcase — data palsu, hapus halaman ini sebelum production.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dummyCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
