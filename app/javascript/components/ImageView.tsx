import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { useAsyncReducer, ActionType } from "../hooks";
import { IMG_ENDPOINT } from "../constants";
import NotFound from "./NotFound";
import { Container } from "@material-ui/core";

interface ResponseData {
  full_url: string;
}

export default function ImageView(): JSX.Element {
  const { imgId } = useParams<{imgId: string}>();
  const [state, dispatch] = useAsyncReducer<ResponseData>();
  const { data, error} = state;
  const fullUrl = data?.full_url;

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: ActionType.PENDING });
        const res = await axios.get<ResponseData>(`${IMG_ENDPOINT}/${imgId}`);
        dispatch({ type:ActionType.SUCCESS, payload: res.data });
      } catch(e) {
        dispatch({ type: ActionType.FAILURE, payload: e });
      }
    })();
  }, [])

  if (error?.response?.status === 404) {
    return <NotFound />;
  }

  return (
    <Container maxWidth="md">
      <Link to="/">Home </Link>
      {data === null ? (
        <h2>loading</h2>
      ) : (
        <Fragment>
          <h2>Viewing {fullUrl}</h2>
          <img style={{ maxWidth: "100%" }} src={fullUrl} />
        </Fragment>
      )}
    </Container>
  );
}
