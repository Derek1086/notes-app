import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import { useLocalStorage } from "./components/hooks/useLocalStorage";

import { Home } from "./pages/Notes";
import { NewNote } from "./pages/NewNote";
import { EditNote } from "./pages/EditNote";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [filteredNotes, setFilteredNotes] = useState(notes || []);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const addNoteHandler = ({ ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [...prevNotes, { ...data, id: uuidv4() }];
    });
  };

  const removeNoteHandler = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  const updateNote = (id: string, { ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data };
        } else {
          return note;
        }
      });
    });
  };

  const searchHandler = (text: string) => {
    const searchResults = notes.filter((note) =>
      note.markdown.toLowerCase().includes(text)
    );
    setFilteredNotes(searchResults);
  };

  return (
    <Routes>
      <Route
        path="/notes"
        element={
          <Home
            notes={filteredNotes}
            onRemoveNote={removeNoteHandler}
            onSearch={searchHandler}
          />
        }
      />
      <Route
        path="/new-note"
        element={<NewNote onAddNote={addNoteHandler} />}
      />
      <Route
        path="/notes/:id"
        element={
          <EditNote
            onUpdateNote={updateNote}
            onRemoveNote={removeNoteHandler}
            notes={notes}
          />
        }
      />
      <Route path="*" element={<Navigate to="/notes" />} />
    </Routes>
  );
}

export default App;
