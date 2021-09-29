type Planet = Record<string, string>

// interface Planet {
//   [key: string]:string
// }

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: string[];
  launchDate: number;
  upcoming: boolean;
  success?: boolean;
  target?: string;
}