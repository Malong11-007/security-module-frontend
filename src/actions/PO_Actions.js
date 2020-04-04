const types = {
	ADD_LINE:'ADD_LINE',
	REMOVE_LINE:'REMOVE_LINE',
	EDIT_LINE:'EDIT_LINE',
	CLEAR_LINES:'CLEAR_LINES'
}


const add_line = (payload) => {
	return {
		type : types.ADD_LINE,
		payload
	}
}

const remove_line = (payload) => { // Payload will receive id of item to be removed
	return {
		type : types.REMOVE_LINE,
		payload
	}
}

const edit_line = (payload) => {
	return {
		type : types.EDIT_LINE,
		payload
	}
}

const clear_lines = () => {
	return {
		type: types.CLEAR_LINES
	}
}


export {
	types,
	add_line,
	remove_line,
	edit_line,
	clear_lines
}

