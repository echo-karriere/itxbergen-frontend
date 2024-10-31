import { createClient, QueryParams } from "next-sanity";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  useCdn: false,
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 1,
  tags = [],
}: {
  query: QueryString;
  params: QueryParams;
  revalidate: number | false;
  tags: string[];
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}
