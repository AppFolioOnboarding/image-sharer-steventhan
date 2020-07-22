import React, { FormEvent, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { Container, FormHelperText } from "@material-ui/core";
import { useAsyncReducer, ActionType } from "../hooks";
import axios from "axios";

import { FB_ENDPOINT } from "../constants";

const styles = {
  margin: "0.5rem",
};

const succesStyles = {
  ...styles,
  color: "green",
};

export default function ImageLinkForm(): JSX.Element {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [state, dispatch] = useAsyncReducer<{ success: boolean }>();
  const { data, error, pending } = state;

  async function handleFormSubmit(fe: FormEvent) {
    fe.preventDefault();
    dispatch({ type: ActionType.PENDING });
    try {
      await axios.post(FB_ENDPOINT, { name, comment });
      dispatch({ type: ActionType.SUCCESS, payload: { success: true } });
    } catch (e) {
      dispatch({
        type: ActionType.FAILURE,
        payload: new Error(e.response.data.message),
      });
      console.log("here");
    }
    setName("");
    setComment("");
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
                disabled={pending}
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
                disabled={pending}
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
            {error != null && (
              <FormHelperText style={styles} error>
                {error.message}
              </FormHelperText>
            )}
            {data?.success && (
              <FormHelperText style={succesStyles}>Done</FormHelperText>
            )}
            <Box display="flex" justifyContent="center">
              <Button
                id="feedbackSubmit"
                disabled={name === "" || comment === "" || pending}
                size="large"
                style={{ margin: "0.5rem", width: "20rem" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                {pending ? "Sumitting..." : "Submit"}
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
