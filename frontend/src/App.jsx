
import React, { useState, useEffect } from "react";
import axios from "axios";

import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

import {
  Container,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

import { API_BASE_URL } from "./utils/config";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "",
    data: null,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // READ: buscar todos os usuários
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      showSnackbar("Erro ao carregar usuários.", "error");
    }
  };

  // CREATE: cadastrar usuário
  const handleCreate = async (user) => {
    try {
      await axios.post(`${API_BASE_URL}/users`, user);
      await fetchUsers();

      showSnackbar(
        "Usuário cadastrado com sucesso!",
        "success"
      );
    } catch (error) {
      showSnackbar("Falha ao cadastrar.", "error");
    }
  };

  // UPDATE: atualizar usuário
  const handleUpdate = async () => {
    const user = confirmDialog.data;

    try {
      await axios.put(
        `${API_BASE_URL}/users/${user.id}`,
        user
      );

      await fetchUsers();
      setSelectedUser(null);

      showSnackbar("Dados atualizados.", "success");
    } catch (error) {
      showSnackbar("Erro ao atualizar.", "error");
    } finally {
      closeDialog();
    }
  };

  // DELETE: excluir usuário
  const handleDelete = async () => {
    const userId = confirmDialog.data;

    try {
      await axios.delete(`${API_BASE_URL}/users/${userId}`);
      await fetchUsers();

      showSnackbar("Usuário removido.", "success");
    } catch (error) {
      showSnackbar("Erro ao remover.", "error");
    } finally {
      closeDialog();
    }
  };

  // Decide se vai cadastrar ou solicitar confirmação de edição
  const handleFormSubmit = (user) => {
    if (user.id) {
      setConfirmDialog({
        open: true,
        type: "UPDATE",
        data: user,
      });
    } else {
      handleCreate(user);
    }
  };

  // Abrir confirmação de exclusão
  const confirmDelete = (id) => {
    setConfirmDialog({
      open: true,
      type: "DELETE",
      data: id,
    });
  };

  // Exibir mensagens
  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  // Fechar janela de confirmação
  const closeDialog = () => {
    setConfirmDialog((previous) => ({
      ...previous,
      open: false,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Painel de Controle
        </h1>

        <p style={{ color: "#64748b" }}>
          Gerencie os membros da sua equipe de forma simples.
        </p>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <UserForm
            onSubmit={handleFormSubmit}
            initialValues={selectedUser}
            onCancel={() => setSelectedUser(null)}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <UserList
            users={users}
            onDelete={confirmDelete}
            onSelect={setSelectedUser}
          />
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar((previous) => ({
            ...previous,
            open: false,
          }))
        }
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={confirmDialog.open} onClose={closeDialog}>
        <DialogTitle>
          {confirmDialog.type === "DELETE"
            ? "Excluir Registro?"
            : "Salvar Alterações?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {confirmDialog.type === "DELETE"
              ? "Essa ação não poderá ser desfeita. O usuário será removido permanentemente."
              : "Deseja confirmar a atualização dos dados deste usuário?"}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>Cancelar</Button>

          <Button
            onClick={
              confirmDialog.type === "DELETE"
                ? handleDelete
                : handleUpdate
            }
            color={
              confirmDialog.type === "DELETE"
                ? "error"
                : "primary"
            }
            variant="contained"
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
