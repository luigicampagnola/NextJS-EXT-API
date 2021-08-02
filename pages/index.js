import { useState } from "react";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import Person from "../components/Person";
import { Box, Center } from "@chakra-ui/react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const [name, nameChanger] = useState("");

  const { data, error } = useSWR(
    "https://gorest.co.in/public-api/users",
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading</div>;

  const nameFilter = data.data.filter((peopleNames) => {
    return peopleNames.name.toLowerCase().includes(name.toLocaleLowerCase());
  });

  function setNameChange(e) {
    nameChanger(e.target.value);
  }

  return (
    <Box bgColor="#011627">
      <div className={styles.container}>
        <Center color="white">Search User</Center>
        <input onChange={setNameChange}></input>
        <Box bgColor="#ffffff" p="6" m="3" borderRadius="10px" >
          <ul>
            {nameFilter.map((p, i) => (
              <Person person={p} key={i} />
            ))}
          </ul>
        </Box>
      </div>
    </Box>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://gorest.co.in/public-api/users`);
  const data = await res.json();

  return { props: { data } };
}
