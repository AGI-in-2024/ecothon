"use client";
import React from 'react';
import { Stack } from "./stack";
import styles from "@/styles/selection.module.scss"

interface Card {
    id: number;
    image: string;
    title: string;
}

const initialCards: Card[] = [
    { id: 1, image: require('@/img/1.png'), title: 'Карточка 1' },
    { id: 2, image: require('@/img/2.jpg'), title: 'Карточка 2' },
    { id: 3, image: require('@/img/3.jpg'), title: 'Карточка 3' },
];

export const Selection: React.FC = () => {
    const transform = (): any => {
        let rotation = Math.random() * (5 - -5) + -5;
        return `rotate(${rotation}deg)`;
    }
    return (
        <Stack onVote={(item: any, vote) => console.log(item.props, vote)}>
            <div className={styles['selection-item']} style={{ transform: transform }} data-value="waffles" whileTap={{ scale: 1.15 }}>
                🧇
            </div>
            <div data-value="pancakes" whileTap={{ scale: 1.15 }}>
                🥞
            </div>
            <div data-value="donuts" whileTap={{ scale: 1.15 }}>
                🍩
            </div>
        </Stack>
    );
};