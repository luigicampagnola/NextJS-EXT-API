import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Center,
  Text,
  Button,
  GridItem,
} from "@chakra-ui/react";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Home.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PeopleInformation() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.name && `https://gorest.co.in/public-api/users/`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;

  if (!data) return <div>Loading...</div>;

  const { name } = query.name;
  const filtered = data.data.filter((user) => {
    if (user.name === query.name) {
      return user;
    }
  });

  const filteredData = filtered[0];
  return (
    <Box
      className={styles.container}
      bgColor="#011627"
      h={{ base: 1500, md: 1100, lg: 800 }}
      w={{ base: 780, md: 810, lg: 1520  }}
    >
      <Table variant="simple" size="md" bgColor="white" >
        <Thead>
          <Tr>
            <Th isNumeric>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Gender</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td isNumeric>{filteredData.id}</Td>
            <Td>{filteredData.name}</Td>
            <Td>{filteredData.email}</Td>
            <Td>{filteredData.gender}</Td>
            <Td>{filteredData.status}</Td>
          </Tr>
        </Tbody>
      </Table>
      <Link href="/">
        <Center mt="2">
          <Text color="black">
            <Button>Go back</Button>
          </Text>
        </Center>
      </Link>
    </Box>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://gorest.co.in/public-api/users`);
  const data = await res.json();

  return { props: { data } };
}
