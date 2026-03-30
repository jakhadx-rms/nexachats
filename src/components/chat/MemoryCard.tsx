import { Memory } from "@/data/sampleData";
import { Cake, CheckCircle2, CalendarClock, MapPin, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MemoryCardProps {
  memory: Memory;
  onEdit?: () => void;
  onDelete?: () => void;
}

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  birthday: { icon: Cake, color: "text-pink-500", bg: "bg-pink-500/10" },
  task: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  deadline: { icon: CalendarClock, color: "text-orange-500", bg: "bg-orange-500/10" },
  event: { icon: MapPin, color: "text-blue-500", bg: "bg-blue-500/10" },
};

const MemoryCard = ({ memory, onEdit, onDelete }: MemoryCardProps) => {
  const config = typeConfig[memory.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border bg-card p-3.5 group hover:border-primary/20 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-lg shrink-0", config.bg)}>
          <Icon className={cn("h-4 w-4", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold truncate">{memory.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{memory.date}</p>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{memory.context}</p>
          <span className="text-[10px] text-primary font-medium mt-1.5 inline-block">
            From: {memory.person}
          </span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="p-1 hover:bg-muted rounded-md transition-colors">
            <Pencil className="h-3 w-3 text-muted-foreground" />
          </button>
          <button onClick={onDelete} className="p-1 hover:bg-destructive/10 rounded-md transition-colors">
            <Trash2 className="h-3 w-3 text-destructive" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryCard;
