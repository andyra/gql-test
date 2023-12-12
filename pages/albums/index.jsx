import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";

// Config
// -----------------------------------------------------------------------------

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Whatever {
        entries(section: "albums", orderBy: "releaseDate DESC") {
          slug
          title
        }
      }
    `,
  });

  return {
    props: {
      albums: data.entries,
    },
  };
}

// Page
// -----------------------------------------------------------------------------

export default function Albums({ albums }) {
  return (
    <>
      <h1 className="font-bold text-xl">Albums</h1>
      <ol>
        {albums.map((album) => (
          <li key={album.slug}>
            <Link className="hover:underline" href={`/albums/${album.slug}`}>
              {album.title}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
