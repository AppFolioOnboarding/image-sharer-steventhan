import React from "react";
import { useLocation } from "react-router-dom";
import ImageIndex from "./ImageIndex";

export default function TagView(): JSX.Element {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return <ImageIndex params={params} />;
}
