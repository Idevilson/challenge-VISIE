import styles from './styles.module.scss';

interface HeaderProps {
    headerTitle: string;
}

export function Header({ headerTitle }: HeaderProps) {

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <h1>
                    {headerTitle} 
                </h1>
            </div>
        </header>
    )
}