import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import Typography from "@mui/material/Typography";
import "./PageTitle.scss";
import Stack from "@mui/material/Stack";

import IPageTitleProps from "../../interfaces/IPageTitle";

class PageTitle extends Component<IPageTitleProps> {
  render() {
    return (
      <div className="PageTitle">
        <Stack direction="row" alignItems={"center"} spacing={1}>
          <Typography variant="h5" align="left" component="h1">
            <FormattedMessage
              id={this.props.item.name}
              defaultMessage="Shuttle Run default"
            />
          </Typography>
        </Stack>
        <Typography variant="subtitle1" align="left" component="p">
          <FormattedMessage
            id={this.props.item.summary[0]}
            defaultMessage="Shuttle Run default"
          />
        </Typography>
      </div>
    );
  }
}

export default PageTitle;
