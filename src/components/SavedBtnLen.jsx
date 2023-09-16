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
    <a href="/saved" className="jbtn">
      <span>📁</span>{" "}
      {savedCount && <>{savedCount > 0 && `(${savedCount})`}</>}
    </a>
  );
}

export default SavedPostsLink;
