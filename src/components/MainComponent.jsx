import React from "react";
import { Box, Typography, Button, LinearProgress, Stack, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const challenges = [
  { title: "Daily Workout", progress: 80, streak: 12, completed: false },
  { title: "Read 30 Pages", progress: 40, streak: 8, completed: false },
  { title: "Meditation", progress: 100, streak: 15, completed: true },
];

const ChallengeTracker = () => {
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", my: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#1E88E5" }}>
        Challenge Tracker
      </Typography>
      {challenges.map((challenge, index) => (
        <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {challenge.title}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <WhatshotIcon color="error" />
              <Typography sx={{ color: "red", fontWeight: "bold" }}>
                {challenge.streak} Day Streak
              </Typography>
            </Stack>
          </Stack>
          <Box sx={{ my: 1 }}>
            <LinearProgress
              variant="determinate"
              value={challenge.progress}
              sx={{
                height: 10,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: challenge.completed ? "green" : "primary",
                },
              }}
            />
          </Box>
          <Button
            variant="contained"
            color={challenge.completed ? "success" : "primary"}
            fullWidth
            disabled={challenge.completed}
          >
            {challenge.completed ? "Completed" : "Mark Complete"}
          </Button>
        </Paper>
      ))}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        color="primary"
        sx={{ mt: 2 }}
      >
        Add New Challenge
      </Button>
    </Box>
  );
};

export default ChallengeTracker;
