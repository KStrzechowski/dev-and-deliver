export class ResponsePaginated {
  total_records: number;
  total_pages: number;
  previous?: string;
  next?: string;
  results: Result[];
}

class Result {
  uid: number;
  name: string;
  url: string;
}
