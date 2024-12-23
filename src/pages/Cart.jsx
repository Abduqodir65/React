import React from 'react';
import { Typography, Box, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import useStore from '../store/store';

function Cart() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          Cart is empty.
        </Typography>
      ) : (
        <List>
          {cart.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <ListItemText
                  primary={item.title}
                  secondary={`Price: $${item.price}`}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removeFromCart(item.id)}
                >
                  Delete
                </Button>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
}

export default Cart;
