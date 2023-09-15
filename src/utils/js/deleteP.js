// Получаем все теги <p> на странице
const paragraphs = document.getElementsByTagName("p");

// Проходимся по всем тегам <p>
for (let i = paragraphs.length - 1; i >= 0; i--) {
  const paragraph = paragraphs[i];

  // Проверяем, если тег <p> пустой
  if (
    paragraph.innerHTML.trim() === "" ||
    paragraph.innerHTML.trim() === "<br>"
  ) {
    // Удаляем пустой тег <p>
    paragraph.parentNode.removeChild(paragraph);
  } else if (paragraph.querySelector("br")) {
    // Если в теге <p> есть <br>, то удаляем его
    paragraph.removeChild(paragraph.querySelector("br"));
  }
}
