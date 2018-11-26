angular.module('core').factory('stockData', function(){
        var stock;

        return {
            setStock: function(stockToEdit){
                stock = stockToEdit;
            },
            getStock: function(){
                return stock;
            }
        }
    }
)