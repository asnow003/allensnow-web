import React from "react";
import "./ShuttleRun.scss";
import Page from "../Page/Page";
import PageSection from "../PageSection/PageSection";

class ShuttleRun extends Page {
  renderPageContent(): JSX.Element {
    return (
      <>
        <PageSection
          titleId="shuttle.reference.title"
          summary={["shuttle.reference.summary"]}
          images={["shuttle_design1", "shuttle_design2", "shuttle_design3"]}
        />
        <PageSection
          titleId="shuttle.modeling.title"
          summary={["shuttle.modeling.summary"]}
          images={["shuttle_wire", "shuttle_render1", "shuttle_render2"]}
        />

        <PageSection
          titleId="shuttle.video.title"
          summary={["shuttle.video.summary"]}
          videoURL="https://www.youtube.com/embed/Pa4gcnyEMMQ"
        />

        <PageSection
          titleId="shuttle.game.title"
          summary={["shuttle.game.summary"]}
          videoURL="https://www.youtube.com/embed/ZGbVJypNpuY"
        />

        <PageSection
          titleId="shuttle.gameplay.title"
          summary={["shuttle.gameplay.summary"]}
          buttons={[{ titleId: "shuttle.tryit.button", url: "https://asnow003.github.io/shuttle" }]}
          images={["shuttle_game"]}
        />
      </>
    );
  }
}

export default ShuttleRun;
