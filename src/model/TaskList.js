import Task from './Task';

class TaskList {

	constructor(name){
		this.name = '';
		this.list = [];
	}

	add_task(task){
		this.remove_task(task.id);
		this.list.push(task);
	}

	remove_task(number){
		
		var index;
		var array_length = this.list.length;
		for(var i = 0; i < array_length; i++){
			if(this.list[i].number == number){
				index = i;
				break;
			}
		}
		if(index){
			this.list.splice(index, 1);
		}

		/*
		for(var target in this.list){
			if(target.number == number){
				this.list.splice(this.list.indexOf(target), 1);
			}
		}*/
	}
}

module.exports = TaskList;