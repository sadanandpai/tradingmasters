angular.module('stockList')
    .component('stockList', {
        templateUrl: 'stock-list/stock-list.template.html',
        controller: ['$rootScope', '$scope', '$http', '$window', '$filter', 'stockData', 'stockREST', function StockListController($rootScope, $scope, $http, $window, $filter, stockData, stockREST){
            var self = this;

            self.load = true;
            self.stocks = [];
            self.search = {
                text: "",
                pageLimit: 3,
                stockLength: 0,
                stockCount: [],
                totalStocks: 0,
                setPage: setPage
            };
            self.sort = 'profit';
            self.reverse = true;
            self.errorMsg = 'No data found';
            self.opacity = "loader";
            self.currentPage = 1;
            self.lastPage = 1;
            self.myStyle = "{ color: blue }";

            //Fetch the stocks - GET
            stockREST.getStocks(self).then(
                function(){
                    loadCurrentPrice();
                }
            ).catch(function(){
                self.errorMsg = "Error while retriving data";
            });

            //To Update a stock - EDIT
            this.editStock = function editStock(stock){
                stockData.setStock(stock);
                $window.location.href = '#!/stocks/editStock/' + stock.stockName;
            }

            //Delete a stock - DELETE
            this.deleteStock = function deleteStock(index){
                stockREST.deleteStock(index, self).then(function(){
                    setPage(self.currentPage);
                });
            }
            



            //To set the page
            function setPage(page){
                var filteredStocks = $filter('filter')(self.stocks, self.search.text);
                self.search.stockLength = filteredStocks.length
                self.search.stockCount = [];
                for(var i =1; i<= Math.ceil(self.search.stockLength / self.search.pageLimit); i++)
                    self.search.stockCount.push(i);

                if(page)
                    self.currentPage = (page < i) ? page: i - 1;
                self.lastPage = Math.ceil(self.search.stockLength / self.search.pageLimit);
            }


            //To load all current prices
            var loadCurrentPrice = function(){
                var promises = [];
                self.search.stockLength = self.stocks.length;
                setPage();

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
            
        }]
    }
);


angular.module('stockList').filter('startFrom', function() {
    return function(input, start) {
        return input.slice(start);
    }
});