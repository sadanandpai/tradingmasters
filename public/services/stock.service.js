angular.module('stockService', [])
    .factory('stockREST', function($http){
        
        var url = 'https://tradingmasters.herokuapp.com/rest/';

        var getStocks = function(self){
            return $http.get(url).then(
                function(response){
                    self.stocks = response.data;
                    self.search.totalStocks = self.stocks.length;
                },
                function(response){
                    console.log("Error while fetching the stocks");
                }
            );
        }

        var postStock = function(self) {
            return $http.post(url, {
                stockName: self.stockName, 
                buyPrice: self.buyPrice,
                stopLoss: self.stopLoss,
                target: self.target
            }).then(
                function(response){
                    console.log("Stock added successfully");
                },
                function(response){
                    console.log("Error while fetching data. You can still continue without issues.");
                }
            )
        }

        var updateStock = function(self) {
            return $http.put(url, {
                index: self.stock.index,
                buyPrice: self.stock.buyPrice,
                stopLoss: self.stock.stopLoss,
                target: self.stock.target
            }).then(
                function(response){
                    console.log("Stock updated successfully")
                },
                function(response){
                    console.log("Error while updating the stock")
                }
            )
        }

        var deleteStock = function(index, self){
            return $http.delete(url + index).then(
                function(response){
                    self.stocks.splice(index, 1);
                    self.search.totalStocks = self.stocks.length;
                },
                function(response){
                    console.log("Error while deleting the stock");
                }
            );
        }

        return {
            getStocks: getStocks,
            deleteStock: deleteStock,
            updateStock: updateStock,
            postStock: postStock
        }

    }
)