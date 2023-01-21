import React from "react";

import {
  StyledList,
} from "../mui/icons";
import Divider from "@mui/material/Divider";

import NoteItem from "./NoteItem";

type SimplifiedNote = {
  title: string;
  markdown: string;
  id: string;
};

type NoteListProps = {
  onRemoveNote: (id: string) => void;
  notes: SimplifiedNote[];
};

export function NoteList({ onRemoveNote, notes }: NoteListProps) {
  if (notes.length === 0) {
    return <div></div>;
  }

  const removeHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    onRemoveNote(id);
  };

  return (
    <StyledList>
      {notes.map((note, i) => {
        let body = note.markdown.substring(note.markdown.indexOf("\n") + 1);
        if (body.trim() === "" || note.title === note.markdown) {
          body = "No additional text";
        }
        if (i + 1 === notes.length) {
          return (
            <NoteItem removeHandler={removeHandler} note={note} body={body} />
          );
        } else {
          return (
            <React.Fragment>
              <NoteItem removeHandler={removeHandler} note={note} body={body} />
              <Divider light variant="middle" />
            </React.Fragment>
          );
        }
      })}
    </StyledList>
  );
}

export default NoteList;
