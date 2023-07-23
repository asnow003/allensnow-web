import IPageSectionButtonProps from "./IPageSectionButtonProps";

export default interface IPageSectionProps {
    titleId: string;
    summary: string[];
    images: string[];
    videoURL: string;
    buttons: IPageSectionButtonProps[];
  }