import { useState } from "react";
import { motion } from "motion/react";
import { Edit2, Check } from "lucide-react";

interface EditableNameProps {
  initialName: string;
  onNameChange: (name: string) => void;
}

export function EditableName({ initialName, onNameChange }: EditableNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  const handleSave = () => {
    if (name.trim()) {
      onNameChange(name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[var(--deep-navy)]/50 border border-[var(--pink)]/50 rounded-lg px-3 py-1 text-[var(--off-white)] focus:outline-none focus:border-[var(--pink)]"
          style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
        <motion.button
          onClick={handleSave}
          className="text-[var(--pink)] hover:text-[var(--gold)] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Check size={20} />
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 group">
      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
        {name}
      </span>
      <motion.button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 text-[var(--pink)]/60 hover:text-[var(--pink)] transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Edit2 size={16} />
      </motion.button>
    </div>
  );
}
