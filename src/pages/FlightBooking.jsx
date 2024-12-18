import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
  } from "@mui/material";
  // import { DatePicker } from '@mui/x-date-pickers';
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";


  import { createFlightOrder } from "../services/flightService";
  import dayjs from "dayjs";
import {  addOrder, setCurrentBooking } from "../store/flightSlice";

  const FlightBooking = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { currentBooking } = useSelector((state) => state.flights);
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!currentBooking.flyDate || !currentBooking.returnDate){
        toast.error('Please, fill in dates',{
            position: "bottom-right",
            autoClose: 3000,
        });
        return;
      }

      if(!isAuthenticated){
        navigate("/login",{
            state: {
                from: {pathname: "/"},
                bookingData: currentBooking
            },
        });
        return
      }

      try {
        const order = {
          ...currentBooking,
          userId: user.id
        }
        const newOrder = await createFlightOrder(order)
        dispatch(addOrder(newOrder))

      } catch (error) {
        console.log(error)
      }
  
      
    };
  
    return (
      <Container maxWidth='sm'>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <Typography
            variant='h4'
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              marginBottom: 3,
            }}
          >
            Book Your Flight
          </Typography>
  
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              label='Destination'
              variant='outlined'
              value={currentBooking.destination}
              onChange={(e) =>
                dispatch(
                  setCurrentBooking({
                    destination: e.target.value,
                  })
                )
              }
              required
            />
  
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <DatePicker
                minDate={dayjs()}
                label='Departure Date'
                value={currentBooking.flyDate}
                onChange={(newValue) =>
                  dispatch(
                    setCurrentBooking({
                      flyDate: newValue,
                    })
                  )
                }
                sx={{ width: "50%" }}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    fullWidth: true,
                  },
                }}
              />
              <DatePicker
                minDate={dayjs()}
                value={currentBooking.returnDate}
                onChange={(newValue) =>
                  dispatch(
                    setCurrentBooking({
                      returnDate: newValue,
                    })
                  )
                }
                sx={{ width: "50%" }}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    fullWidth: true,
                  },
                }}
              />
            </Box>
  
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel>Children</InputLabel>
                <Select
                  value={currentBooking.children}
                  label='Children'
                  variant='outlined'
                  onChange={(e) =>
                    dispatch(
                      setCurrentBooking({
                        children: e.target.value,
                      })
                    )
                  }
                >
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
  
              <TextField
                fullWidth
                type='number'
                label='Number of Seats'
                variant='outlined'
                value={currentBooking.seats}
                onChange={(e) =>
                  dispatch(
                    setCurrentBooking({
                      seats: parseInt(e.target.value) || 1,
                    })
                  )
                }
              />
            </Box>
            <Button
            variant='contained'
            color='primary'
            size='large'
            sx={{
              marginTop: 2,
              padding: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
            }}
            type='submit'
          >
            Book Flight
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FlightBooking;
  