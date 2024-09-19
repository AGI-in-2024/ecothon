"use client";
import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import { Button } from './ui';
import Link from 'next/link'
import { Sidebar } from './sidebar';
import { Activity, HeartFill } from '@geist-ui/icons'
import PlacemarkIcon from '@/icons/placemark.png';
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
    const data: PlacemarkData[] = [
      { id: 1, coords: [55.751574, 37.573856], name: 'Метка 1', category: 'Категория 1' },
      { id: 2, coords: [55.751244, 37.6173], name: 'Метка 2', category: 'Категория 2' },
      { id: 3, coords: [55.7558, 37.573856], name: 'Метка 1', category: 'Категория 1' },
      { id: 4, coords: [55.752, 37.6175], name: 'Метка 2', category: 'Категория 2' },
      { id: 5, coords: [55.7403, 37.6171], name: 'Метка 1', category: 'Категория 1' },
      { id: 6, coords: [55.7315, 37.6010], name: 'Метка 2', category: 'Категория 2' },
      { id: 7, coords: [55.8040, 37.6340], name: 'Метка 2', category: 'Категория 2' },
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
    setFilteredPlacemarks(filtered);
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles['button-group']}>
        <Link href={`/selection`}><Button label='Подбор' icon={<Activity color='#fff' />} /></Link>
        <Link href={`/favourite`}><Button label='Избранное' icon={<HeartFill color='#fff' />} /></Link>
      </div>
      <Sidebar onFilter={handleFilter} />
      <div className={styles.content}>
        <YMaps>
          <Map defaultState={{ center: [55.751574, 37.573856], zoom: 10, controls: [] }} width="100%" height="100vh">
            {filteredPlacemarks.map((placemark) => (
              <Placemark key={placemark.id} geometry={placemark.coords} properties={{ balloonContent: placemark.name }}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: PlacemarkIcon.src,
                  iconImageSize: [30, 30],
                  iconImageOffset: [-15, -15]
                }} />
            ))}
            <ZoomControl options={{ position: { right: 10, top: 10 } }} />
          </Map>
        </YMaps>
      </div>
    </div>
  );
};