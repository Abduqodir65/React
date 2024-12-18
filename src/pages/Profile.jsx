import {
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Box,
  Card,
  CardContent,
} from "@mui/material";
// import Grid from "@mui/material/Grid2"
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Transgender as GenderIcon,
  AccountCircle as UsernameIcon,
  Numbers as IdIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  // Capitalize first letter of each word
  const capitalizeWords = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const profileInfoItems = [
    {
      icon: <PersonIcon color='primary' />,
      label: "Full Name",
      value: `${capitalizeWords(user?.firstName || "")} ${capitalizeWords(
        user?.lastName || ""
      )}`,
    },
    {
      icon: <UsernameIcon color='primary' />,
      label: "Username",
      value: user?.username,
    },
    {
      icon: <EmailIcon color='primary' />,
      label: "Email",
      value: user?.email,
    },
    {
      icon: <GenderIcon color='primary' />,
      label: "Gender",
      value: capitalizeWords(user?.gender || ""),
    },
    {
      icon: <IdIcon color='primary' />,
      label: "User ID",
      value: user?.id,
    },
  ];
  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={user?.image}
              alt={user?.username}
              sx={{
                width: 200,
                height: 200,
                border: "4px solid",
                borderColor: "primary.main",
                mb: 2,
              }}
            />
<Typography variant='h5' fontWeight='bold' color='primary'>
              {capitalizeWords(user?.firstName || "")}{" "}
              {capitalizeWords(user?.lastName || "")}
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography
              variant='h6'
              color='primary'
              gutterBottom
              sx={{ borderBottom: "2px solid", pb: 1 }}
            >
              Profile Information
            </Typography>

            {profileInfoItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  p: 1,
                  bgcolor: index % 2 === 0 ? "grey.100" : "transparent",
                  borderRadius: 2,
                }}
              >
                <Box sx={{ mr: 2 }}>{item.icon}</Box>
                <Box>
                  <Typography variant='subtitle2' color='text.secondary'>
                    {item.label}
                  </Typography>
                  <Typography variant='body1' fontWeight='medium'>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />
        <Typography
          variant='h6'
          color='primary'
          gutterBottom
          sx={{ borderBottom: "2px solid", pb: 1 }}
        >
          Token Information
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Card sx={{ flex: 1, minWidth: 300 }}>
            <CardContent>
              <Typography variant='subtitle1' color='primary' gutterBottom>
                Access Token
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  wordBreak: "break-all",
                  maxHeight: 100,
                  overflow: "auto",
                }}
              >
                {user?.accessToken}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, minWidth: 300 }}>
            <CardContent>
              <Typography variant='subtitle1' color='primary' gutterBottom>
                Refresh Token
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  wordBreak: "break-all",
                  maxHeight: 100,
                  overflow: "auto",
                }}
              >
                {user?.refreshToken}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;
