import { useEffect, useState } from "react";

function SavedPostsLink() {
  const [savedCount, setSavedCount] = useState(0);

  const updateSavedCount = () => {
    const savedPostsData = localStorage.getItem("saved-posts");
    if (savedPostsData) {
      try {
        const savedPosts = JSON.parse(savedPostsData);
        if (Array.isArray(savedPosts)) {
          setSavedCount(savedPosts.length);
        }
      } catch (e) {
        const numberCount = parseInt(savedPostsData, 10);
        if (!isNaN(numberCount)) {
          setSavedCount(numberCount);
        }
      }
    } else {
      setSavedCount(0); // Если данных нет в localStorage
    }
  };

  useEffect(() => {
    updateSavedCount(); // Сначала устанавливаем начальное значение

    // Подписываемся на изменения в localStorage
    window.addEventListener("storage", updateSavedCount);

    // Отписываемся при размонтировании компонента
    return () => {
      window.removeEventListener("storage", updateSavedCount);
    };
  }, []);

  useEffect(() => {
    const handleSavedPostsChanged = () => {
      updateSavedCount();
    };

    // Подписка на событие
    document.addEventListener("saved-posts-changed", handleSavedPostsChanged);

    return () => {
      // Отписка от события
      document.removeEventListener(
        "saved-posts-changed",
        handleSavedPostsChanged,
      );
    };
  }, []);

  return (
    <a
      href="/saved"
      className="px-3 py-1 rounded-md ring-white/20 ring-1 bg-[#0f1017] flex items-center gap-2"
    >
      <span className="text-xl">📁</span>{" "}
      {savedCount && <b>{savedCount > 0 && `(${savedCount})`}</b>}
    </a>
  );
}

export default SavedPostsLink;
