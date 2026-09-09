import { Avatar, Button, Card, Chip, Typography } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import styles from '../../../../styles/ownerStyle/Dashboard.module.css'
import type { OwnerListedStoreProps } from '../../types/dashboard.types.js'
import { useEffect, useState } from 'react'
import { apiGet } from '../../../../api/userApi.js'
import { AUTH_ENDPOINTS } from '../../../../api/endpoints.js'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types.js'
import Notification from '../../../../utils/Notification.js'
import Loader from '../../../../utils/Loader.js'
import { useNavigate } from 'react-router-dom'

interface Owner {
  id: string
  fullName: string
  email: string
  mobile: string
  role: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

const OwnerListedStore = (_props: OwnerListedStoreProps) => {
  const [Owner, setOwner] = useState<Owner | null>(null)
  const [loading, setLoading] = useState<boolean | null>(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const navigate = useNavigate()

  const activeStores = _props.listedStoreDetails?.filter((store) => store.active).length ?? 0
  const avtarName = Owner?.fullName
    .split(' ')
    .map((nm) => nm[0])
    .join('')
    .toUpperCase()

  const fatchOwnerDetails = async () => {
    setLoading(true)
    try {
      const response = await apiGet<{ user: Owner }>(AUTH_ENDPOINTS.ME)
      if (!response) {
        setNotification({
          open: true,
          message: 'store can not be load !! please try latter ',
          severity: 'info',
        })
        return
      }
      setOwner(response?.user)
    } catch (error) {
      setNotification({
        open: true,
        message: error instanceof Error ? error.message : 'something went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!_props) return
    let isActive = true
    void Promise.resolve().then(() => fatchOwnerDetails())
    return () => {
      isActive = false
    }
  }, [_props])

  return (
    <div className={styles.olsWrap}>
      {/* ===================== Laptop / desktop layout ===================== */}
      <div className={styles.olsDesktop}>
        <div className={styles.olsHero}>
          <div className={styles.olsAvatarWrap}>
            <Avatar className={styles.olsAvatar}>{avtarName}</Avatar>
            {Owner?.isVerified && (
              <span className={styles.olsVerifiedBadge}>
                <CheckRoundedIcon sx={{ fontSize: 14 }} />
              </span>
            )}
          </div>

          <div className={styles.olsHeroInfo}>
            <Typography className={styles.olsOwnerName}>{Owner?.fullName}</Typography>
            <Chip
              icon={<StarRoundedIcon sx={{ fontSize: '14px !important' }} />}
              label={Owner?.role}
              size="small"
              className={styles.olsRoleChip}
            />
            <div className={styles.olsContacts}>
              <span className={styles.olsContactItem}>
                <EmailOutlinedIcon fontSize="small" /> {Owner?.email}
              </span>
              <span className={styles.olsContactItem}>
                <LocalPhoneOutlinedIcon fontSize="small" /> {Owner?.mobile}
              </span>
            </div>
          </div>

          <div className={styles.olsHeroMeta}>
            <Typography className={styles.olsSince}>
              Member since <b>{Owner?.createdAt}</b>
            </Typography>
            <Button className={styles.olsEditBtn} variant="contained" disableElevation>
              Edit profile
            </Button>
          </div>
        </div>

        <div className={styles.olsSummary}>
          <div className={styles.olsSummaryItem}>
            <div className={styles.olsSummaryLabel}>Total sales</div>
            <div className={`${styles.olsSummaryValue}`}>₹ 0</div>
          </div>
          <div className={styles.olsSummaryItem}>
            <div className={styles.olsSummaryLabel}>Stores</div>
            <div className={`${styles.olsSummaryValue}`}>🏪{_props.listedStoreDetails?.length}</div>
          </div>
          <div className={styles.olsSummaryItem}>
            <div className={styles.olsSummaryLabel}>Account status</div>
            <div className={`${styles.olsSummaryValue}`}>
              {Owner?.isVerified ? '🟢' : '🔴'}
              {Owner?.isVerified ? 'Active' : 'Inactive'}
            </div>
          </div>
          <div className={styles.olsSummaryItem}>
            <div className={styles.olsSummaryLabel}>Active stores</div>
            <div className={`${styles.olsSummaryValue}`}>
              {_props.listedStoreDetails?.length} / {activeStores}
            </div>
          </div>
        </div>

        <div className={styles.olsSectionHead}>
          <Typography className={styles.olsSectionTitle}>Stores you manage</Typography>
          <span className={styles.olsSectionCount}>{_props.listedStoreDetails?.length} stores</span>
        </div>

        <div className={styles.olsStoreGrid}>
          {_props.listedStoreDetails?.map((item, index) => (
            <Card key={index} elevation={0} className={styles.olsStoreCard}>
              <div
                className={styles.olsStoreBanner}
                style={{ backgroundImage: `url(${item.banner})` }}
              >
                <span className={styles.olsStoreStatus}>
                  <span className={styles.olsStatusDot} />
                  {item.active}
                </span>
                <Avatar src={item.logo} className={styles.olsStoreLogo}>
                  {item.logo}
                </Avatar>
              </div>

              <div className={styles.olsStoreBody}>
                <Typography className={styles.olsStoreName}>{item.storeName}</Typography>
                <Typography className={styles.olsStoreDesc}>{item.description}</Typography>

                <div className={styles.olsStoreInfo}>
                  <div className={styles.olsStoreInfoRow}>
                    <LocationOnOutlinedIcon fontSize="small" />
                    {item.address.city},{item.address.street},{item.address.state},
                    {item.address.country},{item.address.pincode}
                  </div>
                  <div className={styles.olsStoreInfoRow}>
                    <ArticleOutlinedIcon fontSize="small" />
                    {item.owner}
                  </div>
                </div>

                <div className={styles.olsStoreStats}>
                  <div className={styles.olsStatGroup}>
                    <div className={styles.olsMiniStat}>
                      <span className={styles.olsMiniN}>0</span>
                      <span className={styles.olsMiniL}>Sales</span>
                    </div>
                    <div className={styles.olsMiniStat}>
                      <span className={styles.olsMiniN}>0</span>
                      <span className={styles.olsMiniL}>Rating</span>
                    </div>
                  </div>
                  <Button className={styles.olsManageBtn} size="small">
                    Manage store
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <div className={styles.olsAddStore}>
            <span className={styles.olsAddPlus}>
              <AddRoundedIcon />
            </span>
            <Typography className={styles.olsAddTitle}>Register a new store</Typography>
            <Typography className={styles.olsAddSub}>
              Add another store under your account
            </Typography>
          </div>
        </div>
      </div>

      {/* ===================== Mobile layout ===================== */}
      <div className={styles.olsMobile}>
        <div className={styles.olsMProfile}>
          <div className={styles.olsMAvatarRing}>
            <Avatar className={styles.olsMAvatar}>{avtarName}</Avatar>
            {Owner?.isVerified && (
              <span className={styles.olsMVerified}>
                <CheckRoundedIcon sx={{ fontSize: 12 }} />
              </span>
            )}
          </div>
          <Typography className={styles.olsMName}>{Owner?.fullName}</Typography>
          <Chip label={`★ ${Owner?.role}`} size="small" className={styles.olsMRoleChip} />
          <Typography className={styles.olsMSince}>Member since {Owner?.createdAt}</Typography>
        </div>

        <div className={styles.olsMStatsRow}>
          <div className={styles.olsMStatTile}>
            <div className={styles.olsMStatN}>🏪{_props.listedStoreDetails?.length}</div>
            <div className={styles.olsMStatL}>Stores</div>
          </div>
          <div className={styles.olsMStatTile}>
            <div className={styles.olsMStatN}>₹ 0</div>
            <div className={styles.olsMStatL}>Total sales</div>
          </div>
          <div className={styles.olsMStatTile}>
            <div className={styles.olsMStatN}>
              {Owner?.isVerified ? '🟢' : '🔴'}
              {Owner?.isVerified ? 'Active' : 'Inactive'}
            </div>
            <div className={styles.olsMStatL}>Active</div>
          </div>
        </div>

        <Typography className={styles.olsMSectionLabel}>Contact details</Typography>
        <div className={styles.olsMContactCard}>
          <div className={styles.olsMContactRow}>
            <span className={styles.olsMContactIcon}>
              <EmailOutlinedIcon fontSize="small" />
            </span>
            <div className={styles.olsMContactText}>
              <div className={styles.olsMContactK}>Email</div>
              <div className={styles.olsMContactV}>{Owner?.email}</div>
            </div>
            <ChevronRightRoundedIcon className={styles.olsMChev} fontSize="small" />
          </div>
          <div className={styles.olsMContactRow}>
            <span className={styles.olsMContactIcon}>
              <LocalPhoneOutlinedIcon fontSize="small" />
            </span>
            <div className={styles.olsMContactText}>
              <div className={styles.olsMContactK}>Mobile</div>
              <div className={styles.olsMContactV}>{Owner?.mobile}</div>
            </div>
            <ChevronRightRoundedIcon className={styles.olsMChev} fontSize="small" />
          </div>
        </div>

        <div className={styles.olsMSectionLabelRow}>
          <Typography className={styles.olsMSectionLabel} style={{ marginBottom: 0 }}>
            Your stores
          </Typography>
          <span className={styles.olsMSeeAll}>See all</span>
        </div>

        <div className={styles.olsMStoreList}>
          {_props.listedStoreDetails?.map((store) => (
            <div className={styles.olsMStoreTile} key={store._id}>
              <div className={styles.olsMStoreThumbWrap}>
                <Avatar src={store.logo} variant="rounded" className={styles.olsMStoreThumb}>
                  {avtarName}
                </Avatar>
                <span className={styles.olsMBadge} />
              </div>
              <div className={styles.olsMStoreTileText}>
                <div className={styles.olsMStoreTileName}>{store.storeName}</div>
                <div className={styles.olsMStoreTileLoc}>
                  {store.address.city},{store.address.pincode}
                </div>
                <div className={styles.olsMStoreTileStats}>
                  <span>0 sales</span>
                  <span>&middot;</span>
                  <span>No ratings yet</span>
                </div>
              </div>
              <ChevronRightRoundedIcon
                className={styles.olsMChev}
                fontSize="small"
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/owner/Products')
                }}
              />
            </div>
          ))}
        </div>

        <Button
          fullWidth
          className={styles.olsMEditBtn}
          variant="contained"
          disableElevation
          onClick={() => {
            navigate('/owner/stores/add')
          }}
          startIcon={<AddRoundedIcon fontSize="small" />}
        >
          Register a new store
        </Button>
      </div>

      {notification && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => {
            setNotification(null)
          }}
        />
      )}

      {loading && <Loader />}
    </div>
  )
}

export default OwnerListedStore
