import NewNotesIcon from "@mui/icons-material/Edit";
import { ThemeProvider } from "@mui/material";
import {
  theme,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MicIconWrapper,
  MicIconOffWrapper,
} from "../components/mui/icons";
import SearchIcon from "@mui/icons-material/Search";

import github from "../github.png";

import { Link, Route, Routes } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useState } from "react";
import NoteList from "../components/Notes/NoteList";
import { RawNote } from "../App";

import classes from "./Notes.module.css";

export const Home: React.FC<{
  notes: RawNote[];
  onRemoveNote: (id: string) => void;
  onSearch: (text: string) => void;
}> = (props) => {
  const openWindow = () => {
    window.open("https://github.com/Derek1086/", "_blank", "noreferrer");
  };

  const [inputValue, setInputValue] = useState<string>("");

  const [islistening, setIsListening] = useState<boolean>(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    props.onSearch(event.target.value);
  };

  const startListeningHandler = () => {
    resetTranscript();
    props.onSearch("");
    setInputValue("");
    setIsListening(true);
    SpeechRecognition.startListening();
  };

  const stopListeningHandler = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    setInputValue(transcript);
    props.onSearch(transcript);
  };

  let numNotes: string;
  if (props.notes.length > 1) {
    numNotes = `${props.notes.length} notes`;
  } else if (props.notes.length > 0) {
    numNotes = `${props.notes.length} note`;
  } else {
    numNotes = "";
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <div className={classes.main}>
              <div className={classes.header}>
                <h1>Notes</h1>
              </div>
              <div className={classes.search}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ "aria-label": "search" }}
                    className={classes.input}
                    onChange={inputHandler}
                    value={islistening ? transcript : inputValue}
                  />
                  {islistening ? (
                    <MicIconWrapper
                      onClick={stopListeningHandler}
                      className={classes.mic}
                    />
                  ) : (
                    <MicIconOffWrapper
                      onClick={startListeningHandler}
                      className={classes.mic}
                    />
                  )}
                </Search>
              </div>
              <div>
                <NoteList
                  notes={props.notes}
                  onRemoveNote={props.onRemoveNote}
                />
              </div>
              <div className={classes.footer}>
                <img
                  onClick={openWindow}
                  className={classes.logo}
                  src={github}
                  alt="Github"
                />
                <h3>{numNotes}</h3>
                <Link to="/new-note">
                  <NewNotesIcon fontSize="large" className={classes.new} />
                </Link>
              </div>
            </div>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};
