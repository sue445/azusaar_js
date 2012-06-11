Date.prototype.getRealMonth = function(){
    return this.getMonth() + 1;
};
Date.prototype.addDate = function(inc) {
    return inc ? new Date(this.getFullYear(), this.getMonth(), this.getDate()+inc) : this;
};

/**
 * extends util.js
 * @param inc
 * @return {*}
 */
Date.prototype.addMonth = function(inc) {
    if(!inc){
        return this;
    }

    var nextMonthLastDay = azusaar.util.getMonthEndDay(this.getFullYear(), this.getRealMonth()+inc);
    var day = this.getDate();
    if(day > nextMonthLastDay){
        day = nextMonthLastDay;
    }
    return new Date(this.getFullYear(), this.getMonth()+inc, day);
};
Date.prototype.sameMonth = function(date) {
    if(!date){
        return false;

    } else if(date instanceof Date){
        return this.getFullYear() == date.getFullYear() && this.getMonth() == date.getMonth();

    } else if(date.year && date.month){
        return this.getFullYear() == date.year && this.getRealMonth() == date.month;
    }

    return false;
};
Date.prototype.sameDay = function(date) {
    if(date.year && date.month && date.day){
        return this.sameMonth(date) && this.getDate() == date.day;
    }
    return false;
};

/**
 * @requires jquery
 */
(function($){
    $.fn.extend({
        check: function(isCheck) {
            return this.each(
                function() {
                    this.checked = (isCheck) ? true : false;
                }
            );
        }
    });
})(jQuery);
