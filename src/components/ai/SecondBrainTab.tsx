import { useState } from "react";
import { Brain, Link2, Lightbulb, TrendingUp, ChevronRight } from "lucide-react";
import { knowledgeNodes, insights, KnowledgeNode } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const typeColors: Record<string, { dot: string; bg: string; text: string }> = {
  topic: { dot: "bg-blue-500", bg: "bg-blue-500/10", text: "text-blue-500" },
  person: { dot: "bg-emerald-500", bg: "bg-emerald-500/10", text: "text-emerald-500" },
  project: { dot: "bg-violet-500", bg: "bg-violet-500/10", text: "text-violet-500" },
  concept: { dot: "bg-amber-500", bg: "bg-amber-500/10", text: "text-amber-500" },
};

const SecondBrainTab = () => {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);

  const getConnectedNodes = (node: KnowledgeNode) =>
    knowledgeNodes.filter((n) => node.connections.includes(n.id));

  return (
    <motion.div
      key="brain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Knowledge Graph Mini */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Knowledge Map
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {knowledgeNodes.slice(0, 6).map((node) => {
            const colors = typeColors[node.type];
            const isSelected = selectedNode?.id === node.id;
            const isConnected = selectedNode
              ? selectedNode.connections.includes(node.id)
              : false;

            return (
              <motion.button
                key={node.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedNode(isSelected ? null : node)}
                className={cn(
                  "rounded-lg border p-2.5 text-left transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : isConnected
                    ? "border-primary/30 bg-primary/5"
                    : "hover:border-muted-foreground/30"
                )}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={cn("w-2 h-2 rounded-full", colors.dot)} />
                  <span className="text-xs font-semibold truncate">{node.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn("text-[10px] font-medium capitalize", colors.text)}>
                    {node.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link2 className="h-2.5 w-2.5 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">
                      {node.connections.length}
                    </span>
                  </div>
                </div>
                {/* Strength bar */}
                <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn("h-full rounded-full", colors.dot)}
                    style={{ width: `${node.strength}%` }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 rounded-lg border bg-primary/5 p-3 overflow-hidden"
            >
              <p className="text-xs font-semibold mb-1.5">
                Connected to "{selectedNode.label}"
              </p>
              <div className="flex flex-wrap gap-1.5">
                {getConnectedNodes(selectedNode).map((cn_) => (
                  <span
                    key={cn_.id}
                    className={cn(
                      "text-[10px] font-medium px-2 py-1 rounded-full",
                      typeColors[cn_.type].bg,
                      typeColors[cn_.type].text
                    )}
                  >
                    {cn_.label}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Insights */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            AI Insights
          </span>
        </div>

        <div className="space-y-2">
          {insights.map((insight) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border p-3 hover:border-primary/20 transition-colors group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-1">
                <h4 className="text-xs font-semibold leading-tight">{insight.title}</h4>
                <ChevronRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">
                {insight.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {insight.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-2.5 w-2.5 text-emerald-500" />
                  <span className="text-[10px] text-emerald-500 font-medium">
                    {insight.confidence}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SecondBrainTab;
