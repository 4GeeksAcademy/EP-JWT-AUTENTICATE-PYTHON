const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white",
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white",
				},
			],
			userLoggedIn: localStorage.getItem('jwt-token'),
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			},
			usersignup: async (email, password, nombre, apellido, ciudad) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/usersignup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email,
							password,
							nombre,
							apellido,
							ciudad,
						}),
					});

					if (!response.ok) {
						const errorData = await response.json();
						return { ok: false, msg: errorData.msg || "Error en el registro" };
					}

					const data = await response.json();
					return { ok: true, msg: "Usuario registrado exitosamente", data };
				} catch (error) {
					console.error("Error en la acción usersignup:", error);
					return { ok: false, msg: "Error de conexión al servidor" };
				}
			},


			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/signin", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});

					if (!resp.ok) {
						if (resp.status === 401) {
							throw new Error("Credenciales Invalidas");
						} else if (resp.status === 400) {
							throw new Error("Email o Password Invalidos");
						} else {
							throw new Error("Error Login");
						}
					}

					const data = await resp.json();

					localStorage.setItem("jwt-token", data.token);
					setStore({ userLoggedIn: localStorage.getItem("jwt-token") })
					return data;
				} catch (error) {
					throw new Error(`Error during login: ${error.message}`);
				}
			},
			logout: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/logout", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
						},
					});

					if (!resp.ok) {
						throw new Error("Error during logout request");
					}

					localStorage.removeItem("jwt-token");
					setStore({ userLoggedIn: null })

					return true;
				} catch (error) {
					throw new Error(`Error Cerrar Sesion: ${error.message}`);
				}
			},
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
				} catch (error) {
					console.error("Error loading message from backend", error);
				}
			},

			getUserData: async (user_id) => {
				try {
					const token = localStorage.getItem("jwt-token");
					if (!token) throw new Error("Token JWT no encontrado");

					const response = await fetch(`${process.env.BACKEND_URL}/userprofile/${user_id}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error del servidor:", errorData);
						throw new Error(errorData.message || "Error al obtener datos del usuario");
					}

					const data = await response.json();
					console.log("Datos del usuario obtenidos correctamente:", data);
					return data;
				} catch (error) {
					console.error(`Error fetching user data: ${error.message}`);
					throw error;
				}
			},




			checkLogin: () => {
				const token = localStorage.getItem("jwt-token");
				if (token) {
					setStore({ userLoggedIn: true });
				} else {
					setStore({ userLoggedIn: false });
				}
			},

		},
	};
};

export default getState;