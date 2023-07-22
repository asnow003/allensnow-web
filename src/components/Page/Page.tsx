import React, { Component } from "react";
import "./Page.scss";
import IPage from "../../interfaces/IPage";
import INavigationItem from "../../interfaces/INavigationItem";
import * as navigation from "../../assets/content/navigationItems.json";
import PageTitle from "../PageTitle/PageTitle";

abstract class Page extends Component<IPage> {
  static defaultProps: {
    showHeader: true;  
  };

  getNavigationItem(): INavigationItem {
    const navItems = JSON.parse(
      JSON.stringify(navigation)
    ) as Array<INavigationItem>;

    for (let i = 0; i < navItems.length; i++) {
      if (navItems[i].path === window.location.pathname) {
        return navItems[i];
      }
    }

    return navItems[0];
  }

  getNavigationItems(): INavigationItem[] {
    return JSON.parse(JSON.stringify(navigation)) as INavigationItem[];
  }

  abstract renderPageContent(): JSX.Element;

  render() {
    return (
      <div className="Page">
        {this.props.showHeader && <div className="PageHeader"><PageTitle item={this.getNavigationItem()} /></div>}
        <div className="PageContent">
          {this.renderPageContent()}
        </div>   
      </div>
    );
  }
}

Page.defaultProps = {
    showHeader: true
}

export default Page;
