import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { NoteData, RawNote } from "../App";

import { NoteForm } from "../components/Notes/NoteForm";

type EditNoteProps = {
  notes: RawNote[];
  onUpdateNote: (id: string, data: NoteData) => void;
  onRemoveNote: (id: string) => void
} & Partial<NoteData>;

export function EditNote({
  notes,
  onUpdateNote,
  onRemoveNote,
  title = "",
  markdown = "",
}: EditNoteProps) {
  const params = useParams<string>();

  const note = notes.find((note) => note.id === params.id);

  const [inputValue, setInputValue] = useState(note!.markdown);

  const navigate = useNavigate();

  const submitHandler = () => {
    markdown = inputValue;
    if (markdown.trim() !== "") {
      title = markdown.split("\n", 1)[0];
      onUpdateNote(note!.id, {
        title: title,
        markdown: inputValue,
      });
    } else {
        onRemoveNote(note!.id)
    }

    navigate("/notes");
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <NoteForm inputValue={inputValue} setInputValue={setInputValue} submitHandler={submitHandler} handleChangeInput={handleChangeInput} />
  );
}
