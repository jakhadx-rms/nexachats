import { Users, BarChart3, TrendingUp, TrendingDown, Minus, MessageCircle, Heart } from "lucide-react";
import { contextProfiles, conversationPatterns } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const relationshipColors: Record<string, { bg: string; text: string }> = {
  "close friend": { bg: "bg-pink-500/10", text: "text-pink-500" },
  classmate: { bg: "bg-blue-500/10", text: "text-blue-500" },
  professor: { bg: "bg-violet-500/10", text: "text-violet-500" },
  "team member": { bg: "bg-emerald-500/10", text: "text-emerald-500" },
};

const sentimentIcon = {
  positive: { icon: Heart, color: "text-pink-500" },
  neutral: { icon: Minus, color: "text-muted-foreground" },
  mixed: { icon: BarChart3, color: "text-amber-500" },
};

const trendIcon = {
  up: { icon: TrendingUp, color: "text-emerald-500" },
  down: { icon: TrendingDown, color: "text-destructive" },
  stable: { icon: Minus, color: "text-muted-foreground" },
};

const ContextSystemTab = () => {
  return (
    <motion.div
      key="context"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Relationship Map */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Relationship Context
          </span>
        </div>

        <div className="space-y-2">
          {contextProfiles.map((profile, i) => {
            const rel = relationshipColors[profile.relationship];
            const sent = sentimentIcon[profile.sentiment];
            const SentIcon = sent.icon;

            return (
              <motion.div
                key={profile.personId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border p-3 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {profile.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold truncate">{profile.name}</h4>
                      <SentIcon className={cn("h-3 w-3 shrink-0", sent.color)} />
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded-full capitalize", rel.bg, rel.text)}>
                        {profile.relationship}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{profile.interactionFrequency}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                      <MessageCircle className="h-2.5 w-2.5 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{profile.sharedMemories}</span>
                    </div>
                    <span className="text-[9px] text-muted-foreground">{profile.lastInteraction}</span>
                  </div>
                </div>

                {/* Topic chips */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {profile.topTopics.map((topic) => (
                    <span
                      key={topic}
                      className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Conversation Patterns */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Your Patterns
          </span>
        </div>

        <div className="space-y-2">
          {conversationPatterns.map((pat) => {
            const trend = trendIcon[pat.trend];
            const TrendComp = trend.icon;

            return (
              <div
                key={pat.id}
                className="rounded-lg border p-3 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-semibold">{pat.pattern}</h4>
                  <TrendComp className={cn("h-3 w-3", trend.color)} />
                </div>
                <p className="text-[11px] text-muted-foreground mb-2">{pat.description}</p>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pat.frequency}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ContextSystemTab;
