import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { styles } from "./searchField.css";
import { debounce } from "@material-ui/core/utils";
import { useBreakpointDown } from "../../hooks/useBreakpointDown";

const SearchField = ({ onFilter, searchQuery }) => {
  const s = styles();
  const { t } = useTranslation(["discover", "tags"]);
  const isBreakpointSmPlusDown = useBreakpointDown("smPlus");

  const filterDebounced = debounce(() => {
    onFilter(searchQuery);
  }, 500);

  const onSearchChanged = (event) => {
    onFilter(event.target.value); // Directly pass value to parent
  };

  return (
    <div className={clsx(s.inputContainer)}>
      <SearchIcon
        classes={{ root: s.searchIcon }}
        style={{ fontSize: 20 }}
      ></SearchIcon>
      <input
        className={s.input}
        value={searchQuery || ""}
        onChange={onSearchChanged}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchField;
