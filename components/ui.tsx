import React, { useState, useRef, useEffect, useId } from 'react';
import styles from '../styles/ui.module.scss';
import Scrollbar from "react-scrollbars-custom";
import Image from 'next/image'

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, icon }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
      {icon && <div className={styles.icon}>{icon}</div>}
    </div>
  );
};

interface Option {
  title: string;
  value: number;
  single?: boolean;
}

interface SelectProps {
  list: Option[];
  placeholder: Option;
  defaultValue?: string[];
  label?: string;
  marginTop?: string;
  multiple?: boolean;
  onChange?: (selected: string[]) => void;
}

export const Select: React.FC<SelectProps> = ({ list, placeholder, defaultValue, label, marginTop, multiple, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState([placeholder]);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue === undefined)
      return

    let initValue: Option[] = []
    list.forEach((item) => {
      if (defaultValue?.includes(item.title))
        initValue.push({ title: item.title, value: item.value, single: item.single })
    })

    if (initValue.length !== 0)
      setValue([...initValue])
  }, [])

  const changeValue = (newValue: Option) => {
    if (multiple && !newValue.single) {
      let newList = [...value]
      newList = newList.filter((item) => item.single !== true)
      let index = newList.findIndex((item) => newValue.value === item.value)

      if (index !== -1) {
        newList.splice(index, 1)
        setValue(newList.length === 0 ? [placeholder] : [...newList])
      }
      else {
        setValue([...newList, newValue])
      }
    }
    else {
      setIsOpen(false)
      setValue([newValue])
    }
  }

  useEffect(() => {
    let values: string[] = []
    value.map((e) => {
      values.push(e.title)
    })
    onChange?.(values)
  }, [value])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !contentRef.current?.contains(target) && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  useEffect(() => {
    const placeholderEl = rootRef.current;
    if (!placeholderEl) return;

    const handleClick = (event: KeyboardEvent) => {
      if (event.key === 'Escape')
        setIsOpen(false)

      if (event.key === 'Enter')
        setIsOpen((prev) => !prev);
    };

    placeholderEl.addEventListener('keydown', handleClick);

    return () => {
      placeholderEl.removeEventListener('keydown', handleClick);
    };
  }, []);

  return (
    <div className={styles['select']} style={{ marginTop: marginTop ? marginTop : '0px' }}>
      {label && <label>
        {label}
      </label>}
      <div className={styles['select__content']}>
        <div className={styles['select-title']} onClick={e => setIsOpen(!isOpen)} ref={rootRef} tabIndex={0}>
          {value.map((item, i) => {
            if (value.length > 1 && item.value === 0)
              return;
            if (i < value.length - 1) {
              return (
                <span key={i}>{item.title}, </span>
              )
            }
            else {
              return (
                <span key={i}>{item.title}</span>
              )
            }
          })}
        </div>
        {isOpen && (
          <div className={styles['select-list']} ref={contentRef} style={{ height: list.length * 48 + "px" }}>
            <Scrollbar>
              {list.map((item, i) => {
                const checked = value.findIndex((e) => e.value === item.value) !== -1 ? true : false
                return (
                  <div key={i} className={styles['select-item']} onClick={e => changeValue(item)}>
                    {(multiple && !item.single) && <CheckboxInput checked={checked} />}
                    {item.title}
                  </div>
                )
              })}
            </Scrollbar>
          </div>
        )}
      </div>
    </div>
  );
};

export function CheckboxInput(props: {
  label?: string,
  checked?: boolean,
  onClick?: (value: boolean) => void
}) {
  const id = useId()

  const [checked, setChecked] = useState<boolean | undefined>(false)

  useEffect(() => {
    setChecked(props.checked)
  }, [props.checked])

  const handleCheckbox = (value: boolean) => {
    setChecked(!checked)
    props.onClick?.(value)
  }

  return (
    <div className={styles["checkbox"]}>
      <label htmlFor={id}>
        <input type="checkbox" id={id} checked={checked ? true : false} onChange={e => handleCheckbox(e.target.checked)} />
        <span className={styles["checked"]}>
          <Image
            src={require('@/icons/checked.svg')}
            alt=""
          />
        </span>
      </label>
      {props.label && <div className="checkbox-label">
        {props.label}
      </div>}
    </div>
  )
}

interface TagsProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export const Tags: React.FC<TagsProps> = ({ tags, onChange }) => {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      onChange([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    onChange(tags.filter(t => t !== tag));
  };

  return (
    <div className={styles.tagsContainer}>
      <div className={styles.tagsList}>
        {tags.map(tag => (
          <div key={tag} className={styles.tag}>
            {tag}
            <button onClick={() => handleRemoveTag(tag)}>x</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
        placeholder="Добавить тег"
      />
      <button onClick={handleAddTag}>Добавить</button>
    </div>
  );
};

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, icon }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {icon && <span className={styles['button-icon']}>{icon}</span>}
      {label}
    </button>
  );
};