import ClerkMessage from 'Message';

class MessageList {

	constructor(name){
		this.name = '';
		this.list = [];
	}

	add_message(message){
		this.remove_message(message.id);
		this.list.push(message);
	}

	remove_message(number){
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
	}
}

module.exports = MessageList;