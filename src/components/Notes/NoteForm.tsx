import {
  StyledInputBase,
  MicIconWrapper,
  MicIconOffWrapper,
} from "../../components/mui/icons";
import { Arrow } from "../../components/mui/icons";

import { useState } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { NoteData } from "../../App";

import classes from "./NoteForm.module.css";

type NoteFormProps = {
  inputValue: string;
  setInputValue: (text: string) => void;
  submitHandler: () => void;
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Partial<NoteData>;

export function NoteForm({
  inputValue = "",
  setInputValue,
  submitHandler,
  handleChangeInput,
}: NoteFormProps) {
  const [islistening, setIsListening] = useState<boolean>(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const startListeningHandler = () => {
    resetTranscript();
    setIsListening(true);
    SpeechRecognition.startListening();
  };

  const stopListeningHandler = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    setInputValue(inputValue.concat(transcript));
  };

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.arrow}>
          <Arrow onClick={submitHandler} fontSize="large" />
        </div>
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
        <h2>Done</h2>
      </div>
      <div className={classes.body}>
        <StyledInputBase
          autoFocus
          fullWidth
          multiline
          minRows={20}
          value={islistening ? inputValue.concat(transcript) : inputValue}
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
}
