import { createContext, useState } from "react";
import TextEditor from "../components/TextEditor";

const blogInitialState = {
  title: "",
  bannerUrl: "",
  content: "",
  tags: [],
  desc: "",
  authorName: "",
  author: { profile_info: {} },
};

export const EditorContext = createContext({});

const WriteBlog = () => {
  const [blog, setBlog] = useState(blogInitialState);
  const [isEditor, setIsEditor] = useState(true);

  return (
    <EditorContext.Provider value={{ blog, setBlog, isEditor, setIsEditor }}>
      <TextEditor />
    </EditorContext.Provider>
  );
};

export default WriteBlog;
