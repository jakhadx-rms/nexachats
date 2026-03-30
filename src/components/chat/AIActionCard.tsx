import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface AIActionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  loading?: boolean;
}

const AIActionCard = ({ icon: Icon, title, description, onClick, loading }: AIActionCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={loading}
      className={cn(
        "w-full rounded-xl border bg-card p-3.5 text-left transition-all duration-200",
        "hover:border-primary/30 hover:shadow-md hover:shadow-primary/5",
        "disabled:opacity-60 disabled:cursor-not-allowed"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
          {loading ? (
            <Loader2 className="h-4 w-4 text-primary animate-spin" />
          ) : (
            <Icon className="h-4 w-4 text-primary" />
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
    </motion.button>
  );
};

export default AIActionCard;
