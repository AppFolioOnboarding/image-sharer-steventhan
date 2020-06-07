import React from "react";
import { useLocation, Link } from "react-router-dom";
import ImageIndex from "./ImageIndex";
import { Container, Button } from "@material-ui/core";

export default function TagView(): JSX.Element {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tag = params?.get("tag");
  return (
    <Container maxWidth="md">
      {tag && (
        <>
          <Button component={Link} variant="contained" color="primary" to="/">
            Home
          </Button>
          <h2>Showing images for tag: {tag}</h2>
        </>
      )}
      <ImageIndex params={params} />;
    </Container>
  );
}
