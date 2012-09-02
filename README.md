Simple Usage:

```javascript
$(document).ready(function() {
	var mylist = [{
		text: 'e',
		value: 1,
	default:
		true,
		disabled: false
	}, {
		text: 'c',
		value: 3,
		disabled: true
	}, {
		text: 'd',
		value: 2
	}, {
		text: 'a',
		value: 5,
		disabled: true
	}, {
		text: 'b',
		value: 4,
	default:
		true,
		disabled: false
	}];

	$("#demo").twinlists({
		inputList: mylist
	});
});
```
