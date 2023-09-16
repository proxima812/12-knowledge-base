import Quill from "quill";
import AutoLinks from "quill-auto-links";

Quill.register("modules/autoLinks", AutoLinks);

export const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "link", "code"],

    [{ list: "ordered" }, { list: "bullet" }],
    // [{ indent: "-1" }, { indent: "+1" }],

    // [{ color: [] }, { background: [] }],
    // [{ font: [] }],
    // [{ align: [] }],
    ["image"],

    ["clean"],
  ],
  autoLinks: true,
};
