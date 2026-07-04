import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../../styles/authStyle/auth.module.css'
import { auth } from '../../utils/firebase'
import { saveAuthSession } from '../../utils/authStorage'
import Loader from '../../utils/Loader'

const GoogleProviView = () => {
  const navigate = useNavigate()
  const currentUser = auth.currentUser

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin')
    }
  }, [currentUser, navigate])

  const handleContinue = useCallback(() => {
    if (!currentUser) return
    saveAuthSession({   
      fullName: currentUser.displayName ?? undefined,
      email: currentUser.email ?? undefined,
    })
    navigate('/')
  }, [currentUser, navigate])

  useEffect(() => {
    if (!currentUser) return
    const timer = setTimeout(handleContinue, 3000)
    return () => clearTimeout(timer)
  }, [currentUser, handleContinue])

  if (!currentUser) return null

  return (
    <div
      className={styles.googleProvider}
      style={{
        backgroundImage:
          "url('/GoogleImage.png')",
      }}
    >
      <div className={styles.overlay}></div>

      <div className={styles.userCard}>

        <h2>{currentUser.displayName}</h2>
        <p>{currentUser.email}</p>

        <Loader fullScreen={false} size={48} />
      </div>
    </div>
  );
};

export default GoogleProviView;
