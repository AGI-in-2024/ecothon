import React, { useState } from 'react';
import { Input, Select, Tags } from './ui';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/sidebar.module.scss';
import Search from '@geist-ui/icons/search';

interface SidebarProps {
  onFilter: (search: string, category: string[], dateFrom: Date | null, dateTo: Date | null, tags: string[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilter(e.target.value, category, dateFrom, dateTo, tags);
  };

  const handleCategoryChange = (selected: string[]) => {
    setCategory(selected);
    onFilter(search, selected, dateFrom, dateTo, tags);
  };

  const handleDateFromChange = (date: Date | null) => {
    setDateFrom(date);
    onFilter(search, category, date, dateTo, tags);
  };

  const handleDateToChange = (date: Date | null) => {
    setDateTo(date);
    onFilter(search, category, dateFrom, date, tags);
  };

  const categoryOptions = [
    { title: 'Все', value: 0 },
    { title: 'Категория 1', value: 1 },
    { title: 'Категория 2', value: 2 },
    { title: 'Категория 3', value: 3 },
    { title: 'Категория 4', value: 4 }
  ];

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    onFilter(search, category, dateFrom, dateTo, newTags);
  };

  return (
    <div className={styles.sidebar}>
      <Input
        value={search}
        onChange={handleSearchChange}
        placeholder="Поиск..."
        icon={<Search color='#202221' />}
      />
      <Select
        list={categoryOptions}
        placeholder={{ title: 'Все', value: 0 }}
        multiple
        onChange={handleCategoryChange}
      />
      <div className={styles['date-input']}>
        <DatePicker
          selected={dateFrom}
          onChange={handleDateFromChange}
          placeholderText="Начало"
          className="date-picker"
        />
        <DatePicker
          selected={dateTo}
          onChange={handleDateToChange}
          placeholderText="Конец"
          className="date-picker"
        />
      </div>
      <Tags tags={tags} onChange={handleTagsChange} />
    </div>
  );
};