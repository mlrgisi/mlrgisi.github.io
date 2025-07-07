import fs from 'fs';
import path from 'path';
import {BibtexParser} from "bibtex-js-parser";
import ClientComponent from './ClientComponent';

export default function Page() {
  const filePath = path.join(process.cwd(), 'public', 'publications.bib');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const bibJSON = BibtexParser.parseToJSON(fileContent);
  // const publications = BibtexParser.parseToJSONString(fileContent);

  return <ClientComponent fileData={bibJSON} />;
}
