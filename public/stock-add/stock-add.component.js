angular.module('stockAdd').component('stockAdd', {
        templateUrl: 'stock-add/stock-add.template.html',
        controller: ['$http','$window', 'stockREST', function StockAddController($http, $window, stockREST){
            var self = this;
            
            $http.get('res/stocks.json').then(function(response) {
                self.stockJSON = response.data;
            });

            this.submit = function() {
                stockREST.postStock(self).then(
                    function(){
                        $window.location.href = '#!/stocks'
                    },
                    function(){
                        $window.location.href = '#!/stocks'
                    }
                );
            };

            self.fetchStockPrice = function(){
                $http.get("https://www.quandl.com/api/v3/datasets/NSE/" + self.stockName + ".json?api_key=gwZhGszfyS5bH7p44UfA&rows=1").then(
                    function(response){
                        self.cmp = response.data.dataset.data[0][4];
                    },
                    function(response){
                        console.log("Error while fetching data. You can still continue without issues.")
                    }
                )
            };
        }]
    }
)