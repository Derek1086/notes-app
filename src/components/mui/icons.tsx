import { styled, alpha } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

export const theme = createTheme({
  typography: {
    fontFamily: ["Arial"].join(","),
  },
});

const gray = "#e5e5e5";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between"
}));

export const SearchIconWrapper = styled(SearchIcon)(() => ({
  left: "1%",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  color: alpha(gray, 0.5),
  "&:hover": {
    backgroundColor: alpha(gray, 0.25),
  },
}));

export const MicIconWrapper = styled(MicIcon)(() => ({
  margin: "0",
  position: "relative",
  transform: "translate(-10%, 30%)",
  height: "100%",
  zIndex: "7",
  color: alpha(gray, 0.5),
  "&:hover": {
    color: alpha(gray, 0.95),
  },
}));

export const MicIconOffWrapper = styled(MicOffIcon)(() => ({
  margin: "0",
  position: "relative",
  transform: "translate(-10%, 30%)",
  height: "100%",
  zIndex: "7",
  color: alpha(gray, 0.5),
  "&:hover": {
    color: alpha(gray, 0.95),
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: gray,
  width: "90%",
  fontSize: "1.1rem",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
  },
}));

export const Arrow = styled(ArrowBackIosIcon)(() => ({
  left: "1%",
  color: "#ffd52e",
}));

export const StyledList = styled(List)(({ theme }) => ({
  marginTop: "1%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
}));

export const StyledListItem = styled(ListItem)(() => ({
  width: "95%",
  margin: "auto",
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  fontSize: "0.9rem",
  fontWeight: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: alpha(theme.palette.common.white, 0.25),
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));
