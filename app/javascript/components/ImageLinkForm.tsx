import React, { FormEvent } from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";
import { TextField, Box, Grid, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useStateWithCheck, useAsyncReducer, ActionType } from "../hooks";
import { IMG_ENDPOINT } from "../constants";


interface ResponseData {
  id: number;
  location: string;
}

export default function ImageLinkForm(): JSX.Element {
  const [link, linkError, setLink] = useStateWithCheck("", link => {
    try {
      new URL(link);
      return null;
    } catch(e) {
      return new Error("Invalid link format")
    }
  });
  const [state, dispatch] = useAsyncReducer<ResponseData>();
  const { pending, error } = state;
  const history = useHistory();

  async function handleFormSubmit(fe: FormEvent) {
    fe.preventDefault();
    dispatch({ type: ActionType.PENDING });
    try {
      const res = await axios.post<ResponseData>(IMG_ENDPOINT, { full_url: link });
      history.push(res.data.location);
    } catch(e) {
      dispatch({ type: ActionType.FAILURE, payload: new Error(e.response.data.message) });
    }
  }


  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box component="form" onSubmit={handleFormSubmit}>
            <h2 style={{ margin: "0.5rem" }}>Upload your image link</h2>
            <TextField
              style={{ margin: "0.5rem" }}
              error={linkError != null || error != null}
              disabled={pending}
              type="text"
              required
              fullWidth
              id="imageLink"
              label="Image link"
              value={link}
              variant="outlined"
              helperText={error?.message || linkError?.message}
              onChange={e => {
                setLink(e.target.value);
                dispatch({ type: ActionType.RESET });
              }}
            />
            <Box display="flex" justifyContent="center">
              <Button
                disabled={linkError != null || error != null || link === "" || pending }
                size="large"
                style={{ margin: "0.5rem", width: "20rem" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                {pending ? "Uploading...": "Upload"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
