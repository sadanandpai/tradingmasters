angular.module('homeApp').config(['$routeProvider',
    function config($routeProvider){
        $routeProvider
            .when('/stocks', { template: '<stock-list></stock-list>' })
            .when('/stocks/addStock', { template: '<stock-add></stock-add>' })
            .when('/stocks/editStock/:stockName', { template: '<stock-edit></stock-edit>' })
            .otherwise('/stocks');
    }]
)