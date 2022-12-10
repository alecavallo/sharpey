import { createContext } from "react";
export const AppContext = createContext<{
  title: string;
  setTitle?: React.Dispatch<React.SetStateAction<string>>;
}>({
  title: "Boo",
});
