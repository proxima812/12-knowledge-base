import { sanitizeQuillOutput } from "_utils/sanitizeQuillOutput.js";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "../supabaseClient.js";
import { forbiddenWords } from "./react-quill/forbiddenWords.js";
import { quillModules } from "./react-quill/quillModules.js";

function ListBlocks({ user }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("items12")
        .select("*")
        .eq("userId", user.id); // Фильтруем блоки, принадлежащие текущему пользователю

      if (error) throw error;
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function validateContent(title, description) {
    let detectedWords = [];

    for (let word of forbiddenWords) {
      if (title.includes(word) || description.includes(word)) {
        detectedWords.push(word);
      }
    }

    return detectedWords;
  }
  async function createProduct() {
    try {
      let invalidWords = validateContent(name, description);

      if (invalidWords.length > 0) {
        alert("Запрещенные слова: " + invalidWords.join(", "));
        return;
      }
      if (!name) {
        alert("Обязательное поле");
        return;
      }
      if (!description) {
        alert("Обязательное поле");
        return;
      }
      if (name.length < 6) {
        alert("Не меньше 6 символов");
        return;
      }
      if (description.length < 30) {
        alert("Не меньше 30 символов");
        return;
      }
      const { data, error } = await supabase
        .from("items12")
        .insert({
          name: name,
          description: description,
          userId: user.id,
        })
        .single();

      alert('Запись добавлена! Перейдите на страницу "Записи"');

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div className="mt-6 flex flex-col gap-6">
        <input
          className=" w-full glass text-lg px-3 py-2 self-start rounded-md font-medium"
          type="text"
          placeholder="Мой шикарный Заголовок"
          id="name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <div className="rounded-md glass solid border-[1px] border-green-100">
          <ReactQuill
            placeholder="Моя новая запись... Поехали ✍"
            theme="snow"
            required
            modules={quillModules}
            value={sanitizeQuillOutput(description)}
            onChange={setDescription}
          />
        </div>

        <button
          className="jbtn"
          onClick={() => createProduct()}
        >
          Добавить запись 🎉
        </button>
      </div>
    </>
  );
}

export default ListBlocks;
