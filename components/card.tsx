import React, { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import styles from "@/styles/selection.module.scss"


interface CardProps {
    children: ReactNode;
    style?: React.CSSProperties;
    onVote: (vote: boolean) => void;
    id?: string;
    choose?: any;
}

export const Card: React.FC<CardProps> = ({ children, style, onVote, id, choose, ...props }) => {
    const cardElem = useRef<any>(null);

    const x = useMotionValue(0);
    const controls = useAnimation();

    const [constrained, setConstrained] = useState(true);

    const [direction, setDirection] = useState<any>();

    const [velocity, setVelocity] = useState<any>();


    const getVote = (childNode: any, parentNode: any) => {
        const childRect = childNode.getBoundingClientRect();
        const parentRect = parentNode.getBoundingClientRect();
        let result =
            parentRect.left >= childRect.right
                ? false
                : parentRect.right <= childRect.left
                    ? true
                    : undefined;
        return result;
    };

    const getDirection = (): any => {
        return velocity >= 1 ? "right" : velocity <= -1 ? "left" : undefined;
    };

    const getTrajectory = () => {
        if (x.getVelocity() !== 0)
            setVelocity(x.getVelocity());
        setDirection(getDirection());
    };

    const flyAway = (min: any, ignore_velocity?: boolean, directionInit?: string) => {
        const flyAwayDistance = (direction: any) => {
            const parentWidth = cardElem.current.parentNode.getBoundingClientRect()
                .width;
            const childWidth = cardElem.current.getBoundingClientRect().width;
            return direction === "left"
                ? -parentWidth / 2 - childWidth / 2
                : parentWidth / 2 + childWidth / 2;
        };
        const directionMain = (direction === undefined) ? directionInit : direction;
        if ((directionMain && Math.abs(velocity) > min) || (directionMain && ignore_velocity === true)) {
            setConstrained(false);
            controls.start({
                x: flyAwayDistance(directionMain)
            });
        }
    };

    useEffect(() => {
        const unsubscribeX = x.onChange(() => {
            if (cardElem.current) {
                const childNode = cardElem.current;
                const parentNode = cardElem.current.parentNode;
                const result = getVote(childNode, parentNode);
                result !== undefined && onVote(result);
            }
        });

        return () => unsubscribeX();
    });

    useEffect(() => {
        if (choose) {
            flyAway(10, true, choose);
        }
    }, [choose]);


    return (
        <>
            <motion.div
                className={styles['selection']}
                animate={controls}
                dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                ref={cardElem}
                style={{ x }}
                onDrag={getTrajectory}
                onDragEnd={() => flyAway(10, true)}
                whileTap={{ scale: 1.1 }}
                {...props}
            >
                {children}
            </motion.div>
        </>
    );
};
