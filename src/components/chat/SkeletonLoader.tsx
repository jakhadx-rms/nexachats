import { cn } from "@/lib/utils";

const ChatSkeleton = () => (
  <div className="flex items-center gap-3 p-3 animate-pulse">
    <div className="w-11 h-11 rounded-full bg-muted" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-muted rounded w-1/3" />
      <div className="h-2.5 bg-muted rounded w-2/3" />
    </div>
  </div>
);

const MessageSkeleton = ({ sent }: { sent?: boolean }) => (
  <div className={cn("flex mb-3 animate-pulse", sent ? "justify-end" : "justify-start")}>
    <div className={cn("rounded-2xl p-4 space-y-2", sent ? "bg-muted/50 rounded-br-md" : "bg-muted rounded-bl-md")}>
      <div className="h-3 bg-muted-foreground/10 rounded w-40" />
      <div className="h-3 bg-muted-foreground/10 rounded w-28" />
    </div>
  </div>
);

export { ChatSkeleton, MessageSkeleton };
