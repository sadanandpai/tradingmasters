angular.module('stockAdd').component('stockAdd', {
        templateUrl: 'stock-add/stock-add.template.html',
        controller: ['$http','$window', function StockAddController($http, $window){
            var self = this;
            
            $http.get('res/stocks.json').then(function(response) {
                self.stockJSON = response.data;
            });

            this.submit = function() {
                $http.post("rest/", {
                    stockName: self.stockName, 
                    buyPrice: self.buyPrice,
                    stopLoss: self.stopLoss,
                    target: self.target
                }).then(
                    function(response){
                        $window.location.href = '#!/stocks';
                    }
                )
            };

            self.fetchStockPrice = function(){
                $http.get("https://www.quandl.com/api/v3/datasets/NSE/" + self.stockName + ".json?api_key=gwZhGszfyS5bH7p44UfA&rows=1").then(
                    function(response){
                        self.cmp = response.data.dataset.data[0][4];
                    }
                )
            };
        }]
    }
)