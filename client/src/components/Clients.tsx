import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { Client } from "../types";
import { GET_CLIENTS } from "../apis/client/queries/get-clients";

export default function Clients() {
  const { loading, error, data } = useQuery<{ clients: Client[] }>(GET_CLIENTS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <table className="table-hover table mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.clients.map((client) => (
            <ClientRow
              name={client.name}
              email={client.email}
              phone={client.phone}
              id={client.id}
              key={client.id}
            />
          ))}
      </tbody>
    </table>
  );
}
