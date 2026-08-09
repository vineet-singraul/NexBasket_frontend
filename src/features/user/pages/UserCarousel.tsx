

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../../../styles/userStyle/carousel.module.css";

export interface CarouselItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
}

interface UserCarouselProps {
  items: CarouselItem[];
  /** Index to start on. Defaults to the middle item. */
  startIndex?: number;
  /** Auto-advance interval in ms. Omit or set 0 to disable. */
  autoPlayInterval?: number;
}

const VISIBLE_RANGE = 2; // how many cards show on each side of the active card

const UserCarousel: React.FC<UserCarouselProps> = ({
  items,
  startIndex,
  autoPlayInterval = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(
    startIndex ?? Math.floor(items.length / 2)
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const next = (index + items.length) % items.length;
      setActiveIndex(next);
    },
    [items.length]
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Autoplay
  useEffect(() => {
    if (!autoPlayInterval) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlayInterval, items.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  // Shortest signed distance between two indices on a circular track
  const getOffset = (index: number) => {
    const len = items.length;
    let diff = index - activeIndex;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  };

  return (
    <div className={styles.carousel}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.stage}>
        {items.map((item, index) => {
          const offset = getOffset(index);
          const abs = Math.abs(offset);

          if (abs > VISIBLE_RANGE) return null;

          const isActive = offset === 0;
          const translateX = offset * 62; // % of card width, controls spacing
          const scale = isActive ? 1 : 1 - abs * 0.14;
          const opacity = isActive ? 1 : 1 - abs * 0.32;
          const zIndex = 10 - abs;

          return (
            <div
              key={item.id}
              className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
              style={{
                transform: `translateX(${translateX}%) scale(${scale})`,
                opacity,
                zIndex,
              }}
              onClick={() => !isActive && goTo(index)}
              aria-hidden={!isActive}
            >
              <img
                src={item.image}
                alt={item.title}
                className={styles.cardImage}
                draggable={false}
              />
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={goNext}
        aria-label="Next slide"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.dots}>
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.dot} ${
              index === activeIndex ? styles.dotActive : ""
            }`}
            onClick={() => goTo(index)}
            aria-label={`Go to ${item.title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default UserCarousel;