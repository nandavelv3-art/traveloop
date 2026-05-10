import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Tag, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { mockNotes } from "@/services/mockData";
import type { Note } from "@/types";

const tagColors: Record<string, string> = {
  important: "#EF4444",
  visa: "#3B82F6",
  money: "#F59E0B",
  tips: "#10B981",
  packing: "#7C3AED",
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const addNote = () => {
    if (!newTitle.trim()) return;
    const note: Note = {
      id: `n${Date.now()}`,
      title: newTitle,
      content: newContent,
      createdAt: new Date().toISOString().split("T")[0],
      tags: [],
    };
    setNotes(prev => [note, ...prev]);
    setNewTitle("");
    setNewContent("");
    setShowNew(false);
  };

  return (
    <div className="pb-8 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-white/40 text-sm">{notes.length} notes</p>
        <motion.button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl gradient-purple text-white text-xs font-semibold"
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          data-testid="button-new-note"
        >
          <Plus className="w-3.5 h-3.5" /> New Note
        </motion.button>
      </div>

      {/* New note form */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.3)" }}
          >
            <div className="p-5 space-y-3">
              <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full px-0 py-1 text-white font-semibold bg-transparent outline-none border-b border-white/10 text-base"
                data-testid="input-note-title"
              />
              <textarea
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                placeholder="Write your note..."
                rows={3}
                className="w-full text-white/70 text-sm bg-transparent outline-none resize-none"
                data-testid="input-note-content"
              />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowNew(false)} className="px-3 py-1.5 rounded-lg text-white/40 text-xs hover:text-white transition-colors" data-testid="button-cancel-note">Cancel</button>
                <button onClick={addNote} className="px-4 py-1.5 rounded-lg gradient-purple text-white text-xs font-semibold" data-testid="button-save-note">Save</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes list */}
      {notes.map((note, i) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="rounded-2xl overflow-hidden cursor-pointer"
          style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}
          onClick={() => setExpanded(expanded === note.id ? null : note.id)}
          data-testid={`note-card-${note.id}`}
        >
          <div className="px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm mb-1">{note.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
                  {expanded === note.id ? note.content : note.content}
                </p>
              </div>
              <div className="flex-shrink-0 text-white/30">
                {expanded === note.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            <AnimatePresence>
              {expanded === note.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-white/60 text-sm leading-relaxed">{note.content}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-3">
              <div className="flex flex-wrap gap-1.5">
                {note.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: (tagColors[tag] ?? "#7C3AED") + "20", color: tagColors[tag] ?? "#A855F7" }}
                  >
                    <Tag className="w-2.5 h-2.5 inline mr-1" />{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-white/30">
                <Calendar className="w-3 h-3" />
                <span className="text-xs">{note.createdAt}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
