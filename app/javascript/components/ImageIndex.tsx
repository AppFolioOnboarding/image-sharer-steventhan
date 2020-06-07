import React, { useEffect, Fragment } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";

import Image, { ImageData } from "./Image";
import { useAsyncReducer, ActionType } from "../hooks";
import { IMG_ENDPOINT } from "../constants";

export default function ImageIndex(): JSX.Element {
  const [state, dispatch] = useAsyncReducer<ImageData[]>([]);
  const { data: images, pending, error } = state;

  useEffect(() => {
    (async () => {
      dispatch({ type: ActionType.PENDING });
      try {
        const res = await axios.get<ImageData[]>(IMG_ENDPOINT);
        dispatch({ type: ActionType.SUCCESS, payload: res.data });
      } catch (e) {
        dispatch({ type: ActionType.FAILURE, payload: e });
      }
    })();
  }, []);

  function render() {
    if (pending) {
      return <h2>Loading images...</h2>;
    }
    if (error) {
      return <h2>Can&apos;t load</h2>;
    }
    return (
      <Fragment>
        {images.map((imageData) => (
          <Image key={imageData.id} imageData={imageData} />
        ))}
      </Fragment>
    );
  }

  return <Container maxWidth="md">{render()}</Container>;
}
