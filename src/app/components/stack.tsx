import React, { useState, Children, ReactNode } from "react";
import styles from "@/styles/selection.module.scss"
import { Card } from "./card";

interface StackProps {
  onVote: (item: ReactNode, vote: boolean) => void;
  children: ReactNode;
}

export const Stack: React.FC<StackProps> = ({ onVote, children, ...props }) => {
  const [stack, setStack] = useState(Children.toArray(children));

  const pop = (array: any) => {
    return array.filter((_: any, index: any) => {
      return index < array.length - 1
    })
  }

  const handleVote = (item: any, vote: any) => {
    let newStack = pop(stack)
    setStack(newStack)

    onVote(item, vote)
  }

  return (
    <>
      <div className={styles['selection-frame']} {...props}>
        {stack.map((item: any, index) => {
          let isTop = index === stack.length - 1
          return (
            <Card
              drag={isTop}
              key={item.key || index}
              onVote={(result: any) => handleVote(item, result)}
            >
              {item}
            </Card>
          )
        })}
      </div>
    </>
  )
}
