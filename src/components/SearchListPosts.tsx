import Fuse from "fuse.js";
import { useEffect, useRef, useState } from "react";

export type SearchItem = {
  slug: string;
  data: any;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = new Fuse(searchList, {
    keys: ["data.title", "data.description", "data.tags"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  });

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    let inputResult = inputVal.length > 2 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <>
      <input
        className="italic w-full border-[1px] border-solid border-blue-200 text-sm rounded-lg px-4 p-2 focus:border-blue-500"
        placeholder="Три способа пройти 12 шагов..."
        type="text"
        name="search"
        value={inputVal}
        onChange={handleChange}
        autoComplete="off"
        autoFocus
        ref={inputRef}
      />

      {inputVal.length > 1 && (
        <div>
          Найдено <b>{searchResults?.length}</b>
          {searchResults?.length && searchResults?.length === 1
            ? " результат"
            : " результатов"}{" "}
          для <b>'{inputVal}'</b>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {searchResults?.map(({ item }) => (
          <a href={`/posts/${item.slug}`}>
            <div
              key={item.slug}
              className="bg-gray-50 ring-1 ring-gray-100 rounded-lg p-3 hover:bg-gray-100 transition-colors ease-linear"
            >
              <h3 className="mb-2 font-bold text-lg leading-tight">
                {item.data.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.data.description}...
              </p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
