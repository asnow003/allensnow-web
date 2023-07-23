import React from "react";
import "./Klusters.scss";
import Page from "../Page/Page";
import PageSection from "../PageSection/PageSection";
class Klusters extends Page {
  renderPageContent(): JSX.Element {
    return (
      <div className="Solitaire">
        <PageSection
          titleId="klusters.about.title"
          summary={["klusters.about.summary"]}
          buttons={[{ titleId: "klusters.app.button", url: "https://itunes.apple.com/us/app/klusters/id1244555430?mt=8"}]}
          images={[
            "klusters_preview",
            "klusters_preview1",
            "klusters_preview2"
          ]}
        />
      </div>
    );
  }
}

export default Klusters;
