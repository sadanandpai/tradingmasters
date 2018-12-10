angular.module('searchStocks', []);

angular.module('searchStocks').directive('searchDirective', 
    function searchDirective(){
        return {
            scope: {
                search: '=info'
            },
            templateUrl: '/directives/search.template.html'
        }
    }
)