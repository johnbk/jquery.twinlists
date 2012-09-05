The plugin depends on [Jquery UI button][1] to render the move right, move left, move all to left and move all to right buttons.

Simple Usage:
-------------

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




**Options**
-----------

**leftListLabel** - Label for the list displayed on your left

**rightListLabel** - Label for the list displayed on your left

**labelClass** -  CSS class to apply for leftListLabel and rightListLabel

**size** - number of options shown, scroll bar appears if more than this number of options are added

**sort** - enable sorting? true or false

**sortBy** -  0 - sort by "text" , 1 - sort by "value", effective only when sort is set to 'true'

**minWidth** - minimum width of the select box - select box will auto adjust if option text exceeds this value

**inputList** - an array containing the list options as in the example above

**buttonOpts*** - jquery ui button options for each left, right, allLeft, allRight buttons.

 Ex:

 

    buttonOpts:
     {
         left: {
             icons: {
                 primary: "ui-icon-triangle-1-w"
             },
             text: false
         },
         right: {
             icons: {
                 primary: "ui-icon-triangle-1-e"
             },
             text: false
         },
         allLeft: {
             icons: {
                 primary: "ui-icon-seek-prev"
             },
             text: false
         },
         allRight: {
             icons: {
                 primary: "ui-icon-seek-next"
             },
             text: false
         }
     }

   


**buttonTextClass** - CSS class for the text on the button, we can use this to adjust the size of the button


**Defaults**
------------

    {
        leftListLabel: "Available",
        rightListLabel: "Selected",        
        size: 10,    
        sort: false,      
        sortBy: 0,     
        minWidth: "80px",
        inputList: new Array(),
        labelClass: "twinlists-label",        
        buttonTextClass: "twinlists-button",
        buttonOpts: {
            left: {
                icons: {
                    primary: "ui-icon-triangle-1-w"
                },
                text: false
            },
            right: {
                icons: {
                    primary: "ui-icon-triangle-1-e"
                },
                text: false
            },
            allLeft: {
                icons: {
                    primary: "ui-icon-seek-prev"
                },
                text: false
            },
            allRight: {
                icons: {
                    primary: "ui-icon-seek-next"
                },
                text: false
            }
        }
    }


**Methods**
-----------

 **getSelected**   - get all the selected items - i.e. all the items in **right** list

 Ex:
  

    var selected = $("#demo").twinlists('getNotSelected');

 **getNotSelected** - get all the  not selected items - i.e. all the items in **left** list

Ex:
  

    var notSelected = $("#demo").twinlists('getNotSelected');

  
 **getAll** - get **all** the items

  Ex:
 

    var all = $("#demo").twinlists('getAll');

 
 **populate** - re-populate the lists with the given options

 Ex:

    var options = [{
        text: 'e',
        value: 1,
        default: true,      
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
        default: true,
        disabled: false
    }];
    

    $("#demo").twinlists('populate', options);






  [1]: http://jqueryui.com/demos/button/
