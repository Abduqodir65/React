import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Box,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Flight as FlightIcon,
  Event as EventIcon,
  ChildCare as ChildrenIcon,
  AirlineSeatReclineExtra as ChairIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addOrder, removeOrder, updateOrder } from "../store/flightSlice";
import {
  updateFlightOrder,
  deleteFlightOrder,
  getUserFlightOrders,
} from "../services/flightService";
import dayjs from "dayjs";



const OrdersList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const {orders} = useSelector((state) => state.flights)
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await getUserFlightOrders(user.id)
      setOrders(allOrders)
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleEditOrder = async (order) => {
    try {
      const updatedOrder = {
        ...order,
        destination: `${order.destination} (Edited)`,
      };
      await updateFlightOrder(order.id, updatedOrder);
      dispatch(updateOrder(updatedOrder));
      toast.success("Order updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await deleteFlightOrder(orderId);
      dispatch(removeOrder(orderId));
      toast.success("Order canceled successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel order");
    }
  };

  return (
    <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
      {/* Page Header */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          textAlign: "center",
          mb: 4,
          background: "linear-gradient(135deg, #1976d2, #2196f3)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography
          variant='h3'
          sx={{
            fontWeight: "bold",
            mb: 1,
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          My Flight Orders
        </Typography>
        <Typography
          variant='body1'
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          Manage and view your upcoming flights
        </Typography>
      </Paper>

      {/* Empty State */}
      {orders.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography variant='h6' color='text.secondary'>
            You have no flight orders yet
          </Typography>
        </Paper>
      ) : (
        orders.map((order) => (
          <Card
            key={order.id}
            elevation={3}
            sx={{
              mb: 4,
              borderRadius: 3,
              boxShadow: 5,
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-4px)",
                transition: "0.3s ease",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3} alignItems='center'>
                <Grid item xs={12} md={8}>
                  {/* Destination */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <FlightIcon sx={{ color: "primary.main", fontSize: 32 }} />
                    <Typography
                      variant='h5'
                      sx={{ fontWeight: "bold", color: "text.primary" }}
                    >
                      {order.destination}
                    </Typography>
                  </Box>

                  {/* Flight Details */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "#f0f4ff",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <EventIcon color='primary' />
                        <Box>
                          <Typography
                            variant='caption'
                            sx={{ fontWeight: "bold" }}
                          >
                            Departure
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {dayjs(order.flyDate).format("YYYY MMMM-DD, HH:mm")}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "#f0f4ff",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <EventIcon color='primary' />
                        <Box>
                          <Typography
                            variant='caption'
                            sx={{ fontWeight: "bold" }}
                          >
                            Return
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {dayjs(order.returnDate).format(
                              "YYYY MMMM-DD, HH:mm"
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "#fffbe7",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <ChildrenIcon color='secondary' />
                        <Box>
                          <Typography
                            variant='caption'
                            sx={{ fontWeight: "bold" }}
                          >
                            Children
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {order.children}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "#fffbe7",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <ChairIcon color='secondary' />
                        <Box>
                          <Typography
                            variant='caption'
                            sx={{ fontWeight: "bold" }}
                          >
                            Seats
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {order.seats}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Buttons */}
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                    onClick={() => handleEditOrder(order)}
                    sx={{ borderRadius: 2 }}
                  >
                    Edit Order
                  </Button> 
                  <Button
                    variant='contained'
                    color='error'
                    size='large'
                    fullWidth
                    onClick={() => handleCancelOrder(order.id)}
                    sx={{ borderRadius: 2 }}
                  >
                    Cancel Order
                  </Button>
                  {/* <ConfirmActionPopover
                    buttonText='Cancel Order'
                    buttonColor='error'
                    confirmationMessage='Are you sure you want to cancel this order?'
                    onConfirm={() => handleCancelOrder(order.id)}
                  />  */}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default OrdersList;
