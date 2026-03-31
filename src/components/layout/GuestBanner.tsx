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
          <div className="flex items-center justify-between px-3 sm:px-4 py-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
              <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
              <span className="text-foreground truncate">Guest Mode</span>
              <button
                onClick={() => navigate("/login")}
                className="font-semibold text-primary hover:underline whitespace-nowrap"
              >
                Login to unlock AI
              </button>
            </div>
            <button onClick={() => setVisible(false)} className="p-1 hover:bg-muted rounded-md shrink-0">
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuestBanner;
