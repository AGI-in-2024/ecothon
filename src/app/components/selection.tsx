"use client";
import React from 'react';
import { Stack } from "./stack";
import styles from "@/styles/selection.module.scss"

interface Card {
    id: number;
    image: string;
    title: string;
    transform: string
}

export const Selection: React.FC = () => {
    const initialCards: Card[] = [
        { id: 1, image: require('@/img/1.png'), title: '🧇', transform: '' },
        { id: 2, image: require('@/img/2.jpg'), title: '🥞', transform: '' },
        { id: 3, image: require('@/img/3.jpg'), title: '🍩', transform: '' },
    ];

    return (
        <div className={styles['selection-container']}>
            <Stack onVote={(item: any, vote) => console.log(item.props, vote)}>
                {initialCards.map((card: Card) => {
                    let rotation = Math.random() * (10 - -10) + -10;
                    card.transform = `rotate(${rotation}deg)`
                    return (
                        <div className={styles['selection-item']} style={{ transform: card.transform }} data-value="waffles" >
                            {card.title}
                        </div>
                    )
                })}
            </Stack>
        </div>
    );
};