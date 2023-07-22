import IPageSectionButtonProps from "./IPageSectionButtonProps";

export default interface IPageSectionProps {
    titleId: string;
    summaryId: string;
    images: string[];
    videoURL: string;
    buttons: IPageSectionButtonProps[];
  }