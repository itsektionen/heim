import { Protocol } from "@/types";

export type InitDocuments = {
  protocols: InitProtocol[];
}

interface InitProtocol {
  path: string;
  name: string;
  url: string;
  metadata: { date?: string; };
}

type MaybeDatedProtocol = Omit<Protocol, "date"> & { date: Date | undefined };

export const mapInitProtocol = (initProtocol: InitProtocol): MaybeDatedProtocol => ({
  id: initProtocol.path,
  name: initProtocol.name,
  date: initProtocol.metadata.date ? new Date(initProtocol.metadata.date) : undefined,
  url: initProtocol.url,
});
