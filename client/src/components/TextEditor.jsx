import EditorNavbar from "./EditorNavbar";
import { useContext, useEffect, useState } from "react";
import { getFromSession, storeInSession } from "../common/sessions";
import EditorBanner from "./EditorBanner";
import { EditorContext } from "../pages/WriteBlog";
import { Editor } from "@tinymce/tinymce-react";
import EditorSidebar from "../components/EditorSidebar";

const TextEditor = () => {
  const [isMetadataVisible, setIsMetadataVisible] = useState(false);

  const {
    blog,
    blog: { title, content },
    setBlog,
  } = useContext(EditorContext);

  useEffect(() => {
    const blogData = getFromSession("blogData");

    if (blogData) {
      setBlog(JSON.parse(blogData));
    }
  }, [setBlog]);

  const handleMetadataVisible = () => {
    setIsMetadataVisible((prev) => !prev);
  };

  return (
    <div>
      <EditorNavbar
        title={title}
        handleMetadataVisible={handleMetadataVisible}
      />
      <div className="xl:flex justify-between xl:gap-6 px-8">
        <div className="flex flex-col gap-4 xl:flex-[70%] 2xl:flex-[80%]">
          <EditorBanner />
          <div id="textEditor" className="w-full mx-auto">
            <Editor
              apiKey="0qewl34bpy41nh4w73flzv18mvp3j06cssx3glvpn5tm0w1d"
              onInit={(evt, editor) => {
                setBlog({ ...blog, content: editor.getContent() });
              }}
              onEditorChange={(newValue) => {
                const blogData = JSON.stringify({ ...blog, content: newValue });
                storeInSession("blogData", blogData);
                setBlog(JSON.parse(blogData));
              }}
              value={content}
              init={{
                height: 800,
                content_css: "tinymce-5-dark",
                images_upload_url: `${
                  import.meta.env.VITE_BASE_URL
                }/write/upload-editor-img`,
                images_upload_handler: {},
                menubar: true,
                id: "textArea",
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "image | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #18181b; color: white }",
              }}
            />
          </div>
        </div>
        <div
          className={`${
            isMetadataVisible ? "right-0" : "right-[-100vw]"
          } fixed top-[88px] w-full xl:static z-[99] xl:flex-[30%] 2xl:flex-[20%] transition-all`}
        >
          <EditorSidebar />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
