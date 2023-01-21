import React from "react";
import { Link } from "react-router-dom";

import {
  StyledListItem,
  StyledListItemText,
  StyledListItemButton,
} from "../mui/icons";

type SimplifiedNote = {
  title: string;
  markdown: string;
  id: string;
};

type NoteListProps = {
  removeHandler: (event: React.MouseEvent<HTMLInputElement>) => void;
  note: SimplifiedNote;
  body: string;
};

export function NoteItem({ removeHandler, note, body }: NoteListProps) {
  return (
    <Link to={`/notes/${note.id}`} style={{ textDecoration: "none" }}>
      <StyledListItem disablePadding>
        <StyledListItemButton id={note.id} onContextMenu={removeHandler}>
          {note.title}
          <StyledListItemText>{body}</StyledListItemText>
        </StyledListItemButton>
      </StyledListItem>
    </Link>
  );
}

export default NoteItem;
