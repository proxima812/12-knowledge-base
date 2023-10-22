export function slugify(str) {
  const map = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ы: "y",
    э: "e",
    ю: "yu",
    я: "ya",

    " ": "-",
    _: "-",
    "/": "-",
    "\\": "-",
  };

  return str
    .toLowerCase()
    .split("")
    .map((char) => map[char] || char)
    .join("")
    .replace(/\W+/g, "-") // заменить наборы неалфавитно-цифровых символов на дефис
    .replace(/^-+|-+$/g, ""); // убрать дефисы в начале и в конце строки
}

export function untransliterate(str) {
  const map = {
    a: "а",
    b: "б",
    c: "ц",
    d: "д",
    e: "е",
    f: "ф",
    g: "г",
    h: "х",
    i: "и",
    j: "й",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    r: "р",
    s: "с",
    t: "т",
    u: "у",
    v: "в",
    w: "в",
    x: "кс",
    y: "й",
    z: "з",
    "-": " ",
    yo: "ё",
    zh: "ж",
    ch: "ч",
    sh: "ш",
    sch: "щ",
    yu: "ю",
    ya: "я",
  };

  return str
    .toLowerCase()
    .split("")
    .map((char) => map[char] || char)
    .join("");
}
