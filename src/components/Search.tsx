import React, { useEffect, useState } from 'react';

import { useSearch } from '../contexts/SearchContext';
interface CssProps {
  borderColor: string;
  fontSize: string;
  width: string;
  borderRadius?: string;
  paddingX?: string;
  paddingY?: string;
}
interface SearchProps<T> {
  dataToFilter: Array<T>;
  Css: CssProps;
}

const Search = <T extends {}>({ dataToFilter, Css }: SearchProps<T>) => {
  const customCss = {
    border: `${Css.borderColor} ` || ' 1px solid #000',
    fontSize: Css.fontSize || '1.5rem',
    width: Css.width || '3rem',
    borderRadius: Css.borderRadius || '0.5rem',
    padding: `${Css.paddingY || '0.5rem'}$ , ${Css.paddingX || '0.5rem'}`,
  };

  let filteredDataArray: T[] = [];

  const { setFilteredData } = useSearch();
  const [searchTerm, setSearchTerm] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterSearchedItems = (
    searchTerm: string,
    dataToFilter: Array<any>
  ) => {
    filteredDataArray = dataToFilter.filter(elem => {
      return elem.name.toLowerCase().includes(searchTerm);
    });
  };

  useEffect(() => {
    searchTerm
      ? filterSearchedItems(searchTerm, dataToFilter)
      : filterSearchedItems('', dataToFilter);
    setFilteredData(filteredDataArray);
  }, [searchTerm]);
  return (
    <div className="flex flex-col ">
      <input
        type="text"
        onChange={onChange}
        value={searchTerm}
        style={{ ...customCss }}
        placeholder="Search"
      />
    </div>
  );
};
export default Search;
