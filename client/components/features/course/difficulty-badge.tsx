import { Difficulty } from "@/types/enums/difficulty";


type DifficultyBadgeProps = {
  difficulty: Difficulty;
};

const difficultyConfig: { [key in Difficulty]: { label: string; className: string } } = {
  BEGINNER: {
    label: "Beginner",
    className: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  },
  INTERMEDIATE: {
    label: "Intermediate",
    className: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30",
  },
  ADVANCE: {
    label: "Advanced",
    className: "bg-violet-500/15 text-violet-400 border border-violet-500/30",
  },
};

const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  console.log("difficulty value:", difficulty)
  const { label, className } = difficultyConfig[difficulty];

  return (
    <span
      className={`absolute top-2 right-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${className}`}
    >
      {label}
    </span>
  );
};

export default DifficultyBadge;