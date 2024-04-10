import React from "react";
import Page from "../Page/Page";
import PageSection from "../PageSection/PageSection";

class About extends Page {
  renderPageContent(): JSX.Element {
    return (
      <>
        <PageSection
          titleId="about.gereral.title"
          summary={["about.general.summary"]}
        />
      </>
    );
  }
}

export default About;
