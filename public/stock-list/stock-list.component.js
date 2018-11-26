angular.module('stockList')
    .component('stockList', {
        templateUrl: 'stock-list/stock-list.template.html',
        controller: ['$http', '$window', 'stockData', function StockListController($http, $window, stockData){
            var self = this;
            self.load = true;
            self.stocks = [];
            self.sort = 'profit';
            self.reverse = true;
            self.errorMsg = 'No data found';

            this.deleteStock = function deleteStock(index){
                $http.delete("rest/"+index).then(
                    function(response){
                        self.stocks.splice(index, 1);
                    }
                )
            }

            this.editStock = function editStock(stock){
                stockData.setStock(stock);
                $window.location.href = '#!/stocks/editStock/' + stock.stockName;
            }

            $http.get("rest/").then(
                function(response){
                    self.stocks = response.data;
                }
            ).then(function loadCurrentPrice(){
                    self.stocks.forEach((stock, index) => {          
                        $http.get("https://www.quandl.com/api/v3/datasets/NSE/" + stock.stockName + ".json?api_key=gwZhGszfyS5bH7p44UfA&rows=1").then(
                            function(response){
                                stock.currentPrice = response.data.dataset.data[0][4];
                                stock.profit = (stock.currentPrice - stock.buyPrice) * 100 / stock.buyPrice;
                                stock.index = index;
                            },
                            function(response){
                                stock.currentPrice = "Error";
                            }
                        )
                    });
                    self.load = false;  
                }
            ).catch(function(){
                self.errorMsg = "Error while retriving data";
            });
                      
        }]
    }
)