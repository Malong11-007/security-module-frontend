const types = {
	USER_LOGIN : 'USER_LOGIN',
	USER_LOGOUT: 'USER_LOGOUT',
	SELECT_FORM: 'SELECT_FORM'
}


const user_login = (payload) => {
	return {
		type : types.USER_LOGIN,
		payload
	}
}

const user_logout = () => {
	localStorage.removeItem('persist:root')
	return {
		type : types.USER_LOGOUT,
	}
}

const select_form = (payload) => {
	return {
		type : types.SELECT_FORM,
		payload
	}
}


export {
	types,
	user_login,
	user_logout,
	select_form
}

