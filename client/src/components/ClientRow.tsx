import { FaTrash } from "react-icons/fa";
import { Client } from "../types";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../apis/client/mutations/delete-client";
import { GET_CLIENTS } from "../apis/client/queries/get-clients";
import { useCallback } from "react";

type ClientRowProps = Client;

export default function ClientRow({ name, email, phone, id }: ClientRowProps) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery<{ clients: Client[] }>({
        query: GET_CLIENTS,
      }) ?? { clients: [] };

      console.log(clients);

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  const clickHandler = useCallback(() => {
    deleteClient();
  }, [deleteClient]);

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button
          title={id}
          type="button"
          className="btn btn-danger btn-sm"
          onClick={clickHandler}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
