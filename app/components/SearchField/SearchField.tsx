import { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useTranslation } from "next-i18next";
import clsx from 'clsx'
import { styles } from './searchField.css'
import { useBreakpointDown } from '../../hooks/useBreakpointDown';
import { debounce } from '@material-ui/core/utils';



const SearchField = ({ onFilter, tags }) => {
  const s = styles();
  const { t } = useTranslation(['discover', 'tags']);
  const isBreakpointSmPlusDown = useBreakpointDown('smPlus');

  const initCategoryTags = [
    { name: t('tags:oil'), selected: false, id: "oil" },
    { name: t('tags:acrylic'), selected: false, id: "acrylic" },
    { name: t('tags:aquarelle'), selected: false, id: "aquarelle" },
    { name: t('tags:photography'), selected: false, id: "photography" },
    { name: t('tags:sculpture'), selected: false, id: "sculpture" },
    { name: t('tags:pastel'), selected: false, id: "pastel" }
  ];

  useEffect(() => {
    resetCategoryTags();
  }, [isBreakpointSmPlusDown]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [categoryTags, setCategoryTags] = useState([]);
  const [dropdownTags, setDropdownTags] = useState(tags);
  const [moreSelectValue, setMoreSelectValue] = useState("");
  
  // const filter = (tag) => {
  //   if(tag) {
  //     onFilter([tag], searchQuery);
  //   } else {
  //     onFilter([selectedTag], searchQuery);
  //   }
  // }

  const filterDebounced = debounce(() =>  {
    console.log("filter debounced");
    onFilter(null, searchQuery)
  }, 500)

  useEffect(() => {
    filterDebounced();
  }, [searchQuery, selectedTag]);

  const resetCategoryTags = () => {
    if(isBreakpointSmPlusDown) {
      setSelectedTag("");
      setCategoryTags([])
    } else {
      const filteredTags = tags.filter(t => !initCategoryTags.some(categoryTag => categoryTag.id === t));
      setDropdownTags(filteredTags);
      setCategoryTags(initCategoryTags);
    }
  }

  const setCategoryTagSelected = (index) => {
    if(categoryTags[index].selected) {
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
      // filter(selectedCategoryTag.id);
    } else {
      setSelectedTag("");
      // filter("");
    }

  }

  const onSelectMoreChange = (e) => {
    resetCategoryTags();
    setMoreSelectValue((e as any).target.value);
    setSelectedTag(e.target.value);
    // filter((e as any).target.value);
  }
  const deselectMore = (_) => {
    setMoreSelectValue("");
    setSelectedTag("");
    // filter("");
  }

  const onSearchChanged = (event) => {
    searchDebounced(event);
  }

  const searchDebounced = debounce((event) =>  {
    setSearchQuery(event.target.value);
  }, 500)
  
  return (
    <div className={s.inputContainer} tabIndex={0}>
      <SearchIcon classes={{ root: s.searchIcon }} style={{ fontSize: 30 }}></SearchIcon>
      <input onChange={onSearchChanged} placeholder={t('searchForArt')} className={s.input} ></input>
      <div className={s.tagsContainer}> 
        <ul className={s.categoryTags}>
          {categoryTags.map((tag, i) => 
              <li className={clsx(tag.selected && s.selected)} key={tag.name}>
                <Chip
                  onClick={(_) => setCategoryTagSelected(i)}
                  color={tag.selected ? "primary" : "default"}
                  label={tag.name}
                  className={s.categoryTag} />
              </li>
          )}
          <li className={s.moreLiElement}>
            {moreSelectValue === "" ? 
              <>
                <Chip
                  color={"default"}
                  label={t(isBreakpointSmPlusDown ? 'filter' : 'more')}
                  className={clsx(s.categoryTag, s.moreChip)} />
                <FormControl className={s.selectFormControl}>
                  <Select 
                    label={t(isBreakpointSmPlusDown ? 'filter' : 'more')} 
                    className={s.selectElement} 
                    native 
                    value={""}
                    onChange={onSelectMoreChange}
                  >
                    <option aria-label={t('none')} value={""}></option>
                    {dropdownTags.map((tag) => {
                      return <option key={tag} aria-label={t(`tags:${tag}`)} value={tag}>{t(`tags:${tag}`)}</option>
                    })}
                  </Select>
                </FormControl>
              </>
            :
              <Chip
                color={"primary"}
                label={t(`tags:${moreSelectValue}`)}
                onDelete={deselectMore}
                className={clsx(s.categoryTag)} />
            }
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchField;