import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import type {ProfilePopUpProps} from "../types/user.types"
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import styles from "../../../styles/userStyle/Header.module.css";
import { AUTH_ENDPOINTS } from "../../../api/endpoints";
import { apiPost } from "../../../api/userApi";
import type {NotificationInterfacce} from '../../../auth/types/auth.types'
import Loader from "../../../utils/Loader";
import Notification from "../../../utils/Notification";
import { clearAuthSession } from "../../../utils/authStorage";
import PasswordIcon from '@mui/icons-material/Password';

const buildMenuItems = (handleSingout: () => void, moveToChnagePasswordPage: () => void) => [
  {
    icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    text: "My Profile",
    onClick: ()=>{
        console.log("hiii")
    }
  },
  {
    icon: <WorkspacePremiumOutlinedIcon fontSize="small" />,
    text: "Flipkart Plus Zone",
    onClick: ()=>{
        console.log("hiii")
    }
  },
  {
    icon: <Inventory2OutlinedIcon fontSize="small" />,
    text: "Orders",
    onClick: ()=>{
        console.log("hiii")
    }
  },
  {
    icon: <FavoriteBorderOutlinedIcon fontSize="small" />,
    text: "Wishlist",
    onClick: ()=>{
        console.log("hiii")
    }
  },
  {
    icon: <StorefrontOutlinedIcon fontSize="small" />,
    text: "Become a Seller",
    onClick: ()=>{
        console.log("hiii")
    }
  },
  {
    icon: <CardGiftcardOutlinedIcon fontSize="small" />,
    text: "Rewards",
    onClick: ()=>{
        console.log("hiii")
    }
  },
  {
    icon: <CardGiftcardOutlinedIcon fontSize="small" />,
    text: "Gift Cards",
    onClick: ()=>{
        console.log("hiii")
    }
  },
  {
    icon: <NotificationsNoneOutlinedIcon fontSize="small" />,
    text: "Notification Preferences",
    onClick: ()=>{
        console.log("hiii")
    }
  },
  {
    icon: <SupportAgentOutlinedIcon fontSize="small" />,
    text: "24x7 Customer Care",
    onClick: ()=>{
        console.log("hiii")
    }
  },
  {
    icon: <PasswordIcon fontSize="small" />,
    text: "Chnage Password",
    onClick: ()=>{
        moveToChnagePasswordPage()
    }
  },
  {
    icon: <LogoutOutlinedIcon fontSize="small" />,
    text: "Sing out",
    onClick: ()=>{
       handleSingout()
    }
  },
];

const ProfilePopUp = ({ userDetails, setShowProfile }:ProfilePopUpProps) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false);
    const [notification, setNotification] = useState<NotificationInterfacce>({
        open:false,
        message:'',
        severity:'success'
    })

    const  handleSingout = async () => {
        setLoading(true)
        try {
            const response = await apiPost<{ message?: string }>(AUTH_ENDPOINTS.SIGNOUT)
            setNotification({
                open: true,
                message: response?.message || "Signed out successfully",
                severity: 'success',
            })
            clearAuthSession()
            setTimeout(() => {
                setShowProfile(false)
                navigate('/signin')
            }, 2000)
        } catch (error) {
            setNotification({
                open: true,
                message: error instanceof Error ? error.message : 'Something went wrong',
                severity: 'error',
            })
        } finally {
            setLoading(false)
        }
    }

    const moveToChnagePasswordPage = () => {
        setShowProfile(false)
        navigate('/change-password')
    }

    const menuItems = buildMenuItems(handleSingout, moveToChnagePasswordPage)

  return (
    <Paper elevation={6} className={styles.profilePopup}>
      <Box className={styles.popupArrow}></Box>

      <Box className={styles.popupHeader}>
        <Typography variant="body1">
          New Customer?
        </Typography>

        <Link
          underline="none"
          href="#"
          className={styles.signupText}
        >
          Sign Up
        </Link>
      </Box>

      <Divider />

      <List disablePadding onMouseLeave={()=> { if (!loading && !notification.open) setShowProfile(false) }}>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            className={styles.menuItem}
            onClick={item.onClick}
          >
            <ListItemIcon className={styles.icon}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      {loading && <Loader/>}
      {notification && <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification((prev)=>({...prev, open:false}))}
      />}
    </Paper>
  );
};

export default ProfilePopUp;