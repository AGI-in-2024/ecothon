"use client";
import React, { useState } from 'react';
import styles from "@/styles/favourite.module.scss";
import Image from 'next/image';
import { HeartFill } from '@geist-ui/icons';

const events = [
    { id: 1, image: require('@/img/1.jpg'), date: '2023-09-01', title: 'Зеленая Москва: Экологический Фестиваль' },
    { id: 2, image: require('@/img/2.jpg'), date: '2023-09-05', title: 'Эко-Уикенд: Чистый Город' },
    { id: 3, image: require('@/img/3.jpg'), date: '2023-09-10', title: 'Сохраним Природу: Эко-Конференция' },
    { id: 4, image: require('@/img/1.jpg'), date: '2023-09-15', title: 'Чистый Город: Марафон' },
    { id: 5, image: require('@/img/2.jpg'), date: '2023-09-20', title: 'Эко-Выставка: Будущее' },
    { id: 6, image: require('@/img/3.jpg'), date: '2023-09-25', title: 'Зеленая Инициатива: Конкурс' },
];

export const Favourite = () => {
    const [likedEvents, setLikedEvents] = useState<number[]>([]);

    const toggleLike = (id: number) => {
        setLikedEvents(prev => 
            prev.includes(id) ? prev.filter(eventId => eventId !== id) : [...prev, id]
        );
    };

    return (
        <main className={styles['favourite-page']}>
            <div className={styles['event-grid']}>
                {events.map(event => (
                    <div key={event.id} className={styles['event-item']}>
                        <Image src={event.image} alt={event.title} className={styles['event-image']} />
                        <div className={styles['event-details']}>
                            <span className={styles['event-date']}>{event.date}</span>
                            <h3 className={styles['event-title']}>{event.title}</h3>
                        </div>
                        <div className={styles['heart-icon']} onClick={() => toggleLike(event.id)}>
                            <HeartFill color={likedEvents.includes(event.id) ? 'white' : 'red'} />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};