import { Badge } from "../ui/badge";

const primarySkills = ["typescript", "react", "rust", "c"];
const secondarySkills = [
  "smart contracts",
  "devops",
  "system design",
  "autosar",
  "embedded software",
];

export const Skills = () => {
  return (
    <div className="w-full m-auto max-w-sm flex flex-row flex-wrap gap-2 h-fit items-center justify-center">
      {primarySkills.map((skill) => (
        <div key={skill}>
          <Badge className="pointer-events-none">{skill}</Badge>
        </div>
      ))}
      {secondarySkills.map((skill) => (
        <div key={skill}>
          <Badge className="pointer-events-none" variant="secondary">
            {skill}
          </Badge>
        </div>
      ))}
    </div>
  );
};
