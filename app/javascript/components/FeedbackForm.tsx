import React, { FormEvent, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";

interface ResponseData {
  id: number;
  location: string;
}

const styles = {
  margin: "0.5rem",
};

export default function ImageLinkForm(): JSX.Element {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  async function handleFormSubmit(fe: FormEvent) {
    fe.preventDefault();
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box component="form" onSubmit={handleFormSubmit}>
            <Button
              style={styles}
              component={Link}
              variant="contained"
              color="primary"
              to="/"
            >
              Home
            </Button>
            <h2 style={styles}>Tell us what you think</h2>
            <Box style={styles}>
              <TextField
                type="text"
                required
                fullWidth
                id="name"
                label="Your name"
                value={name}
                variant="outlined"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Box>
            <Box style={styles}>
              <TextField
                type="text"
                multiline
                rows={7}
                required
                fullWidth
                id="comment"
                label="Comment"
                value={comment}
                variant="outlined"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <Button
                id="uploadButton"
                disabled={name === "" || comment === ""}
                size="large"
                style={{ margin: "0.5rem", width: "20rem" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Box>
            <Box display="flex" justifyContent="center">
              <small>Copyright: Appfolio Inc. Onboarding</small>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
