

export type EmployersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Users[];
}