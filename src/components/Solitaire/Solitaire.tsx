import React from "react";
import "./Solitaire.scss";
import Page from "../Page/Page";
import PageSection from "../PageSection/PageSection";

class Solitaire extends Page {
  renderPageContent(): JSX.Element {
    return (
      <div className="Solitaire">
        <PageSection
          titleId="solitaire.about.title"
          summary={["solitaire.about.summary"]}
          buttons={[{ titleId: "solitaire.tryit.button", url: "https://asnow003.github.io/teams-solitaire/" }, { titleId: "solitaire.source.button", url: "https://github.com/asnow003/teams-solitaire"}]}
          images={["solitaire_preview"]}
        />
      </div>
    );
  }
}

export default Solitaire;
