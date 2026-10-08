import { env } from "@/env";
import Papa from "papaparse";

export type Book = {
  title: string;
  edition: string;
  author: string;
  quantity: number;
  available: number;
  isbn: string;
  dateChecked: string;
};

export async function getBooks(): Promise<Book[]> {
  const res = await fetch(env.BOOKSHELF_CSV_URL, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Bookshelf fetch failed: ${res.status}`);

  const { data } = Papa.parse<string[]>(await res.text(), {
    skipEmptyLines: true,
  });

  return data
    .slice(1)
    .filter(([title]) => title?.trim())
    .map(
      ([title, edition, author, quantity, available, isbn, dateChecked]) => ({
        title: title.trim(),
        edition: edition?.trim() ?? "",
        author: author?.trim() ?? "",
        quantity: Number(quantity) || 0,
        available: Number(available) || 0,
        isbn: isbn?.trim() ?? "",
        dateChecked: dateChecked?.trim() ?? "",
      }),
    );
}
