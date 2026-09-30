export const LOCATIONS = [
  'Andheri', 'Bandra', 'Powai', 'Borivali', 'Malad', 'Thane', 'Kandivali', 'Goregaon',
] as const;

export const LOCATION_SLUGS: string[] = LOCATIONS.map((l) => l.toLowerCase());

export function locationNameFromSlug(slug: string): string | null {
  return LOCATIONS.find((l) => l.toLowerCase() === slug) ?? null;
}
