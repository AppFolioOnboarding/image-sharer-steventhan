import React, { FormEvent, useState } from "react";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useStateWithCheck, useAsyncReducer, ActionType } from "../hooks";
import { IMG_ENDPOINT } from "../constants";

interface ResponseData {
  id: number;
  location: string;
}

const styles = {
  margin: "0.5rem",
};

export default function ImageLinkForm(): JSX.Element {
  const [link, linkError, setLink] = useStateWithCheck("", (link) => {
    try {
      new URL(link);
      return null;
    } catch (e) {
      return new Error("Invalid link format");
    }
  });
  const [tags, setTags] = useState([]);
  const [state, dispatch] = useAsyncReducer<ResponseData>();
  const { pending, error } = state;
  const history = useHistory();

  async function handleFormSubmit(fe: FormEvent) {
    fe.preventDefault();
    dispatch({ type: ActionType.PENDING });
    try {
      const res = await axios.post<ResponseData>(IMG_ENDPOINT, {
        full_url: link,
        tag_list: tags,
      });
      history.push(`/view/${res.data.id}`);
    } catch (e) {
      dispatch({
        type: ActionType.FAILURE,
        payload: new Error(e.response.data.message),
      });
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box component="form" onSubmit={handleFormSubmit}>
          <h2 style={styles}>Upload your image link</h2>
          <Box style={styles}>
            <TextField
              error={linkError != null || error != null}
              disabled={pending}
              type="text"
              required
              fullWidth
              id="imageLink"
              label="Image link"
              value={link}
              variant="outlined"
              helperText={linkError?.message}
              onChange={(e) => {
                setLink(e.target.value);
                dispatch({ type: ActionType.RESET });
              }}
            />
          </Box>
          <Autocomplete
            style={styles}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  key={option}
                  variant="default"
                  color="primary"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            onChange={(_, value) => {
              setTags(value);
            }}
            multiple
            freeSolo
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                error={error != null}
                variant="outlined"
                label="Tags"
                placeholder="Tags"
              />
            )}
          />
          {error != null && (
            <FormHelperText style={styles} error>
              {error.message}
            </FormHelperText>
          )}
          <Box display="flex" justifyContent="center">
            <Button
              id="uploadButton"
              disabled={
                linkError != null || error != null || link === "" || pending
              }
              size="large"
              style={{ margin: "0.5rem", width: "20rem" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              {pending ? "Uploading..." : "Upload"}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
