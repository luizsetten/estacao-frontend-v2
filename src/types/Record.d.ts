export interface Record extends Object {
  temperature?: number;
  pressure?: number;
  humidity?: number;
  rainfall?: number;
  wind_gust?: number;
  wind_direction?: number;
  wind_speed?: number;
  solar_incidence?: number;
  created_at?: string;
}
