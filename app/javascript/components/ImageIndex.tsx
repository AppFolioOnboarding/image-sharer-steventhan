import React, { useEffect } from "react";
import axios from "axios";

import Image, { ImageData } from "./Image";
import { useAsyncReducer, ActionType } from "../hooks";
import { IMG_ENDPOINT } from "../constants";

interface Props {
  params?: URLSearchParams;
}

export default function ImageIndex({ params }: Props): JSX.Element {
  const [state, dispatch] = useAsyncReducer<ImageData[]>([]);
  const { data: images, pending, error } = state;

  useEffect(() => {
    (async () => {
      dispatch({ type: ActionType.PENDING });
      try {
        const res = await axios.get<ImageData[]>(IMG_ENDPOINT, { params });
        dispatch({ type: ActionType.SUCCESS, payload: res.data });
      } catch (e) {
        dispatch({ type: ActionType.FAILURE, payload: e });
      }
    })();
  }, [params]);

  function render() {
    if (pending) {
      return <h2>Loading images...</h2>;
    }
    if (error) {
      return <h2>Can&apos;t load</h2>;
    }
    return (
      <>
        {images.map((imageData) => (
          <Image key={imageData.id} imageData={imageData} />
        ))}
      </>
    );
  }

  return render();
}
