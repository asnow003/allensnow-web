import React from "react";
import { FormattedMessage } from "react-intl";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./ShuttleRun.scss";
import { ImageMap } from "../../assets/images/ImageMap";

import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import Page from "../Page/Page";
import PageSection from "../PageSection/PageSection";

class ShuttleRun extends Page {
  renderPageContent(): JSX.Element {
    return (
      <>
        <PageSection
          titleId="shuttle.reference.title"
          summaryId="shuttle.reference.summary"
          images={["shuttle_design1", "shuttle_design2", "shuttle_design3"]}
        />
        <PageSection
          titleId="shuttle.modeling.title"
          summaryId="shuttle.modeling.summary"
          images={["shuttle_wire", "shuttle_render1", "shuttle_render2"]}
        />

        <PageSection
          titleId="shuttle.video.title"
          summaryId="shuttle.video.summary"
          images={[]}
          videoURL="https://www.youtube.com/embed/Pa4gcnyEMMQ"
        />

        <PageSection
          titleId="shuttle.game.title"
          summaryId="shuttle.game.summary"
          images={[]}
          videoURL="https://www.youtube.com/embed/ZGbVJypNpuY"
        />

        <PageSection
          titleId="shuttle.gameplay.title"
          summaryId="shuttle.gameplay.summary"
          buttons={[{ titleId: "shuttle.tryit.button", url: "https://asnow003.github.io/shuttle" }]}
          images={["shuttle_game"]}
        />
      </>
    );
  }
}

export default ShuttleRun;
