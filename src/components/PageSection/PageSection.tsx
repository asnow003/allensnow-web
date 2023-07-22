import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import Typography from "@mui/material/Typography";
import "./PageSection.scss";
import { ImageMap } from "../../assets/images/ImageMap";
import ImageList from "../ImageList/ImageList";
import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import IPageSectionProps from "../../interfaces/IPageSectionProps";

class PageSection extends Component<IPageSectionProps> {
  static defaultProps: {
    images: [];
    buttons: [];
    videoURL: "";
  };

  render() {
    return (
      <div className="PageSection">
        <div className="Title">
          <Typography variant="h6" component="h2" gutterBottom>
            <FormattedMessage id={this.props.titleId} />
          </Typography>
        </div>
        <div className="Summary">
          <Typography variant="body1" component="p" gutterBottom>
            <FormattedMessage id={this.props.summaryId} />
          </Typography>
        </div>
        {this.props.buttons && this.props.buttons.length > 0 && (
          <div className="Buttons">
            <Stack direction="row" spacing={1}>
              {Array.from(this.props.buttons).map((item, index) => (
                <Grow in={true} timeout={1000 + index * 300}>
                  <Button
                    href={item.url}
                    target="_blank"
                    variant="contained"
                    size="large"
                  >
                    <FormattedMessage id={item.titleId} />
                  </Button>
                </Grow>
              ))}
            </Stack>
          </div>
        )}
        {this.props.images && this.props.images.length > 0 && (
          <div className="Images">
            {this.props.images.length > 1 && (
              <ImageList images={this.props.images} />
            )}
            {this.props.images.length === 1 && (
              <Grow in={true} timeout={500}>
                <img src={ImageMap[this.props.images[0]]} width="100%" />
              </Grow>
            )}
          </div>
        )}
        {this.props.videoURL && (
          <div className="Video">
            <iframe
              height="560"
              width="100%"
              src={this.props.videoURL}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        )}
      </div>
    );
  }
}

export default PageSection;
