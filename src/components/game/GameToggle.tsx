import { Gamepad2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameToggleProps {
  active: boolean;
  onToggle: () => void;
}

const GameToggle = ({ active, onToggle }: GameToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "game-toggle-side hidden md:flex",
        active && "game-toggle-side--active"
      )}
    >
      {active ? (
        <>
          <X className="w-4 h-4 transition-transform duration-300 hover:rotate-90" />
          <span className="game-toggle-side-text">Close</span>
          <span className="w-1.5 h-1.5 rounded-full bg-dim animate-gentle-pulse" />
        </>
      ) : (
        <>
          <Gamepad2 className="w-4 h-4 animate-gentle-float" />
          <span className="game-toggle-side-text">Play Game</span>
          <span className="w-1.5 h-1.5 rounded-full bg-ink animate-gentle-pulse" />
        </>
      )}
    </button>
  );
};

export default GameToggle;
