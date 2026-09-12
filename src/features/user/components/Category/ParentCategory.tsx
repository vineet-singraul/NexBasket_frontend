import { useState } from 'react'
import styles from '../../../../styles/userStyle/Category.module.css'
import { type MainCategoryProps } from '../../types/category.types.ts'

const ALL_CATEGORY_ID = 'all'
const ALL_CATEGORY_IMAGE = 'https://picsum.photos/seed/nb-all/88'

interface ParentCategoryProps extends MainCategoryProps {
  onCategoryChange?: (id: string) => void
}

const ParentCategory = ({ categories, onCategoryChange }: ParentCategoryProps) => {
  const [activeId, setActiveId] = useState(ALL_CATEGORY_ID)

  const handleFilterCategory = (id: string) => {
    setActiveId(id)
    onCategoryChange?.(id)
  }

  return (
    <nav className={styles.parentNav} aria-label="Product categories">
      <button
        type="button"
        className={`${styles.categoryItem} ${activeId === ALL_CATEGORY_ID ? styles.categoryItemActive : ''}`}
        onClick={() => {
          handleFilterCategory(ALL_CATEGORY_ID)
        }}
      >
        <span className={styles.categoryIconWrap}>
          <img src={ALL_CATEGORY_IMAGE} alt="" className={styles.categoryIcon} />
        </span>
        <span
          className={`${styles.categoryLabel} ${activeId === ALL_CATEGORY_ID ? styles.categoryLabelActive : ''}`}
        >
          All
        </span>
      </button>

      {categories.map((category) => {
        const isActive = category._id === activeId

        return (
          <button
            key={category._id}
            type="button"
            className={`${styles.categoryItem} ${isActive ? styles.categoryItemActive : ''}`}
            onClick={() => {
              handleFilterCategory(category._id)
            }}
          >
            <span className={styles.categoryIconWrap}>
              <img src={category.image} alt="" className={styles.categoryIcon} />
            </span>
            <span className={`${styles.categoryLabel} ${isActive ? styles.categoryLabelActive : ''}`}>
              {category.name}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default ParentCategory
