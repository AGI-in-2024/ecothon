import React, { useState, Children, ReactNode } from "react";
import styles from "@/styles/selection.module.scss"
import { Card } from "./card";
import { HeartFill, X } from '@geist-ui/icons'


interface StackProps {
  onVote: (item: ReactNode, vote: boolean) => void;
  children: ReactNode;
}

export const Stack: React.FC<StackProps> = ({ onVote, children, ...props }) => {
  const [stack, setStack] = useState<any>(Children.toArray(children));
  const [choose, setChoose] = useState<any>(undefined);

  const pop = (array: any) => {
    return array.filter((_: any, index: any) => {
      return index < array.length - 1
    })
  }

  const handleVote = (item: any, vote: any) => {
    setChoose(undefined)
    let newStack = pop(stack)
    setStack(newStack)
    onVote(item, vote)
  }

  return (
    <>
      <div className={styles['selection-frame']} {...props}>
        {stack.map((item: any, index: number) => {
          let isTop = index === stack.length - 1
          return (
            <Card
              drag={isTop}
              choose={(isTop) ? choose : undefined}
              key={(item.key || index) + item.choose}
              onVote={(result: any) => handleVote(item, result)}
            >
              {item}
            </Card>
          )
        })}
        <div className={styles['selection-buttons']}>
          <div className={styles['selection-reject']} onClick={() => { setChoose('left') }}>
            <X color="red" />
          </div>
          <div className={styles['selection-accept']} onClick={() => { setChoose('right') }}>
            <HeartFill color="green" />
          </div>
        </div>
      </div>
    </>
  )
}
