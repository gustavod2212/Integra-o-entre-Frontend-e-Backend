
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
} from "@mui/material";

const UserForm = ({ onSubmit, initialValues, onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || "");
      setEmail(initialValues.email || "");
    } else {
      setName("");
      setEmail("");
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: initialValues?.id,
      name: name,
      email: email,
    });

    if (!initialValues?.id) {
      setName("");
      setEmail("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="custom-card"
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#6366f1", fontWeight: "bold" }}
      >
        {initialValues?.id ? "Editar Usuário" : "Novo Cadastro"}
      </Typography>

      <Typography
        variant="body2"
        sx={{ mb: 3, color: "text.secondary" }}
      >
        Preencha as informações abaixo para atualizar o sistema.
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Nome Completo"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          label="E-mail Corporativo"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          {initialValues?.id && (
            <Button
              onClick={onCancel}
              color="inherit"
              variant="text"
            >
              Cancelar
            </Button>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "var(--primary-color)",
              "&:hover": {
                bgcolor: "var(--primary-hover)",
              },
            }}
          >
            {initialValues?.id
              ? "Salvar Alterações"
              : "Cadastrar Usuário"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserForm;
