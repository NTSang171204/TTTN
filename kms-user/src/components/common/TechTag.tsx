import { Badge } from "@/components/ui/badge";

interface TechTagProps {
  name: string;
  isPopular?: boolean;
  onClick?: () => void;
}

const TechTag = ({ name, isPopular = false, onClick }: TechTagProps) => {
  return (
    <div className="inline-flex items-center space-x-1">
      <Badge 
        onClick={onClick}
        className={`cursor-pointer transition-all duration-300 hover:opacity-80 ${
          isPopular 
            ? "bg-kms-popular text-white hover:bg-kms-popular/90" 
            : "bg-kms-tag-bg text-kms-tag-text hover:bg-kms-tag-bg/90"
        }`}
      >
        {name}
      </Badge>
    </div>
  );
};

export default TechTag;