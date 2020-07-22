import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import { Container, Button } from "@material-ui/core";

import { useAsyncReducer, ActionType } from "../hooks";
import { IMG_ENDPOINT } from "../constants";
import NotFound from "./NotFound";

interface GetResponseData {
  full_url: string;
}

export default function ImageView(): JSX.Element {
  const { imgId } = useParams<{ imgId: string }>();
  const [state, dispatch] = useAsyncReducer<GetResponseData>();
  const [deleteState, deleteDispatch] = useAsyncReducer();
  const history = useHistory();
  const { data, error } = state;
  const fullUrl = data?.full_url;

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: ActionType.PENDING });
        const res = await axios.get<GetResponseData>(
          `${IMG_ENDPOINT}/${imgId}`
        );
        dispatch({ type: ActionType.SUCCESS, payload: res.data });
      } catch (e) {
        dispatch({ type: ActionType.FAILURE, payload: e });
      }
    })();
  }, []);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete?")) {
      return;
    }
    deleteDispatch({ type: ActionType.PENDING });
    try {
      await axios.delete(`${IMG_ENDPOINT}/${imgId}`);
    } catch (e) {
      // ignore failures
    } finally {
      history.push("/");
    }
  }

  if (error?.response?.status === 404) {
    return <NotFound />;
  }

  return (
    <Container maxWidth="md">
      <Button component={Link} variant="contained" color="primary" to="/">
        Home
      </Button>
      {data === null ? (
        <h2>loading</h2>
      ) : (
        <Fragment>
          <h2>Viewing {fullUrl}</h2>
          <img style={{ maxWidth: "100%" }} src={fullUrl} />
          <Button
            id="imageDelete"
            disabled={deleteState.pending}
            variant="contained"
            color="secondary"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Fragment>
      )}
    </Container>
  );
}
