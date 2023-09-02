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
   document.removeEventListener("saved-posts-changed", handleSavedPostsChanged);
  };
 }, []);

 return (
  <a
   href="/saved"
   className="border-2 border-solid border-indigo-400 bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded-md"
  >
   📁 Сохраненные <b>{savedCount > 0 && `(${savedCount})`}</b>
  </a>
 );
}

export default SavedPostsLink;
