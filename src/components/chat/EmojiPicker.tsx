import { motion } from "framer-motion";

const EMOJIS = [
  "😀", "😂", "🥰", "😎", "🤔", "😢", "🔥", "❤️",
  "👍", "👋", "🎉", "🚀", "💯", "✅", "⭐", "🙏",
  "😊", "🤣", "😍", "🥳", "😤", "💪", "🎂", "☕",
  "📅", "📌", "✨", "🌟", "💡", "🎯", "👏", "🤝",
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

const EmojiPicker = ({ onSelect, onClose }: EmojiPickerProps) => {
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="absolute bottom-full left-4 mb-2 z-20 bg-card border rounded-xl shadow-lg p-3 w-72"
      >
        <p className="text-xs font-medium text-muted-foreground mb-2">Emoji</p>
        <div className="grid grid-cols-8 gap-1">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onSelect(emoji)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-lg"
            >
              {emoji}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default EmojiPicker;
