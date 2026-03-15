import { Badge } from "@/components/ui/badge";

type DifficultyBadgeProps = {
  // update the type later
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const levelColor = {
    Beginner: "bg-emerald-700 text-white",
    Intermediate: "bg-blue-800 text-white",
    Advanced: "bg-violet-800 text-white",
  };
  return (
    <Badge
      className={`absolute top-2 right-2 py-1 px-2 ${levelColor[difficulty]}`}
    >
      {difficulty}
    </Badge>
  );
};

export default DifficultyBadge;
