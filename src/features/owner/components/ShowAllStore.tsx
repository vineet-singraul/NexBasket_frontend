import {
  Box,
  CardMedia,
  Avatar,
  Typography,
  Stack,
  Chip,
  Paper,
  Rating,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useEffect, useState } from "react";
import style from "../../../styles/ownerStyle/AddStore.module.css";
import { apiGet } from "../../../api/userApi";
import { STORE_ENDPOINTS } from "../../../api/endpoints";
import type { StoreListItem } from "../types/store.types";
import Loader from "../../../utils/Loader";
import { useNavigate } from "react-router-dom";

const PLACEHOLDER_BANNER = "https://via.placeholder.com/1200x260";
const PLACEHOLDER_LOGO = "https://via.placeholder.com/90";

const ShowAllStore = () => {
  const [stores, setStores] = useState<StoreListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllStores = async () => {
      setLoading(true);
      try {
        const response = await apiGet<{ stores?: StoreListItem[] } | StoreListItem[]>(
          STORE_ENDPOINTS.LIST
        );
        const list = Array.isArray(response) ? response : response?.stores ?? [];
        console.log("< =============== >",list)
        setStores(list);
      } catch {
        setStores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStores();
  }, []);

  return (
    <Box className={style.AS_mainWrapper}>
      {loading && <Typography sx={{ color: "var(--nb-gray)" }}>Loading stores…</Typography>}

      {!loading && stores.length === 0 && (
        <Typography sx={{ color: "var(--nb-gray)" }}>No stores found.</Typography>
      )}

      <Stack className={style.SAS_stack}>
        {stores.map((store) => (
          <Paper
            key={store._id}
            elevation={0}
            className={style.SAS_card}
          >
            <Box className={style.SAS_bannerWrap}>
              <CardMedia
                component="img"
                image={store.banner || PLACEHOLDER_BANNER}
                className={style.SAS_banner}
              />
              <Box className={style.SAS_bannerScrim} />
            </Box>

            <Box className={style.SAS_content}>
              <Avatar
                src={store.logo || PLACEHOLDER_LOGO}
                className={style.SAS_logo}
              />

              <Stack
                className={style.SAS_header}
                direction={{ xs: "column", md: "row" }}
              >
                <Box className={style.SAS_left}>
                  <Stack
                    direction="row"
                    spacing={1}
                  >
                    <Typography
                      variant="h5"
                      className={style.SAS_title}
                    >
                      {store.storeName}
                    </Typography>

                    {store.active ? (
                      <Chip
                        icon={<VerifiedIcon />}
                        label="Active"
                        color="success"
                        size="small"
                      />
                    ) : (
                      <Chip
                        label="Inactive"
                        color="error"
                        size="small"
                      />
                    )}
                  </Stack>

                  <Typography className={style.SAS_description}>
                    {store.description}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    className={style.SAS_address}
                  >
                    <LocationOnIcon
                      color="warning"
                      fontSize="small"
                    />

                    <Typography className={style.SAS_addressText}>
                      {store.address?.street}, {store.address?.city},{" "}
                      {store.address?.state}, {store.address?.country} -
                      {store.address?.pincode}
                    </Typography>
                  </Stack>
                </Box>

                <Stack className={style.SAS_right}>
                  <Box className={style.SAS_ratingBox}>
                    <Rating
                      value={store.rating ?? 0}
                      precision={0.1}
                      readOnly
                    />

                    <Typography className={style.SAS_ratingText}>
                      {(store.rating ?? 0).toFixed(1)}/5
                    </Typography>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                  >
                    <ShoppingBagIcon color="primary" />

                    <Typography className={style.SAS_sales}>
                      {(store.totalSales ?? 0).toLocaleString()} Sales
                    </Typography>
                  </Stack>

                  <Button
                    variant="contained"
                    className="button"
                    onClick={() => navigate(`/owner/store/${store._id}`)}
                  >
                    View Store
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Paper>
        ))}
      </Stack>
      {loading && <Loader/>}
    </Box>
  );
};

export default ShowAllStore;