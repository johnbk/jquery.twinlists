(function($) {
    $.fn.twinlists = function(opts) {
        if (opts == undefined || isOption(opts)) {
            var options = $.extend({}, $.fn.twinlists.defaults, opts);
            if (options.sort) {
                options._sorter = (options.sortBy === 1 ? sortByValue : sortByText);
                options.inputList.sort(options._sorter);
            }
            this.each(function() {
                $(this).append(createDOM(options)).data("opts", options);
            });
        }
        if (isMethod(opts)) {
            return $.proxy(methods[opts], this)(arguments);
        }

        return $(this);
    };
    // Making the defaults public for customization
    $.fn.twinlists.defaults = {
        leftListLabel: "Available",
        rightListLabel: "Selected",
        // number of options shown, scroll bar appears if more than this number of options are added
        size: 10,
        //sort
        sort: false,
        //effective only when sort is set to 'true' - sort type - by 0 - "text" or by 1 - "value"
        sortBy: 0,
        // min widht of the select box - select box will auto adjust if option text exceeds this value
        minWidth: "80px",
        inputList: new Array(),
        labelClass: "twinlists-label",
        // use this to adjust the size of the button
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
    };

    var rightListId = "rightList";
    var leftListId = "leftList";

    var methods = {
        getSelected: function() {
            return getItems(this.find("#" + rightListId).first());
        },
        getNotSelected: function() {
            return getItems(this.find("#" + leftListId).first());
        },
        getAll: function() {
            return $.merge($.merge([], getItems(this.find("#" + leftListId).first())), getItems(this.find("#" + rightListId).first()));
        },
        populate: function(args) {
            var $rightList = this.find("#" + rightListId).first();
            var $leftList = this.find("#" + leftListId).first();
            $.each([$leftList, $rightList], function(i, e) {
                e.empty()
            });
            var sorter = $(this).data("opts")["_sorter"];
            if (sorter) {
                args[1].sort(sorter);
            }
            populate($leftList, $rightList, args[1]);
        }
    };

    var cellCSS = {
        'display': 'table-cell',
        'vertical-align': 'middle'
    };

    var isOption = function(input) {
            return $.type(input) === "object";
        };

    var isMethod = function(input) {
            return $.type(input) === "string";
        };

    var getItems = function($list) {
            var items = new Array();
            $list.find("option").each(function() {
                items.push($(this).data('item'));
            });

            return items;
        };

    var filterInputs = function(e, i) {
            return (e["default"] === true) ? true : false;
        };

    var populateOptions = function($list, inputArray) {
            $.each(inputArray, function(i, e) {
                $list.append($("<option></option>").text(e.text).val(e.value).data('item', e).prop('disabled', (e.disabled ? true : false)));
            });
        };

    var populate = function($leftList, $rightList, inputArray) {
            populateOptions($leftList, $.grep(inputArray, filterInputs, true));
            populateOptions($rightList, $.grep(inputArray, filterInputs));
        };

    var sortByText = function(a, b) {
            var arel = a.text;
            var brel = b.text;
            return arel === brel ? 0 : arel < brel ? -1 : 1;
        };

    var sortByValue = function(a, b) {
            var arel = parseInt(a.value);
            var brel = parseInt(b.value);
            return arel === brel ? 0 : arel < brel ? -1 : 1;
        };

    var transferOptions = function($source, $target, moveAll, selected, opts) {
            if (opts._sorter) {
                var arr = [];
                $source.find((moveAll ? "option" : "option:selected")).each(function() {
                    if ($(this).prop("disabled") === false) {
                        var item = $(this).data('item');
                        item["default"] = selected;
                        $(this).remove();
                        arr.push(item);
                    }
                });
                $target.find("option").each(function(i) {
                    arr.push($(this).data('item'));
                    $(this).remove();
                });
                arr.sort(opts._sorter);
                populateOptions($target, arr);
            } else {
                $source.find((moveAll ? "option" : "option:selected")).each(function() {
                    if ($(this).prop("disabled") === false) {
                        var item = $(this).data('item');
                        item["default"] = selected;
                        $(this).detach().appendTo($target).data('item', item);
                    }
                });
            }
        };

    var createListDOM = function(opts, right) {

            var $listLabel = $("<label></label>").html(opts[(right === true) ? "rightListLabel" : "leftListLabel"]).addClass(opts.labelClass);
            var $list = $("<select></select>").prop({
                "id": (right === true) ? rightListId : leftListId,
                "size": opts.size,
                "multiple": "multiple"
            }).css({
                "min-width": opts.minWidth
            });
            return $("<div></div>").append($listLabel, $("<br>"), $list).css(cellCSS);
        };

    var createDOM = function(opts) {
            // Element templates
            var divTmpl = "<div></div>";
            var buttonTmpl = "<button></button>";

            var $rightListDiv = createListDOM(opts, true);
            var $leftListDiv = createListDOM(opts, false);

            var $rightList = $rightListDiv.children('#rightList');
            var $leftList = $leftListDiv.children('#leftList');

            var $moveRight = $(buttonTmpl).button(opts.buttonOpts.right).click(function(e) {
                transferOptions($leftList, $rightList, false, true, opts);
                return false;
            });

            var $moveLeft = $(buttonTmpl).button(opts.buttonOpts.left).click(function(e) {
                transferOptions($rightList, $leftList, false, false, opts);
                return false;
            });

            var $moveAllRight = $(buttonTmpl).button(opts.buttonOpts.allRight).click(function(e) {
                transferOptions($leftList, $rightList, true, true, opts);
                return false;
            });

            var $moveAllLeft = $(buttonTmpl).button(opts.buttonOpts.allLeft).click(function(e) {
                transferOptions($rightList, $leftList, true, false, opts);
                return false;
            });

            $.each([$moveRight, $moveAllRight, $moveLeft, $moveAllLeft], function(i, e) {
                this.find("span.ui-button-text").addClass("twinlists-button");
            });

            var $controlPanel = $(divTmpl).append($moveAllRight, $("<br>"), $moveRight, $("<br>"), $moveLeft, $("<br>"), $moveAllLeft).css(cellCSS);

            // populate options
            populate($leftList, $rightList, opts.inputList);

            return $(divTmpl).append($(divTmpl).append($leftListDiv, $controlPanel, $rightListDiv).css({
                'display': 'table-row'
            })).css({
                'display': 'table'
            });
        };

})(jQuery);
