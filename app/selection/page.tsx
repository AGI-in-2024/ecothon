import { Selection } from '@/components/selection';
import styles from "@/styles/selection.module.scss"

export default function Home() {
    return (
        <main className={styles['selection-page']}>
            <Selection />
        </main>
    );
}