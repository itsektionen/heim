import { Protocol } from "@/types";

export type InitDocuments = {
  protocols: InitProtocol[];
}

export type InitProtocol = {
  path: string;
  name: string;
  url: string;
};

export const mapInitProtocol = (initProtocol: InitProtocol): Protocol => ({
  id: initProtocol.path,
  name: initProtocol.name,
  date: new Date(), // FIXME: Real date once init/documents PR is made and merged
  url: initProtocol.url,
});
