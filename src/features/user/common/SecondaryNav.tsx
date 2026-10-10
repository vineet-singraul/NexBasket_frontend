import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Box, Typography } from '@mui/material'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import styles from '../../../styles/userStyle/Header.module.css'
import type { CategoryListItem } from '../../owner/types/category.types.ts'
import { useNavigate } from 'react-router-dom'

interface SecondaryNavProps {
  categories: CategoryListItem[]
}

const SecondaryNav = ({ categories }: SecondaryNavProps) => {
  const navigate = useNavigate()
  const navRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const isHidden = useRef(false)
  const navHeight = useRef(0)
  const tweenRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const el = navRef.current
    if (!el) return

    navHeight.current = el.offsetHeight
    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      const scrollingDown = currentY > lastScrollY.current

      if (scrollingDown && !isHidden.current) {
        isHidden.current = true
        tweenRef.current?.kill()
        tweenRef.current = gsap
          .timeline()
          .to(el, { autoAlpha: 0, duration: 0.12, ease: 'power1.out' })
          .to(el, { height: 0, duration: 0.15, ease: 'power2.out' }, 0.05)
      } else if (!scrollingDown && isHidden.current) {
        isHidden.current = false
        tweenRef.current?.kill()
        tweenRef.current = gsap
          .timeline()
          .to(el, { height: navHeight.current, duration: 0.15, ease: 'power2.out' })
          .to(el, { autoAlpha: 1, duration: 0.15, ease: 'power1.out' }, 0.05)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      tweenRef.current?.kill()
    }
  }, [])

  const handleClickGetProductsByCategoryId = (categoryId : string) => {
    navigate(`/showCategoryofProduct/${categoryId}`)
  }

  return (
    <Box
      ref={navRef}
      className={styles.secondaryNav}
      sx={{ overflowY: 'hidden', display: { xs: 'none', sm: 'flex' } }}
    >
      <Box className={`${styles.navItem} ${styles.active}`}>
        <Box className={styles.iconBox}>
          <ShoppingBagOutlinedIcon className={styles.navIcon} />
        </Box>
        <Typography className={styles.navLabel}>For You</Typography>
      </Box>

      {categories.map(({ _id, name, image }) => (
        <Box key={_id} className={styles.navItem}
         onClick={() => {handleClickGetProductsByCategoryId(_id)}}
        >
          <Box className={styles.iconBox}>
            {image ? (
              <img src={image} alt={name} className={styles.navImage} />
            ) : (
              <CategoryOutlinedIcon className={styles.navIcon} />
            )}
          </Box>
          <Typography className={styles.navLabel}>{name}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default SecondaryNav
