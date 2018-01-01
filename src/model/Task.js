
class Task {

	constructor(number){
		this.type = '';
		this.status = '';
		this.redo_count = 0;
		this.execution_record = [];
		this.number = number;
	}
}

module.exports = Task;