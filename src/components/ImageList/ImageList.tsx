import React, { Component } from "react";
import "./ImageList.scss";
import Grid from "@mui/material/Grid";
import { ImageMap } from "../../assets/images/ImageMap";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grow from '@mui/material/Grow';

import IImageListProps from "../../interfaces/IImageListProps";

class ImageList extends Component<IImageListProps> {
  render() {
    return (
      <Grid
        container
        spacing={{ xs: 1, sm: 1, md: 1, lg: 1 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
      >
        {Array.from(this.props.images).map((image, index) => (
            <Grow in={true} timeout={500 + (index * 500)}>
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Box>
              <Card>
                <CardMedia component="img" height="250" src={ImageMap[image]} />
              </Card>
            </Box>
          </Grid></Grow>
        ))}
      </Grid>
    );
  }
}

export default ImageList;
