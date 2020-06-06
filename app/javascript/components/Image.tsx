import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Box, Paper, Chip } from "@material-ui/core";

export interface ImageData {
  id: number;
  tag_list: string[];
  full_url: string;
}

interface Props {
  imageData: ImageData;
}

export default function Image({ imageData }: Props): JSX.Element {
  const { full_url: fullUrl, tag_list: tagList } = imageData;
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Paper elevation={5} style={{ padding: 20, marginBottom: 10 }}>
        <Box
          display="flex"
          justifyContent="center"
          style={{ marginBottom: 20, width: 400 }}
        >
          <img style={{ maxWidth: "100%" }} src={fullUrl} />
        </Box>
        <Box style={{ marginBottom: 15, width: 400 }}>
          {tagList.map((tag) => (
            <Chip
              key={tag}
              component={Link}
              clickable
              style={{ marginLeft: 3, marginBottom: 3 }}
              variant="default"
              color="primary"
              label={tag}
              to={`/view?tag=${tag}`}
            />
          ))}
        </Box>
        <Button
          component={Link}
          variant="contained"
          color="secondary"
          to={`/view/${imageData.id}`}
          fullWidth
        >
          View
        </Button>
      </Paper>
    </Box>
  );
}
