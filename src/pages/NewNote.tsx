import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NoteData } from "../App";

import { NoteForm } from "../components/Notes/NoteForm";

type NewNoteProps = {
  onAddNote: (data: NoteData) => void;
} & Partial<NoteData>;

export function NewNote({
  onAddNote,
  title = "",
  markdown = "",
}: NewNoteProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitHandler = () => {
    markdown = inputValue;
    if (markdown.trim() !== "") {
      title = markdown.split("\n", 1)[0];
      onAddNote({
        title: title,
        markdown: markdown,
      });
    }

    navigate("/notes");
  };

  return (
    <NoteForm
      setInputValue={setInputValue}
      inputValue={inputValue}
      submitHandler={submitHandler}
      handleChangeInput={handleChangeInput}
    />
  );
}
