import PrimaryNavbar from './PrimaryNavbar'
import SecondaryNav from './SecondaryNav'
import styles from '../../../styles/userStyle/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <PrimaryNavbar />
      <SecondaryNav />
    </header>
  )
}

export default Header
