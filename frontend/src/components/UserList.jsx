
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";

const UserList = ({ users, onDelete, onSelect }) => {
  return (
    <Box
      className="custom-card"
      sx={{ mt: 4, padding: "0 !important" }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Listagem de Membros
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Total de registros: {users.length}
        </Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de usuários">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome do Usuário</TableCell>
              <TableCell>Contato (Email)</TableCell>
              <TableCell align="right">Gerenciar</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "text.secondary" }}
                >
                  #{user.id}
                </TableCell>

                <TableCell sx={{ fontWeight: 500 }}>
                  {user.name}
                </TableCell>

                <TableCell>
                  <Chip
                    label={user.email}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell align="right">
                  <Button
                    size="small"
                    onClick={() => onSelect(user)}
                    sx={{ mr: 1, fontWeight: "bold" }}
                  >
                    Editar
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    onClick={() => onDelete(user.id)}
                  >
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    Nenhum usuário encontrado na base de dados.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
