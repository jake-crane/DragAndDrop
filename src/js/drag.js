$(function () {
    var xOffset;
    var yOffset;
    var classes = {
        moving: 'moving',
        startingPosition: 'startingPosition',
        selected: 'selected'
    };

    function selectElement(e)
    {
        var $this = $(this);
        $this.toggleClass(classes.selected);
        var $height = $('#height');
        var $width = $('#width');
        $height.val($this.css('height').replace("px", ""));
        $width.val($this.css('width').replace("px", ""));
    }

    function replaceOriginal($original)
    {
        var $clone = $original.clone();
        $clone.attr('style', '');
        $clone.mousedown(startDrag);
        $clone.mouseup(stopDrag);
        $clone.mousemove(drag);
        $('.dragPanel').append($clone);
    }

    function startDrag(e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass(classes.startingPosition))
            replaceOriginal($this);
        $this.css('z-index', '1');
        $this.addClass(classes.moving);
        xOffset = e.clientX - $this.css('left').replace("px", "");
        yOffset = e.clientY - $this.css('top').replace("px", "");
        $draggables.off('click');
    }

    function stopDrag(e) {
        var $this = $(this);
        $this.removeClass(classes.moving);
        $this.removeClass(classes.startingPosition);
        $draggables.click(selectElement);
    }

    function drag(e) {
        var $this = $(this);
        if ($this.hasClass(classes.moving)) {
            $this.css('left', (e.clientX - xOffset) + "px");
            $this.css('top', (e.clientY - yOffset) + "px");
        }
    }

    var $draggables = $('.draggable');
    $draggables.mousedown(startDrag);
    $draggables.mouseup(stopDrag);
    $draggables.mousemove(drag);

});

