"use client";
import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import { Button } from './ui';
import { Sidebar } from './sidebar';
import { Activity, HeartFill } from '@geist-ui/icons'
import styles from '../styles/map.module.scss';

interface PlacemarkData {
  id: number;
  coords: number[];
  name: string;
  category: string;
}

export const YandexMap: React.FC = () => {
  const [placemarks, setPlacemarks] = useState<PlacemarkData[]>([]);
  const [filteredPlacemarks, setFilteredPlacemarks] = useState<PlacemarkData[]>([]);

  useEffect(() => {
    // Загрузка меток (пример данных)
    const data: PlacemarkData[] = [
      { id: 1, coords: [55.751574, 37.573856], name: 'Метка 1', category: 'Категория 1' },
      { id: 2, coords: [55.751244, 37.618423], name: 'Метка 2', category: 'Категория 2' },
      // ... другие метки
    ];
    setPlacemarks(data);
    setFilteredPlacemarks(data);
  }, []);

  const handleFilter = (search: string, category: string[], dateFrom: Date | null, dateTo: Date | null, tags: string[]) => {
    let filtered = placemarks;
    if (search) {
      filtered = filtered.filter((placemark) =>
        placemark.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category[0] !== undefined && category[0] !== 'Все') {
      filtered = filtered.filter((placemark) => category.includes(placemark.category));
    }
    // Add date and tag filtering logic here if needed
    setFilteredPlacemarks(filtered);
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles['button-group']}>
        <Button label='Подбор' icon={<Activity color='#fff' />} />
        <Button label='Избранное' icon={<HeartFill color='#fff' />} />
      </div>
      <Sidebar onFilter={handleFilter} />
      <div className={styles.content}>
        <YMaps>
          <Map defaultState={{ center: [55.751574, 37.573856], zoom: 10, controls: [] }} width="100%" height="100vh">
            {filteredPlacemarks.map((placemark) => (
              <Placemark key={placemark.id} geometry={placemark.coords} properties={{ balloonContent: placemark.name }} />
            ))}
            <ZoomControl options={{ float: "right" }} />
          </Map>
        </YMaps>
      </div>
    </div>
  );
};