const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="bg-received rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-pulse-soft"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">Sarah is typing...</span>
    </div>
  );
};

export default TypingIndicator;
