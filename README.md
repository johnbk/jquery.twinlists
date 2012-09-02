Simple Usage:

```javascript
$(document).ready(function() {
	var mylist = [{
		text: 'e',
		value: 1,		
	    default: true, // by default this item is selected, i.e. this is placed in 'selected' list initially
		disabled: false // this item is disabled so that it can't be moved from the list it is in
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
