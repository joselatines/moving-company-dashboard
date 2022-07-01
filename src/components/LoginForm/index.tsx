import { useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import NextImage from 'next/image';
// prettier-ignore
import { Box, Button, Container, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast from 'react-hot-toast';
import { userLogin } from '../../services/login';
import logo from '../../../public/imgs/logo/mudy-sin-fondo-oscuro.png';
// Validation
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { mockTrue } from '../../../__mocks__/mockResponses';

interface IFormik {
	email: string;
	password: string;
	remember: boolean;
}

export const LoginForm = () => {
	const [loginErrors, setLoginErrors] = useState(null);
	const router = useRouter();

	const formik: FormikProps<IFormik> = useFormik<IFormik>({
		initialValues: {
			email: '',
			password: '',
			remember: true,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Inserte un email valido')
				.max(255)
				.required('Email es requerido'),
			password: Yup.string().max(255).required('Password is required'),
			remember: Yup.boolean(),
		}),
		onSubmit: async (e, { resetForm }) => {
			const userAuth = await userLogin(formik.values);
			if (userAuth.status || mockTrue) {
				toast.success(userAuth.message);
				router.push('/dashboard');
				resetForm();
				setLoginErrors(null);
			}
			// If success: false => continue
			!userAuth.success && setLoginErrors(userAuth.message);
		},
	});

	return (
		<Box
			sx={{
				placeItems: 'center',
				display: 'flex',
				flexGrow: 1,
				minHeight: '100vh',
			}}
		>
			<Container maxWidth='sm'>
				<NextLink href='/' passHref>
					<Button component='a' startIcon={<ArrowBackIcon fontSize='small' />}>
						Home
					</Button>
				</NextLink>
				<form onSubmit={formik.handleSubmit}>
					<Box sx={{ my: 3 }}>
						<Typography color='textPrimary' variant='h4'>
							Iniciar sesión
						</Typography>
						<Typography color='textSecondary' gutterBottom variant='body2'>
							Inicia sesión para comenzar a trabajar
						</Typography>
					</Box>
					<TextField
						error={Boolean(formik.touched.email && formik.errors.email)}
						fullWidth
						helperText={formik.touched.email && formik.errors.email}
						label='Email Address'
						margin='normal'
						name='email'
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						type='email'
						value={formik.values.email}
						variant='outlined'
					/>
					<TextField
						error={Boolean(formik.touched.password && formik.errors.password)}
						fullWidth
						helperText={formik.touched.password && formik.errors.password}
						label='Password'
						margin='normal'
						name='password'
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						type='password'
						value={formik.values.password}
						variant='outlined'
					/>
					{loginErrors && <Typography color='error'>{loginErrors}</Typography>}
					<FormControlLabel
						control={
							<Switch
								checked={formik.values.remember}
								onChange={(event, checked) => {
									formik.setFieldValue('remember', checked);
								}}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						label='Recordar'
					/>

					<Box sx={{ py: 2 }}>
						<Button
							color='primary'
							disabled={formik.isSubmitting}
							fullWidth
							size='large'
							type='submit'
							variant='contained'
						>
							Iniciar sesión
						</Button>
					</Box>
				</form>
			</Container>
		</Box>
	);
};
