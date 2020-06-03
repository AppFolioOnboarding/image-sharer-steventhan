import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Box, Paper } from "@material-ui/core";

export interface ImageData {
  id: number;
  full_url: string;
  location: string;
}

interface Props {
  imageData: ImageData;
}

export default function Image({ imageData }: Props): JSX.Element {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Paper elevation={5} style={{ padding: 20, marginBottom: 10 }}>
        <Box
          display="flex"
          justifyContent="center"
          style={{ marginBottom: 20, width: 400 }}
        >
          <img style={{ maxWidth: "100%" }} src={imageData.full_url} />
        </Box>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to={imageData.location}
          fullWidth
        >
          View
        </Button>
      </Paper>
    </Box>
  );
}
