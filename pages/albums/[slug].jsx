import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";

// Paths
// -----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Entries {
        entries(section: "albums") {
          slug
        }
      }
    `,
  });

  const paths = data?.entries.map((entry) => ({
    params: { slug: entry.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await client.query({
    query: gql`
      query Entry {
        entry(section: "albums", slug: "${params.slug}") {
          title
        }
      }
    `,
  });

  // Return 404 if the entry has been deleted
  if (!data.entry) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      album: data.entry,
    },
  };
}

// Page
// -----------------------------------------------------------------------------

export default function Album({ album }) {
  if (!album) return <mark>No album!</mark>;

  console.log(album);

  return (
    <>
      <Link href="/albums">Back</Link>
      <h1 className="font-bold text-xl">
        The name of the album is:{" "}
        <span className="text-cyan-600">{album.title}</span>
      </h1>
    </>
  );
}
