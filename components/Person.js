import Link from "next/link";

export default function Person({ person }) {
  return (
    <div>
      <li>
        <Link href="/users/[name]" as={`/users/${person.name}`}>
          <a>{person.name}</a>
        </Link>
      </li>
    </div>
  );
}
