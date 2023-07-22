import React, { Component } from "react";
import "./Solitaire.scss";
import Page from "../Page/Page";
import PageSection from "../PageSection/PageSection";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

class Solitaire extends Page {
  renderPageContent(): JSX.Element {
    return (
      <div className="Solitaire">
        <PageSection
          titleId="solitaire.about.title"
          summaryId="solitaire.about.summary"
          buttons={[{ titleId: "solitaire.tryit.button", url: "https://asnow003.github.io/teams-solitaire/" }, { titleId: "solitaire.source.button", url: "https://github.com/asnow003/teams-solitaire"}]}
          images={["solitaire_preview"]}
        />
      </div>
    );
  }
}

export default Solitaire;
