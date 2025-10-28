import { InferType, object, string } from 'yup';

const userSchema = object({
  idUser: string().nullable(),
  username: string()
    .required('O nome é obrigatório')
    .min(3, 'O nome precisa ter pelo menos 3 caracteres'),
  password: string()
    .required('Senha é obrigatória')
    .min(12, 'Senha precisa ter pelo menos 12 caracteres')
});

type User = InferType<typeof userSchema>;

interface UserError {
  user?: string;
  email?: string;
  password?: string;
}

export { userSchema, User, UserError };