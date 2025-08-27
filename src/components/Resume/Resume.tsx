import React from "react";
import "./Resume.scss";
import Page from "../Page/Page";
import PageSection from "../PageSection/PageSection";

class Resume extends Page {
  renderPageContent(): JSX.Element {
    return (
      <div className="Solitaire">
        <PageSection
          titleId="resume.link.title"
          summary={["resume.link.summary"]}
          buttons={[{ titleId: "resume.download.button", url: "https://www.allensnow.com/media/resume.pdf"}]}
        />
      </div>
    );
  }
}

export default Resume;