import axios from "axios";
import { DocScrapper } from "./doc-scrapper";

export class SDKScrapper extends DocScrapper {
  urls = [
    "https://docs.decentraland.org/creator/3d-modeling/meshes/",
    // "https://docs.decentraland.org/creator/3d-modeling/materials/",
    // "https://docs.decentraland.org/creator/3d-modeling/colliders/",
  ];
  constructor() {
    super();
  }
  async downloadSDKDocumentation() {
    const promises = this.urls.map((url) => this.downloadURLContent(url));
    return await Promise.all(promises);
  }
}
