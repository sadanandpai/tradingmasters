angular.module('stockList')
    .component('stockList', {
        templateUrl: 'stock-list/stock-list.template.html',
        controller: ['$scope', '$http', '$window', '$filter', 'stockData', function StockListController($scope, $http, $window, $filter, stockData){
            var self = this;
            self.load = true;
            self.stocks = [];
            self.sort = 'profit';
            self.reverse = true;
            self.errorMsg = 'No data found';
            self.opacity = "loader";
            self.currentPage = "1";

            this.deleteStock = function deleteStock(index){
                $http.delete("https://tradingmasters.herokuapp.com/rest/"+index).then(
                    function(response){
                        self.stocks.splice(index, 1);
                        self.setPage();
                    }
                )
            }

            this.editStock = function editStock(stock){
                stockData.setStock(stock);
                $window.location.href = '#!/stocks/editStock/' + stock.stockName;
            }

            
            $http.get("https://tradingmasters.herokuapp.com/rest/").then(
                function(response){
                    self.stocks = response.data;
                }
            ).then(function loadCurrentPrice(){
                    var promises = [];
                    self.stockLength = self.stocks.length;
                    self.stocks.forEach(function(stock, index) {          
                        promises.push($http.get("https://www.quandl.com/api/v3/datasets/NSE/" + stock.stockName + ".json?api_key=gwZhGszfyS5bH7p44UfA&rows=1").then(
                            function(response){
                                stock.currentPrice = response.data.dataset.data[0][4];
                                stock.profit = (stock.currentPrice - stock.buyPrice) * 100 / stock.buyPrice;
                                stock.index = index;
                            },
                            function(response){
                                stock.currentPrice = "Error";
                            }
                        ));
                    });
                    
                    Promise.all(promises).then(function(){
                        self.load = false;
                        $scope.$apply();
                    });

                    self.opacity = "loader-light";
                }
            ).catch(function(){
                self.errorMsg = "Error while retriving data";
            });

            self.setPage = function(){
                self.stockLength = $filter('filter')(self.stocks, self.search).length;
            }
                      
        }]
    }
);


angular.module('stockList').filter('startFrom', function() {
    return function(input, start) {
        return input.slice(start);
    }
});