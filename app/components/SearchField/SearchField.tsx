import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { styles } from "./searchField.css";
import { useBreakpointDown } from "../../hooks/useBreakpointDown";
import { debounce } from "@material-ui/core/utils";
import {
  Collapse,
  Divider,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const SearchField = ({ onFilter, activeTab, tags = null, tagPlaceholder }) => {
  const s = styles();
  const { t } = useTranslation(["discover", "tags"]);
  const isBreakpointSmPlusDown = useBreakpointDown("smPlus");

  const initCategoryTags = [
    { name: t("tags:oil"), selected: false, id: "oil" },
    { name: t("tags:acrylic"), selected: false, id: "acrylic" },
    { name: t("tags:NFT"), selected: false, id: "NFT" },
    { name: t("tags:aquarelle"), selected: false, id: "aquarelle" },
    { name: t("tags:photography"), selected: false, id: "photography" },
    { name: t("tags:sculpture"), selected: false, id: "sculpture" },
    { name: t("tags:nude"), selected: false, id: "nude" },
  ];

  useEffect(() => {
    if (tags !== null) {
      resetCategoryTags();
    }
  }, [isBreakpointSmPlusDown]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [categoryTags, setCategoryTags] = useState([]);
  const [dropdownTags, setDropdownTags] = useState(tags);
  const [moreSelectValue, setMoreSelectValue] = useState("");

  const filterDebounced = debounce(() => {
    onFilter(selectedTag ? [selectedTag] : [], searchQuery);
  }, 500);

  useEffect(() => {
    filterDebounced();
  }, [searchQuery, selectedTag]);

  const resetCategoryTags = () => {
    if (isBreakpointSmPlusDown) {
      setSelectedTag("");
      setCategoryTags([]);
    } else {
      const filteredTags = tags.filter(
        (t) => !initCategoryTags.some((categoryTag) => categoryTag.id === t)
      );
      setDropdownTags(filteredTags);
      setCategoryTags(initCategoryTags);
    }
  };

  const setCategoryTagSelected = (index) => {
    if (categoryTags[index].selected) {
      setCategoryTags([...initCategoryTags]);
    } else {
      const current = initCategoryTags;
      current[index].selected = !current[index].selected;
      setCategoryTags([...current]);
    }

    setMoreSelectValue("");

    const selectedCategoryTag = categoryTags[index];
    if (!selectedCategoryTag.selected) {
      setSelectedTag(selectedCategoryTag.id);
    } else {
      setSelectedTag("");
    }
  };

  const onSelectMoreChange = (e) => {
    resetCategoryTags();
    setMoreSelectValue((e as any).target.value);
    setSelectedTag(e.target.value);
  };
  const deselectMore = (_) => {
    setMoreSelectValue("");
    setSelectedTag("");
  };

  const onSearchChanged = (event) => {
    searchDebounced(event);
  };

  const searchDebounced = debounce((event) => {
    setSearchQuery(event.target.value);
  }, 500);

  function handleClickListingPages(event) {
    setOpenListingPages(!openListingPages);
    event.stopPropagation();
  }
  const [sold, setSold] = useState("");
  const [openListingPages, setOpenListingPages] = useState(false);

  return (
    <div className={clsx(s.inputContainer)}>
      <SearchIcon
        classes={{ root: s.searchIcon }}
        style={{ fontSize: 20 }}
      ></SearchIcon>
      <input
        onChange={onSearchChanged}
        placeholder={"Sök " + t(`tags:${tagPlaceholder}`).toLocaleLowerCase()}
        className={s.input}
      ></input>
    </div>
  );
};

export default SearchField;
