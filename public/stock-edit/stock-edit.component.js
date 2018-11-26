angular.module('stockEdit').component('stockEdit', {
        templateUrl: 'stock-edit/stock-edit.template.html',
        controller: ['$http','$window', 'stockData', '$routeParams', function StockEditController($http, $window, stockData, $routeParams){
            var self = this;
            self.stock = {};

            self.stock = stockData.getStock();

            $http.get("https://www.quandl.com/api/v3/datasets/NSE/" + $routeParams.stockName + ".json?api_key=gwZhGszfyS5bH7p44UfA&rows=1").then(
                function(response){
                    self.stock.cmp = response.data.dataset.data[0][4];
                }
            ).catch(function(){
                $window.location.href = '#!/stocks';
            });

            this.submit = function() {
                $http.put("/rest/", {
                    index: self.stock.index,
                    buyPrice: self.stock.buyPrice,
                    stopLoss: self.stock.stopLoss,
                    target: self.stock.target
                }).then(
                    function(response){
                        $window.location.href = '#!/stocks';
                    }
                )
            };
        }]
    }
)