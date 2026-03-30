import { Lock, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GuestBanner = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-primary/10 border-b border-primary/20 overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-2 text-sm">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-foreground">You're in Guest Mode.</span>
              <button
                onClick={() => navigate("/login")}
                className="font-semibold text-primary hover:underline"
              >
                Login to unlock AI features
              </button>
            </div>
            <button onClick={() => setVisible(false)} className="p-1 hover:bg-muted rounded-md">
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuestBanner;
